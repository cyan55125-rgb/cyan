import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Users } from 'lucide-react';
import type { Course } from '@/types/course';
import { LANGUAGES, LEVEL_CONFIGS, LANGUAGE_THEMES } from '@/utils/constants';
import Badge from '@/components/common/Badge';
import ProgressBar from '@/components/common/ProgressBar';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const navigate = useNavigate();
  const langConfig = LANGUAGES.find((l) => l.code === course.language);
  const levelConfig = LEVEL_CONFIGS.find((l) => l.level === course.level);
  const theme = LANGUAGE_THEMES[course.language as keyof typeof LANGUAGE_THEMES];
  const simulatedProgress = Math.floor(Math.random() * 100);

  const levelVariant = course.level === 'beginner' ? 'success' : course.level === 'intermediate' ? 'warning' : 'danger';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={() => navigate(`/courses/${course.id}`)}
      className="group cursor-pointer rounded-2xl bg-white shadow-sm border border-slate-100/80 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-shadow duration-300"
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={course.coverImage}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute top-3 right-3">
          <span
            className={cn(
              'inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-white/90 backdrop-blur-sm shadow-sm'
            )}
          >
            <span>{langConfig?.flag}</span>
            <span style={{ color: theme?.primary }}>{langConfig?.code.toUpperCase()}</span>
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900 truncate group-hover:text-blue-600 transition-colors duration-200">
            {course.title}
          </h3>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {levelConfig && (
            <Badge text={levelConfig.label} variant={levelVariant} size="sm" />
          )}
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            {course.totalLessons} 课时
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {Math.floor(Math.random() * 5000 + 200)} 人学习
          </span>
        </div>

        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {course.description}
        </p>

        <ProgressBar value={simulatedProgress} color={theme?.primary} size="sm" />
      </div>
    </motion.div>
  );
}
