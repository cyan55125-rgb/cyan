import type { Language, Level, Difficulty } from './index';

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
  language: Language;
  level: Level;
  coverImage: string;
  chapters: Chapter[];
  totalLessons: number;
  totalDuration: number;
  instructor: string;
  tags: string[];
}
