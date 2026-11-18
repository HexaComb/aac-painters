import { expect, test } from '@playwright/test';

test('complete original process section remains visible and interactive below the sticky header', async ({ page }) => {
  await page.goto('/#our-process');
  const section = page.locator('#our-process');
  const heading = section.locator('#process-heading');
  await expect(heading).toHaveText(/Simple, Stress-Free,\s*From Start to Finish\./);
  await expect(heading).toBeInViewport();
  await expect.poll(async () => {
    const head = await heading.boundingBox();
    const nav = await page.locator('.site-header').boundingBox();
    return Boolean(head && nav && head.y >= nav.y + nav.height);
  }).toBe(true);
  await expect(section.locator('[data-stage-btn]')).toHaveCount(4);
  for (let index = 0; index < 4; index++) {
    const button = section.locator('[data-stage-btn]').nth(index);
    await button.click();
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    await expect(section.locator('[data-stage-main-title]')).toHaveText(await button.locator('h3').innerText());
    await expect(section.locator('[data-stage-main-img]')).toBeVisible();
  }
  const width = await page.evaluate(() => ({content: document.documentElement.scrollWidth, viewport: innerWidth}));
  expect(width.content).toBeLessThanOrEqual(width.viewport);
});
