import { useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { Clock, Flame, BookOpen, Trophy } from 'lucide-react';
import Card from '@/components/common/Card';
import { useAuthStore } from '@/stores/useAuthStore';

interface StatItem {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix: string;
  color: string;
}

const defaultStats: StatItem[] = [
  { icon: <Clock className="w-6 h-6" />, label: '今日学习时长', value: 0, suffix: '分钟', color: '#3B82F6' },
  { icon: <Flame className="w-6 h-6" />, label: '连续学习天数', value: 0, suffix: '天', color: '#F59E0B' },
  { icon: <BookOpen className="w-6 h-6" />, label: '已掌握单词数', value: 0, suffix: '个', color: '#10B981' },
  { icon: <Trophy className="w-6 h-6" />, label: '完成课程数', value: 0, suffix: '门', color: '#8B5CF6' },
];

const exampleStats: StatItem[] = [
  { icon: <Clock className="w-6 h-6" />, label: '今日学习时长', value: 45, suffix: '分钟', color: '#3B82F6' },
  { icon: <Flame className="w-6 h-6" />, label: '连续学习天数', value: 7, suffix: '天', color: '#F59E0B' },
  { icon: <BookOpen className="w-6 h-6" />, label: '已掌握单词数', value: 128, suffix: '个', color: '#10B981' },
  { icon: <Trophy className="w-6 h-6" />, label: '完成课程数', value: 3, suffix: '门', color: '#8B5CF6' },
];

function AnimatedCounter({ targetValue, duration = 1.5 }: { targetValue: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));

  if (isInView) {
    animate(motionVal, targetValue, { duration, ease: 'easeOut' });
  }

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.5, type: 'spring', stiffness: 100, damping: 15 }}
    >
      <Card hover padding="lg" className="h-full text-center relative overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ backgroundColor: stat.color }}
        />
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
          style={{ backgroundColor: `${stat.color}12`, color: stat.color }}
        >
          {stat.icon}
        </div>
        <div className="text-3xl sm:text-4xl font-bold text-slate-800 mb-1 font-[Outfit,'Noto Sans SC',sans-serif]">
          <AnimatedCounter targetValue={stat.value} />
          <span className="text-base font-normal text-slate-400 ml-1">{stat.suffix}</span>
        </div>
        <p className="text-sm text-slate-500">{stat.label}</p>
      </Card>
    </motion.div>
  );
}

export default function StatsPanel() {
  const { isAuthenticated, user } = useAuthStore();
  const stats = isAuthenticated
    ? [
        { ...defaultStats[0], value: user?.totalStudyMinutes ?? 0 },
        { ...defaultStats[1], value: user?.studyStreak ?? 0 },
        { ...defaultStats[2], value: 128 },
        { ...defaultStats[3], value: 2 },
      ]
    : exampleStats;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 font-[Outfit,'Noto Sans SC',sans-serif]">
          学习数据
        </h2>
        <p className="mt-2 text-slate-400 text-sm">{isAuthenticated ? '你的学习成果一目了然' : '登录后查看你的真实学习数据'}</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <StatCard key={stat.label} stat={stat} index={index} />
        ))}
      </div>
    </section>
  );
}
