import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getTopic, topicSlugs } from '@/data/getTopic';
import { SITE_NAME, SITE_URL } from '@/lib/metadata';
import { buildFaqJsonLd } from '@/lib/faqJsonLd';
import { Footer } from '@/components/Footer';
import { ListView } from '@/components/ListView';

interface TopicPageProps {
  params: Promise<{ topic: string }>;
}

export async function generateStaticParams() {
  return topicSlugs.map((topic) => ({ topic }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic: slug } = await params;
  const topic = await getTopic(slug);

  if (!topic) {
    return { title: 'Topic not found' };
  }

  const title = `${topic.title} Interview Questions`;
  const description = `${topic.description} Practice ${topic.questions.length} ${topic.title} frontend interview questions with answers and progress tracking.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${topic.slug}`,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/${topic.slug}`,
    },
    twitter: {
      title: `${title} | ${SITE_NAME}`,
      description,
    },
  };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { topic: slug } = await params;
  const topic = await getTopic(slug);

  if (!topic) {
    notFound();
  }

  const faqJsonLd = buildFaqJsonLd(topic);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main id="main-content">
        <section aria-labelledby={`topic-${topic.slug}-heading`}>
          <Suspense fallback={<div className="mt-6 text-sm text-text-secondary">Loading questions…</div>}>
            <ListView topic={topic} />
          </Suspense>
        </section>
        <Footer />
      </main>
    </>
  );
}
