import { create } from 'zustand';
import type { UserProgress, Achievement, WeeklyStats } from '@/types';

interface ProgressState {
  progress: Record<string, UserProgress>;
  weeklyStudyTime: number[];
  achievements: Achievement[];
  updateLessonProgress: (courseId: string, lessonId: string) => void;
  addStudyTime: (minutes: number) => void;
  checkAchievements: () => Achievement[];
  getWeeklyStats: () => WeeklyStats;
}

const DEFAULT_WEEKLY_TIME = [0, 0, 0, 0, 0, 0, 0];

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_lesson',
    name: '初学者',
    description: '完成第一节课',
    icon: '🎯',
    rarity: 'common',
    category: 'learning',
    condition: '完成任意一节课',
    progress: 0,
    maxProgress: 1,
    unlockedAt: null,
  },
  {
    id: 'streak_7',
    name: '坚持一周',
    description: '连续学习7天',
    icon: '🔥',
    rarity: 'rare',
    category: 'streak',
    condition: '连续7天登录学习',
    progress: 0,
    maxProgress: 7,
    unlockedAt: null,
  },
  {
    id: 'vocab_100',
    name: '词汇达人',
    description: '掌握100个单词',
    icon: '📚',
    rarity: 'epic',
    category: 'vocabulary',
    condition: '累计掌握100个单词',
    progress: 0,
    maxProgress: 100,
    unlockedAt: null,
  },
  {
    id: 'time_10h',
    name: '学海无涯',
    description: '累计学习10小时',
    icon: '⏰',
    rarity: 'legendary',
    category: 'time',
    condition: '累计学习600分钟',
    progress: 0,
    maxProgress: 600,
    unlockedAt: null,
  },
];

function getTodayIndex(): number {
  return new Date().getDay();
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  progress: {},
  weeklyStudyTime: [...DEFAULT_WEEKLY_TIME],
  achievements: [...DEFAULT_ACHIEVEMENTS],

  updateLessonProgress: (courseId: string, lessonId: string) => {
    set((state) => {
      const existing = state.progress[courseId];
      const updatedProgress: UserProgress = existing
        ? {
            ...existing,
            completedLessons: existing.completedLessons.includes(lessonId)
              ? existing.completedLessons
              : [...existing.completedLessons, lessonId],
            lastStudyDate: new Date().toISOString(),
          }
        : {
            userId: '',
            courseId,
            completedLessons: [lessonId],
            totalTimeSpent: 0,
            vocabularyMastered: 0,
            lastStudyDate: new Date().toISOString(),
            weeklyGoal: 5,
            weeklyProgress: 0,
          };
      return {
        progress: { ...state.progress, [courseId]: updatedProgress },
      };
    });
  },

  addStudyTime: (minutes: number) => {
    set((state) => {
      const updated = [...state.weeklyStudyTime];
      const todayIndex = getTodayIndex();
      updated[todayIndex] += minutes;

      const totalMinutes = updated.reduce((sum, t) => sum + t, 0);
      const updatedAchievements = state.achievements.map((a) => {
        if (a.id === 'time_10h') {
          const newProgress = Math.min(a.progress + minutes, a.maxProgress);
          return {
            ...a,
            progress: newProgress,
            unlockedAt:
              newProgress >= a.maxProgress && !a.unlockedAt
                ? new Date().toISOString()
                : a.unlockedAt,
          };
        }
        return a;
      });

      return {
        weeklyStudyTime: updated,
        achievements: updatedAchievements,
      };
    });
  },

  checkAchievements: () => {
    const state = get();
    const totalCompleted = Object.values(state.progress).reduce(
      (sum, p) => sum + p.completedLessons.length,
      0
    );

    return state.achievements.map((a) => {
      let newProgress = a.progress;
      if (a.id === 'first_lesson' && totalCompleted > 0) {
        newProgress = Math.min(totalCompleted, a.maxProgress);
      }

      return {
        ...a,
        progress: newProgress,
        unlockedAt:
          newProgress >= a.maxProgress && !a.unlockedAt
            ? new Date().toISOString()
            : a.unlockedAt,
      };
    });
  },

  getWeeklyStats: (): WeeklyStats => {
    const { weeklyStudyTime } = get();
    const totalMinutes = weeklyStudyTime.reduce((sum, t) => sum + t, 0);
    const activeDays = weeklyStudyTime.filter((t) => t > 0).length;
    const averageDaily = activeDays > 0 ? Math.round(totalMinutes / activeDays) : 0;
    const longestSession = Math.max(...weeklyStudyTime, 0);

    let streakDays = 0;
    for (let i = weeklyStudyTime.length - 1; i >= 0; i--) {
      const idx = (getTodayIndex() - (weeklyStudyTime.length - 1 - i) + 7) % 7;
      if (weeklyStudyTime[idx] > 0) {
        streakDays++;
      } else {
        break;
      }
    }

    return {
      totalMinutes,
      averageDaily,
      longestSession,
      streakDays,
    };
  },
}));
