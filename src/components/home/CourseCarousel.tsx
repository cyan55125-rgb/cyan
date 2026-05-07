import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Clock, ChevronRight, BookOpen } from 'lucide-react';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';
import courses from '@/assets/data/courses';
import { LANGUAGES, LEVEL_CONFIGS } from '@/utils/constants';
import { formatDuration } from '@/utils/formatters';
import type { LanguageCode, ProficiencyLevel } from '@/types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

function getLanguageBadgeVariant(lang: LanguageCode): 'info' | 'danger' | 'success' {
  switch (lang) {
    case 'en':
      return 'info';
    case 'ja':
      return 'danger';
    case 'ko':
      return 'success';
    default:
      return 'info';
  }
}

function getLevelBadgeVariant(level: ProficiencyLevel): 'success' | 'warning' | 'danger' | 'default' {
  switch (level) {
    case 'beginner':
      return 'success';
    case 'intermediate':
      return 'warning';
    case 'advanced':
      return 'danger';
    default:
      return 'default';
  }
}

function getLevelLabel(level: ProficiencyLevel): string {
  const config = LEVEL_CONFIGS.find((c) => c.level === level);
  return config?.label ?? level;
}

function getLanguageLabel(lang: LanguageCode): string {
  const config = LANGUAGES.find((l) => l.code === lang);
  return config?.name ?? lang;
}

export default function CourseCarousel() {
  const navigate = useNavigate();
  const featuredCourses = courses.slice(0, 8);

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 font-[Outfit,'Noto Sans SC',sans-serif]">
            推荐课程
          </h2>
        </div>
        <button
          onClick={() => navigate('/courses')}
          className="group flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
        >
          查看全部
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {featuredCourses.map((course) => (
          <motion.div
            key={course.id}
            variants={cardVariants}
            className="snap-start flex-shrink-0 w-[280px] sm:w-[300px]"
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          >
            <Card hover padding="sm" className="overflow-hidden cursor-pointer" onClick={() => navigate(`/courses/${course.id}`)}>
              <div className="relative h-36 overflow-hidden">
                <img
                  src={course.coverImage}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge
                    text={getLanguageLabel(course.language)}
                    variant={getLanguageBadgeVariant(course.language)}
                    size="sm"
                  />
                </div>
              </div>

              <div className="p-4 space-y-3">
                <h3 className="font-semibold text-slate-800 text-base leading-snug line-clamp-1 font-[Outfit,'Noto Sans SC',sans-serif]">
                  {course.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{course.description}</p>

                <div className="flex items-center gap-2 pt-1">
                  <Badge
                    text={getLevelLabel(course.level)}
                    variant={getLevelBadgeVariant(course.level)}
                    size="sm"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    {formatDuration(course.totalDuration)}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Users className="w-3.5 h-3.5" />
                    <span>{Math.floor(Math.random() * 3000 + 500)} 在学</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
