import { brand, seoServiceAreas } from './siteData';

interface ServiceSeoInput {
  path: string;
  name: string;
  description: string;
}

// Share one canonical hostname and the Organization ID from BaseLayout.
export function makeServiceStructuredData({ path, name, description }: ServiceSeoInput): Record<string, unknown>[] {
  const url = new URL(path, brand.domain).toString();
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#service`,
      name,
      serviceType: name,
      description,
      url,
      provider: { '@id': `${brand.domain}/#organization` },
      areaServed: seoServiceAreas.map((city) => ({ '@type': 'City', name: `${city}, CA` })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${brand.domain}/` },
        { '@type': 'ListItem', position: 2, name, item: url },
      ],
    },
  ];
}
