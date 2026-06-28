import type { Topic } from '@/types/question';
import { SITE_URL } from '@/lib/metadata';

export function buildFaqJsonLd(topic: Topic) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: topic.questions.map((question) => ({
      '@type': 'Question',
      name: question.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: question.answer.replace(/\n\n/g, '\n'),
      },
    })),
    url: `${SITE_URL}/${topic.slug}`,
  };
}
