import { motion } from 'framer-motion';
import { Hash, Users, Megaphone, TrendingUp } from 'lucide-react';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';
import Avatar from '@/components/common/Avatar';
import PostFeed from '@/components/community/PostFeed';
import { posts as allPosts } from '@/assets/data/community';

const HOT_TOPICS = [
  { tag: '英语学习', count: 234, color: '#3B82F6' },
  { tag: '日语N2', count: 156, color: '#EF4444' },
  { tag: 'TOPIK备考', count: 128, color: '#10B981' },
  { tag: '经验分享', count: 98, color: '#F59E0B' },
  { tag: '口语练习', count: 87, color: '#8B5CF6' },
  { tag: '资源推荐', count: 76, color: '#EC4899' },
  { tag: '听力训练', count: 65, color: '#06B6D4' },
  { tag: '留学申请', count: 54, color: '#84CC16' },
];

const ACTIVE_USERS = [
  { name: '英语小达人Lucy', avatar: '', level: 'LV.25', posts: 42, color: '#3B82F6' },
  { name: '韩语TOPIK冲刺选手', avatar: '', level: 'LV.22', posts: 38, color: '#10B981' },
  { name: '留学准备中', avatar: '', level: 'LV.20', posts: 35, color: '#EF4444' },
  { name: '多语言探索者', avatar: '', level: 'LV.19', posts: 31, color: '#8B5CF6' },
  { name: '英语老师Amy', avatar: '', level: 'LV.25', posts: 28, color: '#EC4899' },
];

const ANNOUNCEMENTS = [
  {
    title: '社区公约更新',
    content: '请阅读最新的社区发帖规范，共同维护良好的交流环境',
    time: '3天前',
    isHot: true,
  },
  {
    title: '五月学习挑战赛',
    content: '参与连续30天打卡挑战，赢取限定成就徽章和积分奖励！',
    time: '5天前',
    isHot: true,
  },
  {
    title: '新功能上线：语音评论',
    content: '现在可以在评论区发送语音消息啦，快来试试看',
    time: '1周前',
    isHot: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 250, damping: 22 } },
};

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/40 via-white to-purple-50/30 px-4 py-8 md:px-8">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={sectionVariants} className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800" style={{ fontFamily: "'Outfit', 'Noto Sans SC', sans-serif" }}>
            社区广场
          </h1>
          <p className="text-slate-500 mt-1 text-sm">与全球语言学习者一起分享、交流、成长</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div variants={sectionVariants} className="lg:col-span-2">
            <PostFeed posts={allPosts} />
          </motion.div>

          <aside className="space-y-5">
            <motion.div variants={sectionVariants}>
              <Card padding="md">
                <div className="flex items-center gap-2 mb-3">
                  <Hash className="w-4 h-4 text-blue-500" />
                  <h3 className="text-sm font-semibold text-slate-700">热门话题</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {HOT_TOPICS.map((topic) => (
                    <button
                      key={topic.tag}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-slate-50 text-slate-600 hover:text-white transition-all duration-200 hover:shadow-sm"
                      style={{
                        '--hover-bg': topic.color,
                      } as React.CSSProperties}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = topic.color;
                        (e.currentTarget as HTMLElement).style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = '';
                        (e.currentTarget as HTMLElement).style.color = '';
                      }}
                    >
                      #{topic.tag}
                      <span className="text-[10px] opacity-70">{topic.count}</span>
                    </button>
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div variants={sectionVariants}>
              <Card padding="md">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-4 h-4 text-emerald-500" />
                  <h3 className="text-sm font-semibold text-slate-700">活跃用户</h3>
                </div>
                <div className="space-y-3">
                  {ACTIVE_USERS.map((user, idx) => (
                    <div key={user.name} className="flex items-center gap-3 group">
                      <span className="text-xs font-bold text-slate-300 w-4">{idx + 1}</span>
                      <Avatar src={user.avatar} size="sm" name={user.name} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-700 truncate group-hover:text-blue-600 transition-colors">
                          {user.name}
                        </p>
                        <p className="text-[11px] text-slate-400">{user.level} · {user.posts}篇帖子</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div variants={sectionVariants}>
              <Card padding="md">
                <div className="flex items-center gap-2 mb-3">
                  <Megaphone className="w-4 h-4 text-amber-500" />
                  <h3 className="text-sm font-semibold text-slate-700">社区公告</h3>
                </div>
                <div className="space-y-3">
                  {ANNOUNCEMENTS.map((ann) => (
                    <div key={ann.title} className="group cursor-pointer">
                      <div className="flex items-start gap-2">
                        {ann.isHot && (
                          <Badge text="HOT" variant="danger" size="sm" className="mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors line-clamp-1">
                            {ann.title}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{ann.content}</p>
                          <p className="text-[11px] text-slate-300 mt-1">{ann.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </aside>
        </div>
      </motion.div>
    </div>
  );
}
