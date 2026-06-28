import { getTotalQuestionCount } from '@/data/topicSummaries';

export const SITE_NAME = 'Frontend';
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://frontend.hi-shanto.me';

export function getSiteDescription(): string {
  const count = getTotalQuestionCount();
  return `${count} curated frontend interview questions across HTML, CSS, JavaScript, TypeScript, React, React Native, Vue, Next.js, and Coding — with progress tracking.`;
}

export function getDefaultMetadata() {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: getSiteDescription(),
    openGraph: {
      type: 'website' as const,
      locale: 'en_US',
      siteName: SITE_NAME,
      title: SITE_NAME,
      description: getSiteDescription(),
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: SITE_NAME,
      description: getSiteDescription(),
    },
  };
}
