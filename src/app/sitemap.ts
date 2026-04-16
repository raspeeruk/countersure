import type { MetadataRoute } from 'next';
import { industries } from '@/lib/pseo/industries';
import { useCases } from '@/lib/pseo/use-cases';
import { countries } from '@/lib/pseo/countries';
import { guides } from '@/lib/pseo/guides';

const BASE = 'https://countersure.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const statics: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/check-vat-number`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE}/bulk`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE}/eori-check`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/companies-house-lookup`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/api-docs`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/for`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/use-cases`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/vat-number-format`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/guide`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
  ];

  const industryUrls: MetadataRoute.Sitemap = industries.map((i) => ({
    url: `${BASE}/for/${i.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const useCaseUrls: MetadataRoute.Sitemap = useCases.map((u) => ({
    url: `${BASE}/use-cases/${u.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const countryUrls: MetadataRoute.Sitemap = countries.map((c) => ({
    url: `${BASE}/vat-number-format/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const guideUrls: MetadataRoute.Sitemap = guides.map((g) => ({
    url: `${BASE}/guide/${g.slug}`,
    lastModified: new Date(g.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...statics, ...industryUrls, ...useCaseUrls, ...countryUrls, ...guideUrls];
}
