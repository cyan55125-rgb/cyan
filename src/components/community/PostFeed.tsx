import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Filter } from 'lucide-react';
import Button from '@/components/common/Button';
import PostCard from './PostCard';
import type { Post } from '@/types/community';

interface PostFeedProps {
  posts: Post[];
}

type SortTab = 'latest' | 'hot' | 'following';

const TABS: { key: SortTab; label: string }[] = [
  { key: 'latest', label: '最新' },
  { key: 'hot', label: '最热' },
  { key: 'following', label: '关注' },
];

function sortPosts(posts: Post[], tab: SortTab): Post[] {
  const sorted = [...posts];
  switch (tab) {
    case 'hot':
      return sorted.sort((a, b) => b.likes - a.likes);
    case 'following':
      return sorted.filter((_, i) => i % 2 === 0);
    default:
      return sorted.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export default function PostFeed({ posts }: PostFeedProps) {
  const [activeTab, setActiveTab] = useState<SortTab>('latest');
  const [visibleCount, setVisibleCount] = useState(5);

  const sortedPosts = sortPosts(posts, activeTab);
  const displayPosts = sortedPosts.slice(0, visibleCount);
  const hasMore = visibleCount < sortedPosts.length;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1 bg-slate-100 rounded-full p-1">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-1.5 text-sm font-medium rounded-[20px] transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <Button variant="outline" size="sm" icon={<Plus className="w-4 h-4" />}>
          发布动态
        </Button>
      </div>

      <motion.div
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={activeTab}
      >
        {displayPosts.length > 0 ? (
          displayPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
            />
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Filter className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">暂无动态</p>
            <p className="text-slate-400 text-xs mt-1">切换其他分类试试吧</p>
          </motion.div>
        )}
      </motion.div>

      {hasMore && (
        <div className="text-center mt-6">
          <Button
            variant="ghost"
            onClick={() => setVisibleCount((c) => c + 5)}
          >
            加载更多
          </Button>
        </div>
      )}
    </div>
  );
}
