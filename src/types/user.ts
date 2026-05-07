import type { LanguageCode, ProficiencyLevel } from './course';

export interface User {
  id: string;
  email: string;
  nickname: string;
  avatar: string;
  targetLanguage: LanguageCode;
  currentLevel: ProficiencyLevel;
  joinDate: string;
  studyStreak: number;
  totalStudyMinutes: number;
}

export interface UserProgress {
  userId: string;
  courseId: string;
  completedLessons: string[];
  totalTimeSpent: number;
  vocabularyMastered: number;
  lastStudyDate: string;
  weeklyGoal: number;
  weeklyProgress: number;
}
