import { test, expect } from './fixtures';

const cases = [
  { path: '/services/residential-painting/', keyword: 'House Painters', schemaName: 'Residential Interior & Exterior Painting' },
  { path: '/services/commercial-painting/', keyword: 'Commercial Painting', schemaName: 'Commercial Painting & Industrial Coatings' },
];

for (const { path, keyword, schemaName } of cases) {
  test(`service SEO: ${path} uses canonical URL, local title and real project links`, async ({ page }) => {
    await page.goto(path);
    await expect(page).toHaveTitle(new RegExp(keyword));
    await expect(page).toHaveTitle(/Patterson/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.aacpaintersinc.com${path}`);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Patterson/);
    await expect(page.getByRole('link', { name: /Explore before-and-after projects/ })).toHaveAttribute('href', '/projects/');
    const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
    const structured = schemas.map((json) => JSON.parse(json));
    const service = structured.find((item) => item['@type'] === 'Service');
    expect(service.name).toBe(schemaName);
    expect(service.provider['@id']).toBe('https://www.aacpaintersinc.com/#organization');
    expect(service.areaServed.some((area: { name: string }) => area.name === 'Patterson, CA')).toBe(true);
    const breadcrumb = structured.find((item) => item['@type'] === 'BreadcrumbList');
    expect(breadcrumb.itemListElement[1].item).toBe(`https://www.aacpaintersinc.com${path}`);
  });
}

test('homepage links to commercial painting and uses the canonical host', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.aacpaintersinc.com/');
  await expect(page.locator('#our-services').getByRole('link', { name: 'Commercial & industrial painting' })).toHaveAttribute('href', '/services/commercial-painting/');
});

const documentedCases = [
  { path: '/services/residential-painting/', id: 'residential-cedar-fence', scope: 'Exterior wood privacy fence staining' },
  { path: '/services/commercial-painting/', id: 'mcauley-landmark-restoration', scope: 'Corner storefront exterior painting' },
];

for (const { path, id, scope } of documentedCases) {
  test(`real project evidence: ${path} explains the photographed work`, async ({ page }) => {
    await page.goto(path);
    const project = page.locator(`#ba-${id}`);
    await expect(project.locator('[data-project-evidence]')).toBeVisible();
    await expect(project.locator('[data-project-evidence]')).toContainText(scope);
    await expect(project.locator('.ba-img-before')).toHaveAttribute('alt', /Before:/);
    await expect(project.locator('.ba-img-after')).toHaveAttribute('alt', /After:/);
  });
}

test('project archive links verified examples to their matching service pages', async ({ page }) => {
  await page.goto('/projects/');
  await expect(page.locator('#ba-residential-cedar-fence a.ba-service-link'))
    .toHaveAttribute('href', '/services/residential-painting/');
  await expect(page.locator('#ba-mcauley-landmark-restoration a.ba-service-link'))
    .toHaveAttribute('href', '/services/commercial-painting/');
  await expect(page.locator('#ba-auto-service-bay, #ba-residential-garage-masterpiece')).toHaveCount(0);
});

 test('retired flooring service returns 410 and is absent from homepage', async ({ page, request }) => {
 const response = await request.get('/services/epoxy-flooring/');
 expect(response.status()).toBe(410);
 await page.goto('/');
 await expect(page.locator('body')).not.toContainText(/flooring|grind.and.seal/i);
 await expect(page).toHaveTitle(/Patterson/);
 });

 test('Google reviews are visible and attributed without self-serving rating markup', async ({ page }) => {
 await page.goto('/');
 await expect(page.locator('#reviews .review-card')).toHaveCount(3);
 await expect(page.locator('#reviews')).toContainText('Nena Ayala');
 await expect(page.locator('#reviews a')).toHaveAttribute('href', /cid=2604929101649362691/);
 const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
 const serialized = schemas.join('');
 expect(serialized).toContain('2604929101649362691');
 expect(serialized).not.toContain('aggregateRating');
 });

test('epoxy is available without unverified application claims', async ({ page }) => {
  await page.goto('/services/epoxy/');
  await expect(page).toHaveTitle(/Epoxy.*Patterson/);
  await expect(page.locator('h1')).toHaveText('Epoxy');
  await expect(page.locator('body')).not.toContainText(/flooring|countertops|garage floors/i);
  await page.locator('#serviceType').selectOption('Epoxy');
  await expect(page.locator('#serviceType')).toHaveValue('Epoxy');
  await expect(page.locator('#preferredFinish')).toBeDisabled();
});


test('Patterson service discovery links to current work without inventing Patterson project locations', async ({ page }) => {
  await page.goto('/');
  const local = page.locator('#patterson-painting');
  await expect(local).toBeVisible();
  await expect(local.getByRole('heading', { name: 'Painting for Patterson homes and businesses.' })).toBeVisible();
  await expect(local.getByRole('link', { name: /Interior & exterior house painting/i })).toHaveAttribute('href', '/services/residential-painting/');
  await expect(local.getByRole('link', { name: /Commercial & industrial painting/i })).toHaveAttribute('href', '/services/commercial-painting/');
  await expect(local.getByRole('link', { name: /Epoxy project inquiries/i })).toHaveAttribute('href', '/services/epoxy/');
  await expect(local.getByRole('link', { name: /Real before-and-after projects/i })).toHaveAttribute('href', '/projects/');
  await expect(local.getByRole('link', { name: /Request a Free Estimate/i })).toHaveAttribute('href', '#quote-builder');
  await expect(local).toContainText('individual locations are identified where known');
});


test('Patterson homepage project archive link avoids a temporary redirect and commercial metadata is concise', async ({ page }) => {
  await page.goto('/');
  const archive = page.getByRole('link', { name: /View More Projects/i });
  await expect(archive).toHaveAttribute('href', '/projects/');
  const response = await page.request.get('/projects/', { maxRedirects: 0 });
  expect(response.status()).toBe(200);
  await page.goto('/services/commercial-painting/');
  const description = await page.locator('meta[name="description"]').getAttribute('content');
  expect(description).toContain('Patterson');
  expect(description?.length).toBeLessThanOrEqual(160);
});
