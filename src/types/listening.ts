import type { Language, Difficulty } from './index';

export interface ListeningQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number;
}

export interface ListeningMaterial {
  id: string;
  title: string;
  content: string;
  translation: string;
  difficulty: Difficulty;
  duration: number;
  language: Language;
  questions: ListeningQuestion[];
  category: string;
}
