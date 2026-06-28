'use client';

import { useState } from 'react';
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

      {/* Search + Filters */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by question..."
            aria-label="Search questions"
            className="w-full rounded-lg border border-border bg-surface py-2 pl-9 pr-3 text-sm text-text-primary placeholder:text-text-secondary focus:border-aurora-indigo focus:outline-none"
          />
        </div>
        <FilterButtons active={levelFilter} onChange={setLevelFilter} />
      </div>

      {/* Question list */}
      <div className="mt-4 space-y-2" role="list">
        {filtered.length === 0 ? (
          <div className="rounded-lg border border-border bg-surface p-8 text-center text-sm text-text-secondary">
            No questions match your search
          </div>
        ) : (
          filtered.map((q, idx) => {
            const isExpanded = expandedId === q.id;
            const known = isKnown(topic.slug, q.id);
            const number = String(idx + 1).padStart(2, '0');
            const answerId = `answer-${q.id}`;

            return (
              <div
                key={q.id}
                role="listitem"
                className="card-premium rounded-lg border border-border bg-surface"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : q.id)}
                  aria-expanded={isExpanded}
                  aria-controls={answerId}
                  className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-surface-hover"
                >
                  <span className="flex shrink-0 items-center gap-1.5">
                    {known && <Check className="h-3.5 w-3.5 text-junior" />}
                    <span className="font-mono text-xs text-text-secondary">
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
                  />
                </button>

                {isExpanded && (
                  <div id={answerId} role="region" aria-label="Answer" className="border-t border-border px-4 py-4">
                    <AnswerContent answer={q.answer} isCodingTopic={isCodingTopic} />

                    <button
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
                      <Check className="h-4 w-4" />
                      {known ? 'Known' : 'Mark as known'}
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
