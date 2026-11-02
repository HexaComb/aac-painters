import { test, expect } from '@playwright/test';

test('hero shows the original logo above its label and starts the subtitle immediately', async ({ page }) => {
  await page.goto('/');
  const heading = page.locator('#hero-heading');
  const logo = heading.locator('img');
  const label = heading.locator('span');
  await expect(heading).toBeVisible();
  await expect(label).toHaveText('AAC Painters');
  await expect(logo).toHaveAttribute('src', '/images/brand/aac-painters-logo.png');
  await expect(heading.locator('.paint-word')).toHaveCount(0);
  await expect.poll(() => logo.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  const logoBox = await logo.boundingBox();
  const labelBox = await label.boundingBox();
  expect(logoBox).not.toBeNull();
  expect(labelBox).not.toBeNull();
  expect(logoBox!.width).toBeGreaterThanOrEqual(120);
  expect(logoBox!.width).toBeLessThanOrEqual(144);
  expect(labelBox!.y).toBeGreaterThanOrEqual(logoBox!.y + logoBox!.height);
  expect(labelBox!.y - (logoBox!.y + logoBox!.height)).toBeLessThan(16);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  for (const selector of ['.hero-description-painted', '.hero-roller-lead']) {
    const animation = await page.locator(selector).evaluate(element => {
      const effect = element.getAnimations()[0]?.effect;
      return { delay: effect?.getTiming().delay, duration: effect?.getTiming().duration };
    });
    expect(animation).toEqual({ delay: 0, duration: 680 });
  }
  await expect(page.locator('.hero-actions')).toBeVisible();
});
