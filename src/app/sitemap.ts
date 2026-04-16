import type { MetadataRoute } from 'next';

const BASE = 'https://countersure.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const cornerstones = [
    '',
    '/check-vat-number',
    '/vat-number-checker',
    '/verify-vat-uk',
    '/bulk',
    '/check-eori',
    '/api',
    '/pricing',
    '/contact',
    '/guides',
    '/privacy',
    '/terms',
  ];
  return cornerstones.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }));
}
