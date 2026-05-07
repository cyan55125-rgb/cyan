import { create } from 'zustand';
import type { VocabularyItem, LanguageCode } from '@/types';

interface LearnState {
  currentVocabIndex: number;
  vocabQueue: VocabularyItem[];
  learnedToday: number;
  sessionStartTime: number | null;
  initVocabSession: (lang: LanguageCode, vocabList: VocabularyItem[]) => void;
  markAsKnown: (id: string) => void;
  markAsUnknown: (id: string) => void;
  nextCard: () => void;
  resetSession: () => void;
}

export const useLearnStore = create<LearnState>((set, get) => ({
  currentVocabIndex: 0,
  vocabQueue: [],
  learnedToday: 0,
  sessionStartTime: null,

  initVocabSession: (_lang: LanguageCode, vocabList: VocabularyItem[]) => {
    set({
      vocabQueue: vocabList,
      currentVocabIndex: 0,
      learnedToday: 0,
      sessionStartTime: Date.now(),
    });
  },

  markAsKnown: (_id: string) => {
    const { learnedToday, currentVocabIndex, vocabQueue } = get();
    if (currentVocabIndex < vocabQueue.length) {
      set({
        learnedToday: learnedToday + 1,
        currentVocabIndex: currentVocabIndex + 1,
      });
    }
  },

  markAsUnknown: (_id: string) => {
    const { currentVocabIndex, vocabQueue } = get();
    if (currentVocabIndex < vocabQueue.length) {
      set({
        currentVocabIndex: currentVocabIndex + 1,
      });
    }
  },

  nextCard: () => {
    const { currentVocabIndex, vocabQueue } = get();
    if (currentVocabIndex < vocabQueue.length - 1) {
      set({ currentVocabIndex: currentVocabIndex + 1 });
    }
  },

  resetSession: () => {
    set({
      currentVocabIndex: 0,
      vocabQueue: [],
      learnedToday: 0,
      sessionStartTime: null,
    });
  },
}));
