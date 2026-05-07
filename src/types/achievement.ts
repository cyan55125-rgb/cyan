import type { Rarity, AchievementCategory } from './index';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: Rarity;
  category: AchievementCategory;
  condition: string;
  progress: number;
  target: number;
  unlockedAt?: string;
}
