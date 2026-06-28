'use client';

import { useProgressStore } from '@/store/useProgressStore';
import { Topic } from '@/types/question';

export function TopicHeader({ topic }: { topic: Topic }) {
  const knownCount = useProgressStore((s) => (s.known[topic.slug] ?? []).length);

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
      <div>
        <h2 className="text-xl font-semibold text-text-primary">{topic.title}</h2>
        <p className="mt-0.5 text-sm text-text-secondary">{topic.description}</p>
      </div>
      <span className="shrink-0 text-sm font-medium text-text-secondary">
        {knownCount} / {topic.questions.length} learned
      </span>
    </div>
  );
}
