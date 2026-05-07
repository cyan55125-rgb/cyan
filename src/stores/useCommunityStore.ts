import { create } from 'zustand';
import type { Post, LanguageCode, Comment, Author } from '@/types';

interface CommunityState {
  posts: Post[];
  selectedTopic: string;
  likePost: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  createPost: (content: string, langTag: LanguageCode, currentAuthor: Author) => void;
  setTopic: (topic: string) => void;
}

const MOCK_AUTHOR: Author = {
  id: 'mock_user',
  name: '学习者',
  avatar: '',
  level: 'intermediate',
};

export const useCommunityStore = create<CommunityState>((set, get) => ({
  posts: [
    {
      id: 'post_1',
      author: MOCK_AUTHOR,
      content: '今天完成了英语初级课程的第一章，感觉收获很大！分享给大家我的学习心得...',
      languageTag: 'en',
      likes: 12,
      comments: 1,
      commentList: [
        {
          id: 'comment_1',
          author: { id: 'mock_2', name: '语言爱好者', avatar: '', level: 'intermediate' },
          content: '太棒了！我也在学习英语，一起加油！',
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          likes: 3,
        },
      ],
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      isLiked: false,
    },
    {
      id: 'post_2',
      author: { id: 'mock_3', name: '日语初学者', avatar: '', level: 'beginner' },
      content: '日语的敬语系统真的好难啊，有什么好的学习方法吗？',
      languageTag: 'ja',
      likes: 8,
      comments: 0,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      isLiked: false,
    },
  ],
  selectedTopic: 'all',

  likePost: (postId: string) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post
      ),
    }));
  },

  addComment: (postId: string, content: string) => {
    const newComment: Comment = {
      id: `comment_${Date.now()}`,
      author: MOCK_AUTHOR,
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
    };
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments + 1,
              commentList: [...(post.commentList || []), newComment],
            }
          : post
      ),
    }));
  },

  createPost: (content: string, langTag: LanguageCode, currentAuthor: Author) => {
    const newPost: Post = {
      id: `post_${Date.now()}`,
      author: currentAuthor,
      content,
      languageTag: langTag,
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
      isLiked: false,
    };
    set((state) => ({ posts: [newPost, ...state.posts] }));
  },

  setTopic: (topic: string) => set({ selectedTopic: topic }),
}));
