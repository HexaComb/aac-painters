import { test, expect } from '@playwright/test';

test('hero leads with the brand name and slogan without a duplicate logo', async ({ page }) => {
  await page.goto('/');
  const heading = page.locator('.hero-brand-heading');
  await expect(heading).toBeVisible();
  await expect(heading).toHaveText('AAC Painters');
  await expect(page.locator('.hero-banner img')).toHaveCount(0);
  await expect(page.locator('#hero-heading')).toHaveText('Preserving the past, inspiring the future.');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  for (const selector of ['.hero-description-painted', '.hero-roller-lead']) {
    const animation = await page.locator(selector).evaluate(element => {
      const effect = element.getAnimations()[0]?.effect;
      return { delay: effect?.getTiming().delay, duration: effect?.getTiming().duration };
    });
    expect(animation).toEqual({ delay: 1780, duration: 680 });
  }
  await expect(page.locator('.hero-actions')).toBeVisible();
});
