// Optimized image URLs for the eight PNGs that moved from public/ into
// src/assets/. Astro generates an optimized WebP for each at build time
// (Sharp via the Cloudflare adapter's compile image service), and every
// consumer below resolves its public path to the generated URL in its
// frontmatter. Any path not in this map is returned unchanged, so
// unconverted images keep working untouched.
//
// siteData.ts deliberately keeps plain string paths: its data is also
// imported by client-side scripts (StoryChapters), where an imported
// ImageMetadata object would break the image-swap code and drag the
// original PNGs into the browser bundle.

import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import autoShopEpoxyFloorAfter from '../assets/projects/auto-shop-epoxy-floor-after.png';
import mcdonalds696AwningAfter from '../assets/projects/mcdonalds-696-awning-after.png';
import mcauleyBuildingAfter from '../assets/projects/mcauley-building-after.png';
import residentialGarageBefore from '../assets/projects/residential-garage-before.png';
import residentialGarageFlakeEpoxyAfter from '../assets/projects/residential-garage-flake-epoxy-after.png';
import warehouseFlakeEpoxyAfter from '../assets/projects/warehouse-flake-epoxy-after.png';
import woodFenceStainedAfter from '../assets/projects/wood-fence-stained-after.png';
import aacPaintersLogo from '../assets/brand/aac-painters-logo.png';

const OPTIMIZED_ASSETS: Record<string, ImageMetadata> = {
  '/images/projects/auto-shop-epoxy-floor-after.png': autoShopEpoxyFloorAfter,
  '/images/projects/mcdonalds-696-awning-after.png': mcdonalds696AwningAfter,
  '/images/projects/mcauley-building-after.png': mcauleyBuildingAfter,
  '/images/projects/residential-garage-before.png': residentialGarageBefore,
  '/images/projects/residential-garage-flake-epoxy-after.png': residentialGarageFlakeEpoxyAfter,
  '/images/projects/warehouse-flake-epoxy-after.png': warehouseFlakeEpoxyAfter,
  '/images/projects/wood-fence-stained-after.png': woodFenceStainedAfter,
  '/images/brand/aac-painters-logo.png': aacPaintersLogo,
};

/**
 * Resolve a public image path (e.g. '/images/projects/mcauley-building-after.png')
 * to its optimized WebP URL. Sources are only 450-600px wide, so by default
 * the native width is kept; pass `width` to downscale (the logo is served
 * at 224px, 2x its largest 112px display size).
 */
export async function optimizedImageUrl(publicPath: string, width?: number): Promise<string> {
  const asset = OPTIMIZED_ASSETS[publicPath];
  if (!asset) return publicPath;
  const image = await getImage({
    src: asset,
    format: 'webp',
    quality: 80,
    ...(width ? { width } : {}),
  });
  return image.src;
}

/** Resolve a before/after pair's images to optimized WebP URLs. */
export async function optimizedBeforeAfterPair<T extends { beforeImage: string; afterImage: string }>(
  pair: T,
): Promise<T> {
  const [beforeImage, afterImage] = await Promise.all([
    optimizedImageUrl(pair.beforeImage),
    optimizedImageUrl(pair.afterImage),
  ]);
  return { ...pair, beforeImage, afterImage };
}
