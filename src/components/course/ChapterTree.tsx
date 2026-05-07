import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, CheckCircle2, Circle, BookOpen, Code2, Mic, Headphones } from 'lucide-react';
import type { Chapter } from '@/types/course';
import { cn } from '@/lib/utils';

interface ChapterTreeProps {
  chapters: Chapter[];
}

type LessonTypeIcon = 'vocabulary' | 'grammar' | 'speaking' | 'listening';

const LESSON_TYPE_ICONS: Record<LessonTypeIcon, typeof BookOpen> = {
  vocabulary: BookOpen,
  grammar: Code2,
  speaking: Mic,
  listening: Headphones,
};

function getLessonTypeFromTitle(title: string): LessonTypeIcon {
  const lower = title.toLowerCase();
  if (lower.includes('单词') || lower.includes('词汇') || lower.includes('word') || lower.includes('語彙') || lower.includes('단어')) return 'vocabulary';
  if (lower.includes('语法') || lower.includes('grammar') || lower.includes('文法') || lower.includes('문법')) return 'grammar';
  if (lower.includes('口语') || lower.includes('会话') || lower.includes('speaking') || lower.includes('会話') || lower.includes('회화') || lower.includes('发言') || lower.includes('演讲')) return 'speaking';
  return 'listening';
}

function LessonItem({ title, index, isCompleted }: { title: string; index: number; isCompleted: boolean }) {
  const lessonType = getLessonTypeFromTitle(title);
  const Icon = LESSON_TYPE_ICONS[lessonType];

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        'flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors duration-200 group cursor-pointer',
        isCompleted ? 'hover:bg-emerald-50/50' : 'hover:bg-slate-50'
      )}
    >
      <div className="flex-shrink-0">
        {isCompleted ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        ) : (
          <Circle className="w-5 h-5 text-slate-300 group-hover:text-slate-400 transition-colors" />
        )}
      </div>
      <span
        className={cn(
          'text-sm flex-1 transition-colors duration-200',
          isCompleted ? 'text-slate-500 line-through' : 'text-slate-700'
        )}
      >
        {title}
      </span>
      <Icon className={cn(
        'w-4 h-4 flex-shrink-0 transition-colors',
        isCompleted ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-500'
      )} />
    </motion.div>
  );
}

function ChapterItem({ chapter, chapterIndex, defaultOpen }: { chapter: Chapter; chapterIndex: number; defaultOpen: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const completedCount = Math.floor(Math.random() * (chapter.lessons.length + 1));

  return (
    <div className="mb-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all duration-200 group"
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          className="flex-shrink-0"
        >
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
        </motion.div>
        <div className="flex-1 text-left">
          <span className="text-sm font-semibold text-slate-800">{chapter.title}</span>
        </div>
        <span className="text-xs font-medium text-slate-400 tabular-nums">
          {completedCount}/{chapter.lessons.length}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="overflow-hidden"
          >
            <div className="mt-2 ml-4 pl-4 border-l-2 border-slate-100 space-y-1">
              {chapter.lessons.map((lesson, idx) => (
                <LessonItem
                  key={lesson.id}
                  title={lesson.title}
                  index={idx}
                  isCompleted={idx < completedCount}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ChapterTree({ chapters }: ChapterTreeProps) {
  return (
    <div className="space-y-0">
      {chapters.map((chapter, idx) => (
        <ChapterItem key={chapter.id} chapter={chapter} chapterIndex={idx} defaultOpen={idx === 0} />
      ))}
    </div>
  );
}
