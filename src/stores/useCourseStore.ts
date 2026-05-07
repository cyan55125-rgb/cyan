import { create } from 'zustand';
import type { Course, LanguageCode, ProficiencyLevel } from '@/types';

interface CourseState {
  courses: Course[];
  selectedLanguage: LanguageCode | 'all';
  selectedLevel: ProficiencyLevel | 'all';
  searchQuery: string;
  setSelectedLanguage: (lang: LanguageCode | 'all') => void;
  setSelectedLevel: (level: ProficiencyLevel | 'all') => void;
  setSearchQuery: (query: string) => void;
  getFilteredCourses: () => Course[];
}

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: [],
  selectedLanguage: 'all',
  selectedLevel: 'all',
  searchQuery: '',

  setSelectedLanguage: (lang) => set({ selectedLanguage: lang }),

  setSelectedLevel: (level) => set({ selectedLevel: level }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  getFilteredCourses: () => {
    const { courses, selectedLanguage, selectedLevel, searchQuery } = get();
    return courses.filter((course) => {
      const languageMatch = selectedLanguage === 'all' || course.language === selectedLanguage;
      const levelMatch = selectedLevel === 'all' || course.level === selectedLevel;
      const searchMatch =
        !searchQuery ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());
      return languageMatch && levelMatch && searchMatch;
    });
  },
}));
