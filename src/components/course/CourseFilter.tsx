import { useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCourseStore } from '@/stores/useCourseStore';
import { LANGUAGES, LEVEL_CONFIGS } from '@/utils/constants';
import type { LanguageCode, ProficiencyLevel } from '@/types/course';
import { cn } from '@/lib/utils';

type FilterLanguage = LanguageCode | 'all';
type FilterLevel = ProficiencyLevel | 'all';

const LANGUAGE_TABS = [{ code: 'all' as const, name: '全部', flag: '', primaryColor: '#64748B' }, ...LANGUAGES];

const LEVEL_TABS = [{ level: 'all' as const, label: '全部', color: '#64748B' }, ...LEVEL_CONFIGS];

export default function CourseFilter() {
  const { selectedLanguage, selectedLevel, searchQuery, setSelectedLanguage, setSelectedLevel, setSearchQuery } =
    useCourseStore();

  return (
    <div className="sticky top-20 z-30 bg-gradient-to-b from-slate-50/95 to-transparent pb-4 backdrop-blur-sm">
      <div className="rounded-2xl bg-white/80 shadow-sm border border-slate-100/60 p-5 backdrop-blur-md">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-hide">
            {LANGUAGE_TABS.map((tab) => {
              const isActive = (tab.code === 'all' ? selectedLanguage === 'en' && false : selectedLanguage === tab.code) || (tab.code === 'all' && !['en', 'ja', 'ko'].includes(selectedLanguage));
              const actualActive = tab.code === 'all'
                ? selectedLanguage === 'all'
                : selectedLanguage === tab.code;
              return (
                <button
                  key={tab.code}
                  onClick={() => setSelectedLanguage(tab.code as FilterLanguage)}
                  className={cn(
                    'relative flex items-center gap-1.5 px-4 py-2 text-sm font-medium whitespace-nowrap rounded-full transition-all duration-300',
                    actualActive
                      ? 'text-slate-900'
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                  )}
                >
                  {actualActive && (
                    <motion.div
                      layoutId="language-indicator"
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: `${tab.primaryColor}15` }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.flag}</span>
                  <span className="relative z-10">{tab.name}</span>
                  {actualActive && (
                    <motion.div
                      layoutId="language-underline"
                      className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                      style={{ backgroundColor: tab.primaryColor }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              {LEVEL_TABS.map((tab) => {
                const actualActive = tab.level === 'all'
                  ? selectedLevel === 'all'
                  : selectedLevel === tab.level;
                return (
                  <motion.button
                    key={tab.level}
                    onClick={() => setSelectedLevel(tab.level as FilterLevel)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={cn(
                      'px-4 py-1.5 text-xs font-medium rounded-[20px] transition-all duration-200 border',
                      actualActive
                        ? 'text-white shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    )}
                    style={
                      actualActive
                        ? { backgroundColor: tab.color, borderColor: tab.color }
                        : undefined
                    }
                  >
                    {tab.label}
                  </motion.button>
                );
              })}
            </div>

            <div className="relative min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索课程..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
