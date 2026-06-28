'use client';

import { useId, useState } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';
import { Topic, Level } from '@/types/question';
import { useProgressStore } from '@/store/useProgressStore';
import { AnswerContent } from './AnswerContent';
import { DifficultyBadge } from './DifficultyBadge';
import { FilterButtons } from './FilterButtons';
import { TopicHeader } from './TopicHeader';

interface ListViewProps {
  topic: Topic;
}

export function ListView({ topic }: ListViewProps) {
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState<Level | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const searchInputId = useId();

  const { markKnown, unmarkKnown, isKnown } = useProgressStore();

  const filtered = topic.questions.filter((q) => {
    const matchesSearch = q.question.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = levelFilter === 'all' || q.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const isCodingTopic = topic.slug === 'coding';

  return (
    <div className="mt-6">
      <TopicHeader topic={topic} />

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <label htmlFor={searchInputId} className="sr-only">
            Search questions in {topic.title}
          </label>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary"
            aria-hidden="true"
          />
          <input
            id={searchInputId}
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by question..."
            autoComplete="off"
            className="w-full rounded-lg border border-border bg-surface py-2 pl-9 pr-3 text-sm text-text-primary placeholder:text-text-secondary focus:border-aurora-indigo focus:outline-none"
          />
        </div>
        <FilterButtons active={levelFilter} onChange={setLevelFilter} />
      </div>

      <div className="mt-4 space-y-2">
        {filtered.length === 0 ? (
          <p
            role="status"
            className="rounded-lg border border-border bg-surface p-8 text-center text-sm text-text-secondary"
          >
            No questions match your search
          </p>
        ) : (
          filtered.map((q, idx) => {
            const isExpanded = expandedId === q.id;
            const known = isKnown(topic.slug, q.id);
            const number = String(idx + 1).padStart(2, '0');
            const buttonId = `question-${q.id}-button`;
            const answerId = `answer-${q.id}`;

            return (
              <article
                key={q.id}
                className="card-premium rounded-lg border border-border bg-surface"
              >
                <h3 className="m-0 font-normal">
                  <button
                    type="button"
                    id={buttonId}
                    onClick={() => setExpandedId(isExpanded ? null : q.id)}
                    aria-expanded={isExpanded}
                    aria-controls={answerId}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-surface-hover"
                  >
                    <span className="flex shrink-0 items-center gap-1.5">
                      {known && (
                        <>
                          <Check className="h-3.5 w-3.5 text-junior" aria-hidden="true" />
                          <span className="sr-only">Marked as known. </span>
                        </>
                      )}
                      <span className="font-mono text-xs text-text-secondary" aria-hidden="true">
                        {number}
                      </span>
                    </span>
                    <span
                      className={`flex-1 text-sm ${known ? 'text-text-secondary' : 'text-text-primary'}`}
                    >
                      {q.question}
                    </span>
                    <DifficultyBadge level={q.level} />
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-text-secondary transition-transform ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                {isExpanded && (
                  <div
                    id={answerId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="border-t border-border px-4 py-4"
                  >
                    <AnswerContent answer={q.answer} isCodingTopic={isCodingTopic} />

                    <button
                      type="button"
                      aria-pressed={known}
                      onClick={() =>
                        known
                          ? unmarkKnown(topic.slug, q.id)
                          : markKnown(topic.slug, q.id)
                      }
                      className={`mt-4 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                        known
                          ? 'bg-junior/15 text-junior'
                          : 'border border-border text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      <Check className="h-4 w-4" aria-hidden="true" />
                      {known ? 'Known' : 'Mark as known'}
                    </button>
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}
