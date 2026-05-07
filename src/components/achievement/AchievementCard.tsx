import { motion } from 'framer-motion';
import { Lock, Sparkles } from 'lucide-react';
import Card from '@/components/common/Card';
import ProgressBar from '@/components/common/ProgressBar';
import type { Achievement } from '@/types/learn';

interface AchievementCardProps {
  achievement: Achievement;
}

const RARITY_CONFIG: Record<string, { border: string; bg: string; shadow?: string; glow?: string }> = {
  common: {
    border: 'border-slate-200',
    bg: 'bg-slate-50',
  },
  rare: {
    border: 'border-blue-200',
    bg: 'bg-blue-50/50',
    shadow: 'shadow-blue-100/50',
  },
  epic: {
    border: '',
    bg: 'bg-gradient-to-br from-purple-50 to-pink-50',
    shadow: 'shadow-purple-100/40',
  },
  legendary: {
    border: '',
    bg: 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50',
    shadow: 'shadow-amber-200/40',
    glow: 'group-hover:shadow-[0_0_20px_rgba(251,191,36,0.3)]',
  },
};

const ICON_SIZES: Record<string, string> = {
  common: 'text-3xl',
  rare: 'text-3xl',
  epic: 'text-4xl',
  legendary: 'text-4xl',
};

export default function AchievementCard({ achievement }: AchievementCardProps) {
  const isUnlocked = !!achievement.unlockedAt;
  const progressPercent = (achievement.progress / (achievement.target ?? achievement.maxProgress)) * 100;
  const config = RARITY_CONFIG[achievement.rarity] || RARITY_CONFIG.common;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Card
        padding="md"
        hover
        className={`relative overflow-hidden ${config.border} ${config.glow || ''}`}
        style={achievement.rarity === 'epic' ? { borderColor: 'transparent' } : undefined}
      >
        {achievement.rarity === 'epic' && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 p-[1px]">
            <div className="w-full h-full rounded-2xl bg-white" />
          </div>
        )}

        {achievement.rarity === 'legendary' && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/20 via-orange-400/15 to-yellow-400/20 p-[1px]">
            <div className="w-full h-full rounded-2xl bg-white relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-amber-300/30 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
            </div>
          </div>
        )}

        <div className="relative flex flex-col items-center text-center">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300 ${
              isUnlocked
                ? `${config.bg} ${config.shadow ? `shadow-lg ${config.shadow}` : ''}`
                : 'bg-slate-100'
            }`}
          >
            {isUnlocked ? (
              <span className={ICON_SIZES[achievement.rarity]}>{achievement.icon}</span>
            ) : (
              <Lock className="w-5 h-5 text-slate-300" />
            )}
          </div>

          <h4 className={`font-semibold text-sm leading-tight ${isUnlocked ? 'text-slate-800' : 'text-slate-400'}`}>
            {achievement.name}
          </h4>
          <p className={`text-xs mt-1 leading-relaxed line-clamp-2 ${isUnlocked ? 'text-slate-500' : 'text-slate-400'}`}>
            {achievement.description}
          </p>

          {!isUnlocked && (
            <div className="mt-3 w-full">
              <ProgressBar
                value={progressPercent}
                color={
                  achievement.rarity === 'legendary'
                    ? '#F59E0B'
                    : achievement.rarity === 'epic'
                      ? '#8B5CF6'
                      : achievement.rarity === 'rare'
                        ? '#3B82F6'
                        : '#94A3B8'
                }
                size="sm"
              />
              <p className="text-[11px] text-slate-400 mt-1.5">
                {achievement.progress}/{achievement.target ?? achievement.maxProgress}
              </p>
            </div>
          )}

          {isUnlocked && achievement.unlockedAt && (
            <p className="text-[11px] text-emerald-600 font-medium mt-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              已解锁
            </p>
          )}

          <span
            className={`mt-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full ${
              achievement.rarity === 'common'
                ? 'bg-slate-100 text-slate-500'
                : achievement.rarity === 'rare'
                  ? 'bg-blue-100 text-blue-700'
                  : achievement.rarity === 'epic'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700'
            }`}
          >
            {achievement.rarity === 'legendary' ? '传说' : achievement.rarity === 'epic' ? '史诗' : achievement.rarity === 'rare' ? '稀有' : '普通'}
          </span>
        </div>
      </Card>
    </motion.div>
  );
}
