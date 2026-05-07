import { motion, AnimatePresence } from 'framer-motion';
import { SearchX, Sprout } from 'lucide-react';
import { useCourseStore } from '@/stores/useCourseStore';
import CourseCard from './CourseCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
};

export default function CourseGrid() {
  const filteredCourses = useCourseStore((s) => s.getFilteredCourses());

  return (
    <div>
      <AnimatePresence mode="wait">
        {filteredCourses.length > 0 ? (
          <motion.div
            key="course-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredCourses.map((course) => (
                <motion.div key={course.id} variants={itemVariants} layout exit={{ opacity: 0, scale: 0.9 }}>
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center py-20 px-4"
          >
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
                <Sprout className="w-10 h-10 text-amber-400" />
              </div>
              <SearchX className="absolute -bottom-1 -right-1 w-7 h-7 text-slate-300 bg-white rounded-full p-1" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">没有找到匹配的课程</h3>
            <p className="text-sm text-slate-400 text-center max-w-sm">
              尝试调整筛选条件或搜索关键词，探索更多精彩课程吧 🌱
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
