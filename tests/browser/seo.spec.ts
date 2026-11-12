import { test, expect } from './fixtures';

const cases = [
  { path: '/services/residential-painting/', keyword: 'House Painters', schemaName: 'Residential Interior & Exterior Painting' },
  { path: '/services/commercial-painting/', keyword: 'Commercial Painting', schemaName: 'Commercial Painting & Industrial Coatings' },
  { path: '/services/epoxy-flooring/', keyword: 'Epoxy Flooring', schemaName: 'Epoxy Flooring & Concrete Coatings' },
];

for (const { path, keyword, schemaName } of cases) {
  test(`service SEO: ${path} uses canonical URL, local title and real project links`, async ({ page }) => {
    await page.goto(path);
    await expect(page).toHaveTitle(new RegExp(keyword));
    await expect(page).toHaveTitle(/Modesto.*Turlock/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.aacpaintersinc.com${path}`);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Modesto, Turlock/);
    await expect(page.getByRole('link', { name: /Explore before-and-after projects/ })).toHaveAttribute('href', '/projects/');
    const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
    const structured = schemas.map((json) => JSON.parse(json));
    const service = structured.find((item) => item['@type'] === 'Service');
    expect(service.name).toBe(schemaName);
    expect(service.provider['@id']).toBe('https://www.aacpaintersinc.com/#organization');
    expect(service.areaServed.some((area: { name: string }) => area.name === 'Modesto, CA')).toBe(true);
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
  { path: '/services/epoxy-flooring/', id: 'auto-service-bay', scope: 'Auto-service bay concrete floor' },
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
  await expect(page.locator('#ba-auto-service-bay a.ba-service-link'))
    .toHaveAttribute('href', '/services/epoxy-flooring/');
  await expect(page.locator('#ba-residential-garage-masterpiece a.ba-service-link'))
    .toHaveAttribute('href', '/services/epoxy-flooring/');
});
