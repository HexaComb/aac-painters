import { test as base, expect } from '@playwright/test';

const MOCK_TURNSTILE_SCRIPT = `
(() => {
  let seq = 0;
  const widgets = new Map();
  window.turnstile = {
    render(container, options) {
      const el = typeof container === 'string' ? document.querySelector(container) : container;
      const id = 'mock-widget-' + (++seq);
      const state = { el, options, token: '' };
      widgets.set(id, state);
      const issue = () => {
        state.token = 'mock-turnstile-token-' + seq + '-' + (++seq);
        if (el) {
          el.setAttribute('data-turnstile-rendered', 'true');
          let input = el.querySelector('input[name="cf-turnstile-response"]');
          if (!input) {
            input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'cf-turnstile-response';
            el.appendChild(input);
          }
          input.value = state.token;
        }
        options && options.callback && options.callback(state.token);
      };
      if (window.__AAC_TURNSTILE_HOLD__) {
        window.__AAC_TURNSTILE_COMPLETE__ = issue;
      } else {
        queueMicrotask(issue);
      }
      return id;
    },
    reset(id) {
      const state = widgets.get(id);
      if (!state) return;
      state.token = '';
      const input = state.el && state.el.querySelector('input[name="cf-turnstile-response"]');
      if (input) input.value = '';
      window.__AAC_TURNSTILE_RESETS__ = (window.__AAC_TURNSTILE_RESETS__ || 0) + 1;
      if (!window.__AAC_TURNSTILE_HOLD__) {
        queueMicrotask(() => {
          state.token = 'mock-turnstile-token-reset-' + window.__AAC_TURNSTILE_RESETS__;
          if (input) input.value = state.token;
          state.options && state.options.callback && state.options.callback(state.token);
        });
      }
    },
    getResponse(id) {
      const state = widgets.get(id);
      return state && state.token ? state.token : undefined;
    },
  };
})();
`;

export const test = base.extend({
  context: async ({ context }, use) => {
    await context.route(
      /^https:\/\/(?:[^/]+\.)?(?:googletagmanager\.com|google-analytics\.com|doubleclick\.net)\//,
      (route) => route.abort(),
    );
    await context.route(
      /^https:\/\/challenges\.cloudflare\.com\/turnstile\/v0\/api\.js/,
      (route) => route.fulfill({
        status: 200,
        contentType: 'application/javascript',
        body: MOCK_TURNSTILE_SCRIPT,
      }),
    );
    await use(context);
  },
});

export { expect };
