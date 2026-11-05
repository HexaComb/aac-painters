import { test, expect } from './fixtures';

test('hero uses the slogan as its heading and preserves header and footer branding', async ({ page }) => {
  await page.goto('/');
  const heading = page.getByRole('heading', { level: 1 });
  await expect(heading).toBeVisible();
  await expect(heading).toHaveAccessibleName('Preserving the past, inspiring the future.');
  await expect(page.locator('.hero-banner').getByText('AAC Painters', { exact: true })).toHaveCount(0);
  for (const selector of ['.site-header .brand-logo', '.site-footer .brand-logo']) {
    const logo = page.locator(selector);
    await expect(logo).toHaveAccessibleName('AAC Painters Inc. Home');
    await expect(logo.locator('img')).toBeVisible();
    await expect(logo.locator('img')).toHaveAttribute('src', '/images/brand/aac-painters-logo.png');
  }
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
