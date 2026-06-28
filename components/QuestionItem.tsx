'use client';

import { ChevronDown, Check } from 'lucide-react';
import type { Question, Topic } from '@/types/question';
import { useProgressStore } from '@/store/useProgressStore';
import { AnswerContent } from './AnswerContent';
import { DifficultyBadge } from './DifficultyBadge';

interface QuestionItemProps {
  question: Question;
  topic: Topic;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export function QuestionItem({
  question,
  topic,
  index,
  isExpanded,
  onToggle,
}: QuestionItemProps) {
  const markKnown = useProgressStore((s) => s.markKnown);
  const unmarkKnown = useProgressStore((s) => s.unmarkKnown);
  const known = useProgressStore((s) =>
    (s.known[topic.slug] ?? []).includes(question.id)
  );

  const number = String(index + 1).padStart(2, '0');
  const buttonId = `question-${question.id}-button`;
  const answerId = `answer-${question.id}`;
  const isCodingTopic = topic.slug === 'coding';

  return (
    <article className="card-premium rounded-lg border border-border bg-surface">
      <h3 className="m-0 font-normal">
        <button
          type="button"
          id={buttonId}
          onClick={onToggle}
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
            {question.question}
          </span>
          <DifficultyBadge level={question.level} />
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
          <AnswerContent answer={question.answer} isCodingTopic={isCodingTopic} />

          <button
            type="button"
            aria-pressed={known}
            onClick={() =>
              known
                ? unmarkKnown(topic.slug, question.id)
                : markKnown(topic.slug, question.id)
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
}
