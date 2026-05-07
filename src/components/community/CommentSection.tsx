import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Heart, ChevronDown, ChevronUp } from 'lucide-react';
import Avatar from '@/components/common/Avatar';
import type { Comment } from '@/types/community';
import { formatDate } from '@/utils/formatters';

interface CommentSectionProps {
  comments: Comment[];
  onAddComment?: (content: string) => void;
  collapsed?: boolean;
}

function CommentItem({ comment }: { comment: Comment }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="flex gap-3 py-3 last:pb-0"
    >
      <Avatar src={comment.author.avatar} size="sm" name={comment.author.name} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-700">{comment.author.name}</span>
          <span className="text-[11px] text-slate-400">{formatDate(comment.createdAt)}</span>
        </div>
        <p className="text-sm text-slate-600 mt-0.5 leading-relaxed">{comment.content}</p>
        <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-400 mt-1.5 transition-colors">
          <Heart className="w-3 h-3" />
          <span>{comment.likes}</span>
        </button>
      </div>
    </motion.div>
  );
}

export default function CommentSection({
  comments,
  onAddComment,
  collapsed: externalCollapsed,
}: CommentSectionProps) {
  const [inputValue, setInputValue] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(externalCollapsed ?? false);

  const visibleComments = isCollapsed ? comments.slice(0, 3) : comments;
  const hasMany = comments.length > 3;

  const handleSubmit = () => {
    if (!inputValue.trim()) return;
    onAddComment?.(inputValue.trim());
    setInputValue('');
  };

  return (
    <div className="border-t border-slate-100 pt-4 mt-4">
      <div className="flex items-center gap-2 mb-3">
        <Avatar size="sm" name="我" />
        <div className="flex-1 flex gap-2">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="写下你的想法..."
            className="flex-1 px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-blue-300 focus:bg-white transition-colors placeholder:text-slate-400"
          />
          <button
            onClick={handleSubmit}
            disabled={!inputValue.trim()}
            className="w-9 h-9 rounded-xl bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all self-end"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {comments.length > 0 && (
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={isCollapsed ? 'collapsed' : 'expanded'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {visibleComments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </motion.div>
          </AnimatePresence>

          {hasMany && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium mt-2 transition-colors"
            >
              {isCollapsed ? (
                <>
                  展开全部 {comments.length} 条评论 <ChevronDown className="w-3 h-3" />
                </>
              ) : (
                <>
                  收起评论 <ChevronUp className="w-3 h-3" />
                </>
              )}
            </button>
          )}
        </div>
      )}

      {comments.length === 0 && (
        <p className="text-center text-sm text-slate-400 py-4">暂无评论，来发表第一条吧~</p>
      )}
    </div>
  );
}
