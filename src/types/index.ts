export type { LanguageCode, ProficiencyLevel, LessonType, Lesson, Chapter, Course } from './course';

export type { User, UserProgress } from './user';

export type {
  PartOfSpeech,
  GrammarExerciseType,
  AchievementRarity,
  Author,
  VocabularyItem,
  GrammarExample,
  GrammarExercise,
  GrammarPoint,
  Achievement,
  Comment,
  Post,
} from './learn';

export type Language = 'en' | 'ja' | 'ko';

export type Difficulty = 'beginner' | 'elementary' | 'intermediate' | 'upper-intermediate' | 'advanced';

export type Level = 'beginner' | 'intermediate' | 'advanced';

export type QuestionType = 'fill-blank' | 'multiple-choice' | 'ordering';

export interface WeeklyStats {
  totalMinutes: number;
  averageDaily: number;
  longestSession: number;
  streakDays: number;
}
