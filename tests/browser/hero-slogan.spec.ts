import { test, expect, type Page } from '@playwright/test';

const slogan = 'Preserving the past, inspiring the future.';

async function seekHero(page: Page, time: number) {
  await page.locator('.hero-copy-block').evaluate((hero, time) => {
    for (const animation of hero.getAnimations({ subtree: true })) {
      animation.pause();
      animation.currentTime = time;
    }
  }, time);
}

async function expectHeroFits(page: Page) {
  const overflow = await page.locator('.paint-word, .hero-brand-logo, .hero-description-painted, .hero-actions a').evaluateAll((elements) =>
    elements.filter((element) => {
      const rect = element.getBoundingClientRect();
      return rect.left < 0 || rect.right > innerWidth;
    }).map((element) => element.textContent),
  );
  expect(overflow).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
}

test('logo and complete painted slogan coexist and fit responsive layouts', async ({ page }, testInfo) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(slogan);
  await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName(slogan);
  const logo = page.locator('.hero-brand-logo');
  await expect(logo).toBeVisible();
  expect(await logo.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  await seekHero(page, 3000);
  await expectHeroFits(page);
  await page.screenshot({ path: testInfo.outputPath('hero-complete.png') });
  const widths = testInfo.project.name === 'mobile' ? [320, 360, 390] : [768, 1024, 1440];
  for (const width of widths) {
    await page.setViewportSize({ width, height: 1000 });
    await expectHeroFits(page);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(slogan);
  }
});

test('painted slogan leads into the historical subtitle, roller, and button timing', async ({ page }, testInfo) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const timing = await page.locator('.hero-copy-block').evaluate((hero) => {
    const timingFor = (selector: string) => {
      const animation = hero.querySelector(selector)!.getAnimations()[0];
      const { delay, duration } = animation.effect!.getTiming();
      return { delay, duration };
    };
    return {
      subtitle: timingFor('.hero-description-painted'),
      roller: timingFor('.hero-roller-lead'),
      actions: timingFor('.hero-actions-painted'),
      lastWord: timingFor('.hero-title-line:last-child .paint-word:last-of-type .paint-word-reveal'),
    };
  });
  expect(timing.subtitle).toEqual({ delay: 1780, duration: 680 });
  expect(timing.roller).toEqual(timing.subtitle);
  expect(timing.actions).toEqual({ delay: 2050, duration: 550 });
  expect(timing.lastWord.delay).toBeCloseTo(1220, 6);
  expect(timing.lastWord.duration).toBe(600);

  await seekHero(page, 1500);
  const subtitle = page.locator('.hero-description-painted');
  await expect(subtitle).toHaveCSS('mask-position', '100% 0%');
  await expect(page.locator('.hero-actions')).toHaveCSS('opacity', '0');
  await page.screenshot({ path: testInfo.outputPath('hero-before-subtitle.png') });

  await seekHero(page, 2100);
  await expect(subtitle).not.toHaveCSS('mask-position', '100% 0%');
  await expect(subtitle).not.toHaveCSS('mask-position', '0% 0%');
  await page.screenshot({ path: testInfo.outputPath('hero-subtitle-reveal.png') });

  await seekHero(page, 2700);
  await expect(subtitle).toHaveCSS('mask-position', '0% 0%');
  await expect(page.locator('.hero-actions')).toHaveCSS('opacity', '1');
  for (const word of await page.locator('.paint-word-reveal').all()) {
    await expect(word).toHaveCSS('mask-position', '0% 0%');
  }
});

test('reduced motion reveals the slogan and subtitle immediately with no hero animation', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(slogan);
  for (const reveal of await page.locator('.paint-word-reveal, .hero-description-painted').all()) {
    await expect(reveal).toHaveCSS('mask-position', '0% 0%');
  }
  await expect(page.locator('.hero-actions')).toHaveCSS('opacity', '1');
  expect(await page.locator('.hero-copy-block').evaluate((hero) => hero.getAnimations({ subtree: true }).length)).toBe(0);
  for (const brush of await page.locator('.word-brush-actor, .hero-roller-lead').all()) await expect(brush).toBeHidden();
  await expect.poll(() => page.locator('.hero-bg-video').evaluate((video: HTMLVideoElement) => video.paused)).toBe(true);
  await expectHeroFits(page);
  await page.screenshot({ path: testInfo.outputPath('hero-reduced-motion.png') });
});
