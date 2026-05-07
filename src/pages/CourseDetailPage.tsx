import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  BookOpen,
  Users,
  Star,
  Clock,
  Play,
  TreeDeciduous,
  AlertCircle,
} from 'lucide-react';
import courses from '@/assets/data/courses';
import { LANGUAGES, LEVEL_CONFIGS, LANGUAGE_THEMES } from '@/utils/constants';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import ChapterTree from '@/components/course/ChapterTree';
import { cn } from '@/lib/utils';

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-4"
        >
          <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
            <AlertCircle className="w-9 h-9 text-red-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">课程未找到</h2>
          <p className="text-sm text-slate-500 mb-6">抱歉，你访问的课程不存在或已被移除</p>
          <Button variant="outline" icon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/courses')}>
            返回课程列表
          </Button>
        </motion.div>
      </div>
    );
  }

  const langConfig = LANGUAGES.find((l) => l.code === course.language);
  const levelConfig = LEVEL_CONFIGS.find((l) => l.level === course.level);
  const theme = LANGUAGE_THEMES[course.language as keyof typeof LANGUAGE_THEMES];
  const levelVariant = course.level === 'beginner' ? 'success' : course.level === 'intermediate' ? 'warning' : 'danger';
  const simulatedRating = (4 + Math.random()).toFixed(1);
  const simulatedStudents = Math.floor(Math.random() * 5000 + 200);

  const firstIncompleteLesson = course.chapters
    .flatMap((ch) => ch.lessons)
    .find((_, idx) => idx >= Math.floor(Math.random() * course.totalLessons * 0.3));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="relative h-[300px] overflow-hidden">
          <img
            src={course.coverImage}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${theme?.primary}33 0%, ${theme?.primary}aa 60%, rgba(0,0,0,0.85) 100%)`,
            }}
          />
          <button
            onClick={() => navigate('/courses')}
            className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-md text-white/90 hover:bg-black/40 hover:text-white transition-all duration-200 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            返回
          </button>
          <div className="absolute bottom-6 left-6 right-6 z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.45 }}
            >
              <div className="flex items-center gap-2 mb-3">
                {langConfig && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/20">
                    <span>{langConfig.flag}</span>
                    <span>{langConfig.nativeName}</span>
                  </span>
                )}
                {levelConfig && (
                  <Badge text={levelConfig.label} variant={levelVariant} size="sm" />
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight">
                {course.title}
              </h1>
              <p className="text-sm text-white/70">{course.instructor}</p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.45 }}
            className="rounded-2xl bg-white shadow-lg shadow-slate-200/50 border border-slate-100 p-6 mb-8"
          >
            <p className="text-sm text-slate-600 leading-relaxed">{course.description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
              {[
                { icon: BookOpen, label: '总课时', value: `${course.totalLessons} 节` },
                { icon: Clock, label: '总时长', value: `${course.totalDuration} 分钟` },
                { icon: Users, label: '学习人数', value: `${simulatedStudents.toLocaleString()} 人` },
                { icon: Star, label: '平均评分', value: simulatedRating },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${theme?.primary}10` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: theme?.primary }} />
                  </div>
                  <span className="text-xs text-slate-400">{label}</span>
                  <span className="text-sm font-semibold text-slate-700">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.45 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-5">
              <TreeDeciduous className="w-5 h-5 text-emerald-500" />
              <h2 className="text-lg font-bold text-slate-800">章节目录</h2>
              <span className="text-xs text-slate-400 font-medium ml-auto">
                共 {course.chapters.length} 章 · {course.totalLessons} 节课
              </span>
            </div>
            <ChapterTree chapters={course.chapters} />
          </motion.div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-lg border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="hidden sm:block">
              <p className="text-xs text-slate-400">准备开始学习</p>
              <p className="text-sm font-medium text-slate-700">
                {firstIncompleteLesson?.title || course.chapters[0]?.lessons[0]?.title || '第一节课'}
              </p>
            </div>
            <Button
              size="lg"
              icon={<Play className="w-5 h-5" />}
              fullWidth
              onClick={() => {
                const targetId = firstIncompleteLesson?.id || course.chapters[0]?.lessons[0]?.id;
                console.log('Navigate to lesson:', targetId);
              }}
              style={{
                backgroundImage: theme?.gradient,
                boxShadow: `0 4px 14px ${theme?.primary}40`,
              }}
              className="sm:w-auto"
            >
              开始学习
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
