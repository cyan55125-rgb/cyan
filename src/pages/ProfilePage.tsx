import { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit3, BookOpen, BookmarkCheck, Star, ArrowRight, MapPin, Calendar, PenLine } from 'lucide-react';
import Avatar from '@/components/common/Avatar';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Modal from '@/components/common/Modal';
import ProgressRing from '@/components/progress/ProgressRing';
import AchievementGrid from '@/components/achievement/AchievementGrid';
import { useAuthStore } from '@/stores/useAuthStore';
import { achievements as allAchievements } from '@/assets/data/achievements';
import { formatStreak, formatDate, formatDuration } from '@/utils/formatters';
import { LANGUAGES } from '@/utils/constants';

const RECOMMENDATIONS = [
  {
    id: 'rec-1',
    title: '英语商务写作进阶',
    description: '掌握邮件、报告、提案等职场英语写作技巧',
    language: 'en',
    level: 'intermediate',
    lessons: 12,
    duration: 360,
    reason: '基于你的学习记录，推荐继续提升商务英语能力',
    progress: 35,
  },
  {
    id: 'rec-2',
    title: '日语N2语法精讲',
    description: '系统讲解N2核心语法点，配合真题练习',
    language: 'ja',
    level: 'advanced',
    lessons: 18,
    duration: 480,
    reason: '你已完成N3课程，是时候挑战更高难度了',
    progress: 0,
  },
  {
    id: 'rec-3',
    title: '韩语TOPIK II 写作专项',
    description: '从模板到实战，全面突破TOPIK写作难关',
    language: 'ko',
    level: 'advanced',
    lessons: 10,
    duration: 300,
    reason: '你的阅读和听力已达标，写作需要重点加强',
    progress: 12,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 250, damping: 22 } },
};

function getLanguageColor(code: string): string {
  const lang = LANGUAGES.find((l) => l.code === code);
  return lang?.primaryColor || '#3B82F6';
}

function getLanguageFlag(code: string): string {
  const lang = LANGUAGES.find((l) => l.code === code);
  return lang?.flag || '';
}

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  const updateProfile = useAuthStore((s) => s.updateProfile);
  const [showEditModal, setShowEditModal] = useState(false);
  const [nickname, setNickname] = useState(user?.nickname || '');
  const [bio, setBio] = useState('热爱语言学习，正在同时攻克英日韩三门语言 🌍');

  const mockUser = user || {
    id: 'demo-user',
    nickname: '语言花园园丁',
    avatar: '',
    targetLanguage: 'en',
    currentLevel: 'intermediate',
    joinDate: '2026-03-15T00:00:00Z',
    studyStreak: 12,
    totalStudyMinutes: 1280,
  };

  const handleSaveProfile = () => {
    updateProfile({ nickname });
    setShowEditModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50/40 via-white to-orange-50/30 px-4 py-8 md:px-8">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={sectionVariants}>
          <Card padding="lg" className="mb-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10" />

            <div className="relative pt-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
                <Avatar src={mockUser.avatar} size="xl" name={mockUser.nickname} />

                <div className="flex-1 min-w-0">
                  <h1 className="text-xl font-bold text-slate-800">{mockUser.nickname}</h1>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <Badge
                      text={`${getLanguageFlag(mockUser.targetLanguage)} ${LANGUAGES.find(l => l.code === mockUser.targetLanguage)?.name || ''}`}
                      variant="info"
                      size="md"
                    />
                    <Badge text={`LV.${mockUser.studyStreak + 10}`} variant="success" size="md" />
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> 加入于 {formatDate(mockUser.joinDate)}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {formatStreak(mockUser.studyStreak)}
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  icon={<Edit3 className="w-4 h-4" />}
                  onClick={() => {
                    setNickname(mockUser.nickname);
                    setShowEditModal(true);
                  }}
                >
                  编辑资料
                </Button>
              </div>

              <p className="mt-4 text-sm text-slate-600 leading-relaxed max-w-2xl">
                {bio}
              </p>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={sectionVariants} className="mb-6">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {[
              { icon: <BookOpen className="w-5 h-5" />, label: '我的课程', count: 3 },
              { icon: <BookmarkCheck className="w-5 h-5" />, label: '错题本', count: 28 },
              { icon: <Star className="w-5 h-5" />, label: '收藏夹', count: 56 },
            ].map((item) => (
              <button
                key={item.label}
                className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200 whitespace-nowrap group"
              >
                <span className="text-blue-500 group-hover:text-blue-600 transition-colors">{item.icon}</span>
                <div className="text-left">
                  <p className="text-sm font-medium text-slate-700">{item.label}</p>
                  <p className="text-xs text-slate-400">{item.count}项</p>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div variants={sectionVariants}>
            <Card padding="md">
              <h3 className="text-sm font-semibold text-slate-700 mb-4">学习概览</h3>
              <div className="flex justify-center mb-5">
                <ProgressRing progress={68} size={140} strokeWidth={10} color="#8B5CF6" label="总进度" />
              </div>
              <div className="space-y-3">
                {[
                  { label: '累计学习时长', value: formatDuration(mockUser.totalStudyMinutes), color: '#3B82F6' },
                  { label: '连续学习天数', value: `${mockUser.studyStreak}天`, color: '#F59E0B' },
                  { label: '本周目标', value: '5/7 天', color: '#10B981' },
                  { label: '掌握单词数', value: '1,247', color: '#8B5CF6' },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between py-1.5">
                    <span className="text-sm text-slate-500">{stat.label}</span>
                    <span className="text-sm font-semibold" style={{ color: stat.color }}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div variants={sectionVariants} className="lg:col-span-2">
            <AchievementGrid achievements={allAchievements} />
          </motion.div>
        </div>

        <motion.div variants={sectionVariants} className="mt-6">
          <Card padding="md">
            <div className="flex items-center gap-2 mb-4">
              <ArrowRight className="w-5 h-5 text-blue-500" />
              <h3 className="text-sm font-semibold text-slate-700">学习路径推荐</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {RECOMMENDATIONS.map((rec) => (
                <div
                  key={rec.id}
                  className="rounded-xl border border-slate-100 p-4 hover:border-blue-200 hover:shadow-md transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-lg">{getLanguageFlag(rec.language)}</span>
                      <h4 className="font-semibold text-sm text-slate-800 mt-1 group-hover:text-blue-600 transition-colors">
                        {rec.title}
                      </h4>
                    </div>
                    <Badge
                      text={`${Math.round(rec.progress)}%`}
                      variant={rec.progress > 30 ? 'success' : 'default'}
                      size="sm"
                    />
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">{rec.description}</p>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-3">
                    <span>{rec.lessons}课时</span>
                    <span>·</span>
                    <span>{formatDuration(rec.duration)}</span>
                  </div>
                  <div className="pt-3 border-t border-slate-50">
                    <p className="text-[11px] text-blue-500 leading-relaxed flex items-start gap-1">
                      <PenLine className="w-3 h-3 flex-shrink-0 mt-0.5" />
                      {rec.reason}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </motion.div>

      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="编辑个人资料" size="md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">昵称</label>
            <input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
              placeholder="输入你的昵称"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">个人简介</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none placeholder:text-slate-400"
              placeholder="介绍一下自己吧..."
            />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="ghost" onClick={() => setShowEditModal(false)}>
              取消
            </Button>
            <Button onClick={handleSaveProfile}>保存</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
