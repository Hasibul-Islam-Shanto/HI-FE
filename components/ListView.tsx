'use client';

import { useId, useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import type { FilterLevel, Topic } from '@/types/question';
import { useProgressStore } from '@/store/useProgressStore';
import { FilterButtons } from './FilterButtons';
import { QuestionItem } from './QuestionItem';
import { TopicHeader } from './TopicHeader';

interface ListViewProps {
  topic: Topic;
}

export function ListView({ topic }: ListViewProps) {
  const searchParams = useSearchParams();
  const initialQuestionId = searchParams.get('q') ?? undefined;
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState<FilterLevel>('all');
  const [expandedId, setExpandedId] = useState<string | null>(
    initialQuestionId ?? null
  );
  const searchInputId = useId();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const markAllKnown = useProgressStore((s) => s.markAllKnown);

  const filtered = topic.questions.filter((q) => {
    const matchesSearch = q.question.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = levelFilter === 'all' || q.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const handleMarkAllVisible = () => {
    markAllKnown(
      topic.slug,
      filtered.map((q) => q.id)
    );
  };

  const focusSearch = useCallback(() => {
    searchInputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const isTyping =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      if (event.key === '/' && !isTyping) {
        event.preventDefault();
        focusSearch();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [focusSearch]);

  useEffect(() => {
    if (!initialQuestionId) return;
    const element = document.getElementById(`question-${initialQuestionId}-button`);
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [initialQuestionId]);

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
            ref={searchInputRef}
            id={searchInputId}
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by question..."
            autoComplete="off"
            className="w-full rounded-lg border border-border bg-surface py-2 pl-9 pr-3 text-sm text-text-primary placeholder:text-text-secondary focus:border-aurora-indigo focus:outline-none"
          />
          <p className="sr-only">Press slash to focus search</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <FilterButtons active={levelFilter} onChange={setLevelFilter} />
          {filtered.length > 0 && (
            <button
              type="button"
              onClick={handleMarkAllVisible}
              className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              Mark visible as known
            </button>
          )}
        </div>
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
          filtered.map((question, idx) => (
            <QuestionItem
              key={question.id}
              question={question}
              topic={topic}
              index={idx}
              isExpanded={expandedId === question.id}
              onToggle={() =>
                setExpandedId((current) =>
                  current === question.id ? null : question.id
                )
              }
            />
          ))
        )}
      </div>
    </div>
  );
}
