import type { Language, Level } from './index';

export type LessonType = 'vocabulary' | 'grammar' | 'listening' | 'speaking' | 'reading' | 'writing';

export type LanguageCode = Language;

export type ProficiencyLevel = Level;

export interface Lesson {
  id: string;
  title: string;
  duration: number;
  description: string;
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  language: LanguageCode;
  level: ProficiencyLevel;
  coverImage: string;
  chapters: Chapter[];
  totalLessons: number;
  totalDuration: number;
  instructor: string;
  tags: string[];
}
