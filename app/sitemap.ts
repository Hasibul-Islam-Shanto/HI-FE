import type { MetadataRoute } from 'next';
import { topicSlugs } from '@/data/getTopic';
import { SITE_URL } from '@/lib/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const topicRoutes = topicSlugs.map((topic) => ({
    url: `${SITE_URL}/${topic}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...topicRoutes,
  ];
}
