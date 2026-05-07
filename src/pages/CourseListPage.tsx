import { motion } from 'framer-motion';
import { GraduationCap, Sparkles } from 'lucide-react';
import CourseFilter from '@/components/course/CourseFilter';
import CourseGrid from '@/components/course/CourseGrid';

export default function CourseListPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/30 via-white to-emerald-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="pt-8 pb-6 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-100/50 mb-4">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-medium text-slate-600">知识花园 · Language Garden</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
            探索课程
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            在这里发现适合你的语言学习之旅，从入门到精通，每一步都有精彩内容陪伴
          </p>
        </motion.div>

        <CourseFilter />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-6"
        >
          <CourseGrid />
        </motion.div>
      </div>
    </div>
  );
}
