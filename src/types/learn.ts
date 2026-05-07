import type { LanguageCode } from './course';

export type PartOfSpeech = 'noun' | 'verb' | 'adjective' | 'adverb' | 'pronoun' | 'preposition' | 'conjunction' | 'interjection';
export type GrammarExerciseType = 'fill-blank' | 'multiple-choice' | 'ordering';
export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface Author {
  id: string;
  name: string;
  avatar: string;
  level?: string;
}

export interface VocabularyItem {
  id: string;
  languageId: LanguageCode;
  word: string;
  phonetic: string;
  meaning: string;
  example: string;
  exampleTranslation: string;
  partOfSpeech: PartOfSpeech;
  difficulty: 1 | 2 | 3 | 4 | 5;
  masteryLevel: number;
  nextReviewAt: string;
  reviewCount: number;
}

export interface GrammarExample {
  sentence: string;
  translation: string;
  highlight: string;
}

export interface GrammarExercise {
  id: string;
  type: GrammarExerciseType;
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
}

export interface GrammarPoint {
  id: string;
  languageId: LanguageCode;
  title: string;
  explanation: string;
  pattern: string;
  examples: GrammarExample[];
  exercises: GrammarExercise[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: AchievementRarity;
  category: string;
  condition: string;
  progress: number;
  maxProgress: number;
  target?: number;
  unlockedAt?: string | null;
}

export interface Comment {
  id: string;
  author: Author;
  content: string;
  createdAt: string;
  likes: number;
}

export interface Post {
  id: string;
  author: Author;
  title?: string;
  content: string;
  images?: string[];
  languageTag?: LanguageCode;
  likes: number;
  comments: number;
  tags?: string[];
  createdAt: string;
  isLiked?: boolean;
  commentList?: Comment[];
}
