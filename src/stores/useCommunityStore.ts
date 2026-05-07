import { create } from 'zustand';
import type { Post, LanguageCode, Comment, User } from '@/types';

interface CommunityState {
  posts: Post[];
  selectedTopic: string;
  likePost: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  createPost: (content: string, langTag: LanguageCode, currentUser: User) => void;
  setTopic: (topic: string) => void;
}

const MOCK_USER: User = {
  id: 'mock_user',
  email: 'mock@example.com',
  nickname: '学习者',
  avatar: '',
  targetLanguage: 'en',
  currentLevel: 'intermediate',
  joinDate: new Date().toISOString(),
  studyStreak: 5,
  totalStudyMinutes: 120,
};

export const useCommunityStore = create<CommunityState>((set, get) => ({
  posts: [
    {
      id: 'post_1',
      author: MOCK_USER,
      content: '今天完成了英语初级课程的第一章，感觉收获很大！分享给大家我的学习心得...',
      languageTag: 'en',
      likes: 12,
      comments: [
        {
          id: 'comment_1',
          author: { ...MOCK_USER, nickname: '语言爱好者', id: 'mock_2' },
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
      author: { ...MOCK_USER, nickname: '日语初学者', id: 'mock_3' },
      content: '日语的敬语系统真的好难啊，有什么好的学习方法吗？',
      languageTag: 'ja',
      likes: 8,
      comments: [],
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
      author: MOCK_USER,
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
    };
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      ),
    }));
  },

  createPost: (content: string, langTag: LanguageCode, currentUser: User) => {
    const newPost: Post = {
      id: `post_${Date.now()}`,
      author: currentUser,
      content,
      languageTag: langTag,
      likes: 0,
      comments: [],
      createdAt: new Date().toISOString(),
      isLiked: false,
    };
    set((state) => ({ posts: [newPost, ...state.posts] }));
  },

  setTopic: (topic: string) => set({ selectedTopic: topic }),
}));
