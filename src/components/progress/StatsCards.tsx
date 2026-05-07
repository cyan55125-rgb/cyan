import { motion } from 'framer-motion';
import { Clock, BookOpen, GraduationCap, TrendingUp } from 'lucide-react';
import Card from '@/components/common/Card';

interface StatItem {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  color: string;
  bgColor: string;
}

interface StatsCardsProps {
  totalMinutes?: number;
  vocabularyCount?: number;
  completedLessons?: number;
  globalRank?: number;
  className?: string;
}

const defaultStats: StatItem[] = [
  { icon: <Clock className="w-5 h-5" />, value: 128, label: '总学习时长', color: '#3B82F6', bgColor: 'bg-blue-50' },
  { icon: <BookOpen className="w-5 h-5" />, value: 1247, label: '掌握单词数', color: '#10B981', bgColor: 'bg-emerald-50' },
  { icon: <GraduationCap className="w-5 h-5" />, value: 36, label: '完成课堂数', color: '#F59E0B', bgColor: 'bg-amber-50' },
  { icon: <TrendingUp className="w-5 h-5" />, value: 892, label: '全球排名', color: '#8B5CF6', bgColor: 'bg-purple-50' },
];

function formatStatValue(value: string | number): string {
  if (typeof value === 'number') {
    if (value >= 10000) return `${(value / 10000).toFixed(1)}万`;
    if (value >= 1000) return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`;
    return String(value);
  }
  return value;
}

export default function StatsCards({
  totalMinutes,
  vocabularyCount,
  completedLessons,
  globalRank,
  className,
}: StatsCardsProps) {
  const stats: StatItem[] = [
    { ...defaultStats[0], value: totalMinutes ?? defaultStats[0].value },
    { ...defaultStats[1], value: vocabularyCount ?? defaultStats[1].value },
    { ...defaultStats[2], value: completedLessons ?? defaultStats[2].value },
    { ...defaultStats[3], value: globalRank ?? defaultStats[3].value },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  };

  return (
    <motion.div
      className={`grid grid-cols-2 lg:grid-cols-4 gap-4 ${className || ''}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {stats.map((stat) => (
        <motion.div key={stat.label} variants={cardVariants}>
          <Card padding="sm" hover>
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center flex-shrink-0`}
                style={{ color: stat.color }}
              >
                {stat.icon}
              </div>
              <div className="min-w-0">
                <p className="text-lg font-bold text-slate-800 leading-tight">
                  {formatStatValue(stat.value)}
                </p>
                <p className="text-xs text-slate-500 truncate">{stat.label}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
