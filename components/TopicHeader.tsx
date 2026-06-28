'use client';

import { useProgressStore } from '@/store/useProgressStore';
import { Topic } from '@/types/question';

export function TopicHeader({ topic }: { topic: Topic }) {
  const knownCount = useProgressStore((s) => (s.known[topic.slug] ?? []).length);

  return (
    <header className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
      <div>
        <h1
          id={`topic-${topic.slug}-heading`}
          className="text-xl font-semibold text-text-primary"
        >
          {topic.title}
        </h1>
        <p className="mt-0.5 text-sm text-text-secondary">{topic.description}</p>
      </div>
      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="shrink-0 text-sm font-medium text-text-secondary"
      >
        <span className="sr-only">Progress: </span>
        {knownCount} / {topic.questions.length} learned
      </p>
    </header>
  );
}
