import type { Language, QuestionType } from './index';

export interface GrammarExample {
  sentence: string;
  translation: string;
  highlight?: string;
}

export interface GrammarExercise {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
  answer: string | string[];
  explanation: string;
}

export interface GrammarPoint {
  id: string;
  title: string;
  explanation: string;
  pattern: string;
  examples: GrammarExample[];
  exercises: GrammarExercise[];
  language: Language;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}
