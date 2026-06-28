import type { Metadata } from 'next';
import Link from 'next/link';
import { topicSummaries } from '@/data/topicSummaries';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <main id="main-content" className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-semibold text-text-primary">Page not found</h1>
      <p className="mt-2 text-sm text-text-secondary">
        That topic does not exist. Choose one of the available topics below.
      </p>
      <ul className="mt-6 space-y-2">
        {topicSummaries.map((topic) => (
          <li key={topic.slug}>
            <Link
              href={`/${topic.slug}`}
              className="text-sm font-medium text-accent hover:underline"
            >
              {topic.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-8 w-full">
        <Footer />
      </div>
    </main>
  );
}
