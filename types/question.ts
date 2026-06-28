export type Level = 'junior' | 'middle' | 'senior';

export type FilterLevel = Level | 'all';

export interface Question {
  id: string;
  question: string;
  level: Level;
  answer: string;
}

export interface Topic {
  slug: string;
  title: string;
  description: string;
  color: string;
  questions: Question[];
}

export interface TopicSummary {
  slug: string;
  title: string;
  color: string;
  questionCount: number;
}
