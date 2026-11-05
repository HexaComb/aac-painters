type AnalyticsEvent =
  | { name: 'first_landing'; parameters: { landing_page: string } }
  | { name: 'scroll_depth'; parameters: { percent_scrolled: number } }
  | {
      name: 'navigation_click' | 'cta_click';
      parameters: { link_name: string; link_url: string; link_location: string };
    }
  | { name: 'generate_lead'; parameters: { form_id: string; form_name: string } };

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (command: 'event', name: AnalyticsEvent['name'], parameters: Record<string, string | number>) => void;
  }
}

export function trackEvent(event: AnalyticsEvent): void {
  try {
    window.gtag?.('event', event.name, {
      send_to: 'G-EX8HXMVRGP',
      page_path: window.location.pathname,
      ...event.parameters,
    });
  } catch {
    // Third-party analytics must never interrupt navigation or quote delivery.
  }
}

let initialized = false;

export function initializeAnalytics(): void {
  if (initialized) return;
  initialized = true;

  try {
    if (!sessionStorage.getItem('aac:landing-recorded')) {
      sessionStorage.setItem('aac:landing-recorded', 'true');
      trackEvent({ name: 'first_landing', parameters: { landing_page: location.pathname } });
    }
  } catch {
    // Skip tab-level landing tracking when storage is unavailable.
  }

  const milestones = new Set([25, 50, 75, 90]);
  let scrollPending = false;
  window.addEventListener('scroll', () => {
    if (scrollPending || milestones.size === 0) return;
    scrollPending = true;
    requestAnimationFrame(() => {
      scrollPending = false;
      const height = document.documentElement.scrollHeight;
      if (height <= window.innerHeight || window.scrollY <= 0) return;
      const percent = ((window.scrollY + window.innerHeight) / height) * 100;
      for (const milestone of milestones) {
        if (percent >= milestone) {
          milestones.delete(milestone);
          trackEvent({ name: 'scroll_depth', parameters: { percent_scrolled: milestone } });
        }
      }
    });
  }, { passive: true });

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const element = event.target.closest('a, button');
    if (!(element instanceof HTMLAnchorElement || element instanceof HTMLButtonElement)) return;
    if (element instanceof HTMLButtonElement && element.disabled) return;
    if (element.classList.contains('skip-link')) return;

    const url = element instanceof HTMLAnchorElement ? new URL(element.href) : null;
    const contact = url && ['tel:', 'sms:', 'mailto:'].includes(url.protocol);
    const cta = contact || url?.hash === '#quote-builder'
      || element.matches('.btn, .header-estimate-pill, .arrow-link');
    if (!cta && (!url || url.origin !== location.origin)) return;

    const label = element.cloneNode(true);
    if (!(label instanceof Element)) return;
    label.querySelectorAll('[aria-hidden="true"], svg').forEach((child) => child.remove());
    const name = (element.getAttribute('aria-label') || label.textContent || '')
      .replace(/\s+/g, ' ').trim().slice(0, 100);
    if (!name) return;

    const section = element.closest('section');
    const placement = element.closest('header') ? 'header'
      : element.closest('footer') ? 'footer'
      : section?.id || section?.getAttribute('aria-labelledby') || 'content';
    trackEvent({
      name: cta ? 'cta_click' : 'navigation_click',
      parameters: {
        link_name: name,
        link_url: url ? (contact ? url.protocol : `${url.origin}${url.pathname}${url.hash}`) : 'form-submit',
        link_location: placement,
      },
    });
  });
}
