import { create } from 'zustand';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, nickname: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<Pick<User, 'nickname' | 'avatar' | 'targetLanguage' | 'currentLevel'>>) => void;
}

function loadUserFromStorage(): User | null {
  try {
    const stored = localStorage.getItem('linguaflow_user');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function saveUserToStorage(user: User | null): void {
  if (user) {
    localStorage.setItem('linguaflow_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('linguaflow_user');
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  user: loadUserFromStorage(),
  isAuthenticated: !!loadUserFromStorage(),
  isLoading: false,

  login: async (email: string, _password: string) => {
    set({ isLoading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const mockUser: User = {
        id: `user_${Date.now()}`,
        email,
        nickname: email.split('@')[0],
        avatar: '',
        targetLanguage: 'en',
        currentLevel: 'beginner',
        joinDate: new Date().toISOString(),
        studyStreak: 0,
        totalStudyMinutes: 0,
      };
      saveUserToStorage(mockUser);
      set({ user: mockUser, isAuthenticated: true, isLoading: false });
    } catch {
      set({ isLoading: false });
      throw new Error('登录失败，请重试');
    }
  },

  register: async (email: string, _password: string, nickname: string) => {
    set({ isLoading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        nickname,
        avatar: '',
        targetLanguage: 'en',
        currentLevel: 'beginner',
        joinDate: new Date().toISOString(),
        studyStreak: 0,
        totalStudyMinutes: 0,
      };
      saveUserToStorage(newUser);
      set({ user: newUser, isAuthenticated: true, isLoading: false });
    } catch {
      set({ isLoading: false });
      throw new Error('注册失败，请重试');
    }
  },

  logout: () => {
    saveUserToStorage(null);
    set({ user: null, isAuthenticated: false });
  },

  updateProfile: (data) => {
    set((state) => {
      if (!state.user) return state;
      const updatedUser = { ...state.user, ...data };
      saveUserToStorage(updatedUser);
      return { user: updatedUser };
    });
  },
}));
