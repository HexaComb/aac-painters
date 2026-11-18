import { test, expect } from './fixtures';

test('showcase video waits until its section approaches the viewport', async ({ page }) => {
  await page.goto('/');
  const showcase = page.locator('[data-showcase-video]');
  await expect(showcase).toHaveAttribute('data-video-src', '/videos/before-after-video.mp4');
  await expect(showcase).not.toHaveAttribute('src', /\.mp4$/);

  await showcase.scrollIntoViewIfNeeded();
  await expect(showcase).toHaveAttribute('src', '/videos/before-after-video.mp4');
  await expect(showcase).not.toHaveAttribute('data-video-src', /.+/);
});

test.describe('when reduced motion is requested', () => {
  test.use({ reducedMotion: 'reduce' });

  test('keeps decorative video downloads disabled while leaving poster images', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1700);

    const hero = page.locator('.hero-bg-video');
    const showcase = page.locator('[data-showcase-video]');
    await expect(hero).toHaveAttribute('poster', /(?:webp|_image)/);
    await expect(hero).not.toHaveAttribute('src', /\.mp4$/);
    await expect(showcase).not.toHaveAttribute('src', /\.mp4$/);
    await expect(hero).toHaveJSProperty('paused', true);
    await expect(showcase).toHaveJSProperty('paused', true);
  });
});
