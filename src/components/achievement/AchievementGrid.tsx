import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';
import AchievementCard from './AchievementCard';
import type { Achievement } from '@/types/achievement';

interface AchievementGridProps {
  achievements: Achievement[];
}

type CategoryFilter = 'all' | 'learning' | 'persistence' | 'social' | 'mastery';

const CATEGORY_TABS: { key: CategoryFilter; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'learning', label: '学习类' },
  { key: 'persistence', label: '坚持类' },
  { key: 'social', label: '社交类' },
  { key: 'mastery', label: '精通类' },
];

export default function AchievementGrid({ achievements }: AchievementGridProps) {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');

  const filtered =
    activeFilter === 'all'
      ? achievements
      : achievements.filter((a) => a.category === activeFilter);

  const unlockedCount = achievements.filter((a) => !!a.unlockedAt).length;

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 22 } },
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <h3 className="font-bold text-base text-slate-800">成就墙</h3>
        </div>
        <Badge
          text={`${unlockedCount}/${achievements.length} 已解锁`}
          variant={unlockedCount >= achievements.length / 2 ? 'success' : 'warning'}
          size="sm"
        />
      </div>

      <div className="flex gap-2 mb-5 overflow-x-auto pb-1 -mx-1 px-1">
        {CATEGORY_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveFilter(tab.key)}
            className={`px-4 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-all duration-200 ${
              activeFilter === tab.key
                ? 'bg-amber-500 text-white shadow-md shadow-amber-200'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={activeFilter}
      >
        {filtered.map((achievement) => (
          <motion.div key={achievement.id} variants={cardVariants}>
            <AchievementCard achievement={achievement} />
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-12"
          >
            <Trophy className="w-12 h-12 text-slate-200 mx-auto mb-3" />
            <p className="text-sm text-slate-500">该分类暂无成就</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
