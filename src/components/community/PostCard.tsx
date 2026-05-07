import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Bookmark } from 'lucide-react';
import Avatar from '@/components/common/Avatar';
import Badge from '@/components/common/Badge';
import Card from '@/components/common/Card';
import type { Post } from '@/types/learn';
import { formatDate } from '@/utils/formatters';

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
}

export default function PostCard({ post, onLike, onComment }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [expanded, setExpanded] = useState(false);
  const [heartAnimating, setHeartAnimating] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikeCount((c) => c - 1);
    } else {
      setLikeCount((c) => c + 1);
      setHeartAnimating(true);
      setTimeout(() => setHeartAnimating(false), 400);
    }
    setLiked(!liked);
    onLike?.(post.id);
  };

  const content = post.content || '';
  const needsTruncation = content.length > 150;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      <Card padding="md" hover className="group">
        <div className="flex items-start gap-3 mb-3">
          <Avatar src={post.author.avatar} size="md" name={post.author.name} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-sm text-slate-800">{post.author.name}</span>
              {post.author.level && (
                <Badge text={post.author.level} variant="info" size="sm" />
              )}
            </div>
            <span className="text-xs text-slate-400">{formatDate(post.createdAt)}</span>
          </div>
        </div>

        {(post.title) && (
          <h3 className="font-bold text-base text-slate-800 mb-2 leading-snug">{post.title}</h3>
        )}

        <p className={`text-sm text-slate-600 leading-relaxed ${!expanded && needsTruncation ? 'line-clamp-3' : ''}`}>
          {content}
        </p>

        {needsTruncation && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium mt-1.5"
          >
            {expanded ? '收起' : '展开全文'}
          </button>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-6 mt-4 pt-3 border-t border-slate-100">
          <button
            onClick={handleLike}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-500 transition-colors group/like relative"
          >
            <span className="relative inline-flex">
              <AnimatePresence>
                {heartAnimating && (
                  <motion.span
                    initial={{ scale: 1 }}
                    animate={{ scale: 2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Heart className="w-[18px] h-[18px] fill-red-400 text-red-400" />
                  </motion.span>
                )}
              </AnimatePresence>
              <Heart
                className={`w-[18px] h-[18px] transition-all duration-200 ${
                  liked ? 'fill-red-500 text-red-500 scale-110' : 'group-hover/like:scale-110'
                }`}
              />
            </span>
            <span className={liked ? 'text-red-500 font-medium' : ''}>{likeCount}</span>
          </button>

          <button
            onClick={() => onComment?.(post.id)}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-500 transition-colors"
          >
            <MessageCircle className="w-[18px] h-[18px]" />
            <span>{post.comments}</span>
          </button>

          <button className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-500 transition-colors ml-auto">
            <Bookmark className="w-[18px] h-[18px]" />
          </button>
        </div>
      </Card>
    </motion.div>
  );
}
