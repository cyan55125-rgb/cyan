import { motion } from 'framer-motion';
import { Clock, BookOpen, Flame, ArrowRight } from 'lucide-react';
import ProgressRing from '@/components/progress/ProgressRing';
import RadarChart from '@/components/progress/RadarChart';
import StatsCards from '@/components/progress/StatsCards';
import HeatmapCalendar from '@/components/progress/HeatmapCalendar';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';

const MOCK_RADAR_DATA = [
  { subject: '词汇量', value: 78 },
  { subject: '语法掌握', value: 65 },
  { subject: '听力理解', value: 72 },
  { subject: '口语表达', value: 55 },
  { subject: '阅读能力', value: 82 },
];

const RECENT_RECORDS = [
  { date: '今天 09:30', content: '英语 - Unit 5 词汇学习', duration: 25 },
  { date: '昨天 20:15', content: '日语 - N3语法练习', duration: 35 },
  { date: '昨天 14:00', content: '韩语 - TOPIK听力训练', duration: 20 },
  { date: '前天 19:30', content: '英语 - 口语对话练习', duration: 30 },
  { date: '前天 10:00', content: '日语 - 阅读理解精读', duration: 40 },
  { date: '3天前 21:00', content: '韩语 - 写作模板练习', duration: 25 },
  { date: '4天前 08:30', content: '英语 - 发音跟读训练', duration: 15 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 22 } },
};

export default function ProgressPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/50 via-white to-emerald-50/30 px-4 py-8 md:px-8">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={sectionVariants} className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800" style={{ fontFamily: "'Outfit', 'Noto Sans SC', sans-serif" }}>
            学习进度
          </h1>
          <p className="text-slate-500 mt-1 text-sm">追踪你的语言学习旅程</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.div
            variants={sectionVariants}
            className="lg:col-span-3"
          >
            <Card padding="lg" className="text-center sticky top-6">
              <ProgressRing progress={68} size={160} strokeWidth={10} color="#3B82F6" label="总体完成度" />
              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="font-medium">连续学习 12 天</span>
                </div>
                <div className="flex justify-center gap-2 flex-wrap">
                  <Badge text="英语 LV.15" variant="info" size="md" />
                  <Badge text="日语 N3" variant="danger" size="md" />
                  <Badge text="韩语 TOPIK4" variant="success" size="md" />
                </div>
              </div>
            </Card>
          </motion.div>

          <div className="lg:col-span-9 space-y-6">
            <motion.div variants={sectionVariants}>
              <StatsCards totalMinutes={1280} vocabularyCount={1247} completedLessons={36} globalRank={892} />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={sectionVariants}>
                <Card padding="md">
                  <h3 className="text-sm font-semibold text-slate-700 mb-4">能力雷达图</h3>
                  <RadarChart data={MOCK_RADAR_DATA} color="#3B82F6" />
                  <div className="flex justify-center gap-4 mt-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> 英语
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400" /> 日语
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> 韩语
                    </span>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={sectionVariants}>
                <HeatmapCalendar />
              </motion.div>
            </div>

            <motion.div variants={sectionVariants}>
              <Card padding="md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-slate-700">最近学习记录</h3>
                  <button className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                    查看全部 <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="space-y-3">
                  {RECENT_RECORDS.map((record) => (
                    <div
                      key={record.date}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                        <Clock className="w-4 h-4 text-blue-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-700 truncate">{record.content}</p>
                        <p className="text-xs text-slate-400">{record.date}</p>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 flex-shrink-0">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{record.duration}分钟</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
