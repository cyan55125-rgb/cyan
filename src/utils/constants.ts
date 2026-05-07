import type { LanguageCode, ProficiencyLevel } from '../types/course';

export interface LanguageConfig {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface LevelConfig {
  level: ProficiencyLevel;
  label: string;
  description: string;
  color: string;
}

export interface NavItem {
  key: string;
  label: string;
  icon: string;
  path: string;
}

export const LANGUAGES: LanguageConfig[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    primaryColor: '#3B82F6',
    secondaryColor: '#93C5FD',
  },
  {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    primaryColor: '#EF4444',
    secondaryColor: '#FCA5A5',
  },
  {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    flag: '🇰🇷',
    primaryColor: '#10B981',
    secondaryColor: '#6EE7B7',
  },
];

export const LEVEL_CONFIGS: LevelConfig[] = [
  {
    level: 'beginner',
    label: '入门',
    description: '从零开始，掌握基础词汇和语法',
    color: '#22C55E',
  },
  {
    level: 'intermediate',
    label: '进阶',
    description: '提升听说读写能力，拓展表达范围',
    color: '#F59E0B',
  },
  {
    level: 'advanced',
    label: '高级',
    description: '流利运用语言，深入理解文化内涵',
    color: '#8B5CF6',
  },
];

export const LANGUAGE_THEMES: Record<LanguageCode, { primary: string; secondary: string; gradient: string }> = {
  en: {
    primary: '#3B82F6',
    secondary: '#93C5FD',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
  },
  ja: {
    primary: '#EF4444',
    secondary: '#FCA5A5',
    gradient: 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)',
  },
  ko: {
    primary: '#10B981',
    secondary: '#6EE7B7',
    gradient: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
  },
};

export const NAV_ITEMS: NavItem[] = [
  {
    key: 'home',
    label: '首页',
    icon: 'Home',
    path: '/',
  },
  {
    key: 'learn',
    label: '学习',
    icon: 'BookOpen',
    path: '/learn',
  },
  {
    key: 'practice',
    label: '练习',
    icon: 'Target',
    path: '/practice',
  },
  {
    key: 'community',
    label: '社区',
    icon: 'Users',
    path: '/community',
  },
  {
    key: 'profile',
    label: '我的',
    icon: 'User',
    path: '/profile',
  },
];
