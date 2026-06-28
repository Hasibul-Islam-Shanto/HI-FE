export type Level = 'junior' | 'middle' | 'senior';

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
