import type { TopicSummary } from '@/types/question';
import { topics } from './index';

export const topicSummaries: TopicSummary[] = topics.map(
  ({ slug, title, color, questions }) => ({
    slug,
    title,
    color,
    questionCount: questions.length,
  })
);

export function getTotalQuestionCount(): number {
  return topics.reduce((sum, topic) => sum + topic.questions.length, 0);
}
