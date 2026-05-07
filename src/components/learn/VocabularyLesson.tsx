import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, RotateCcw, Trophy, Clock, Target } from 'lucide-react';
import type { Language } from '@/types/index';
import type { VocabularyWord } from '@/types/vocabulary';
import vocabulary from '@/assets/data/vocabulary';
import { LANGUAGE_THEMES } from '@/utils/constants';
import FlashCard from './FlashCard';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import ProgressBar from '@/components/common/ProgressBar';

type LessonMode = 'learn' | 'review';

const DIFFICULTY_ORDER: Record<string, number> = {
  beginner: 1,
  elementary: 2,
  intermediate: 3,
  'upper-intermediate': 4,
  advanced: 5,
};

interface VocabularyLessonProps {
  lang: Language;
  onBack: () => void;
}

export default function VocabularyLesson({ lang, onBack }: VocabularyLessonProps) {
  const [mode, setMode] = useState<LessonMode>('learn');
  const [sessionStarted, setSessionStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [knownCount, setKnownCount] = useState(0);
  const [unknownCount, setUnknownCount] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [speakText, setSpeakText] = useState('');

  const theme = LANGUAGE_THEMES[lang as keyof typeof LANGUAGE_THEMES] || LANGUAGE_THEMES.en;

  const allWords = useMemo(
    () => vocabulary.filter((w) => w.language === lang),
    [lang]
  );

  const reviewWords = useMemo(
    () =>
      [...allWords]
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.min(15, allWords.length)),
    [allWords]
  );

  const learnQueue = useMemo(() => {
    const sorted = [...allWords].sort(
      (a, b) => (DIFFICULTY_ORDER[a.difficulty] || 3) - (DIFFICULTY_ORDER[b.difficulty] || 3)
    );
    return sorted.slice(0, Math.min(20, sorted.length));
  }, [allWords]);

  const activeQueue = mode === 'learn' ? learnQueue : reviewWords;

  const handleSpeak = useCallback((text: string) => {
    setSpeakText(text);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'ja' ? 'ja-JP' : lang === 'ko' ? 'ko-KR' : 'en-US';
    utterance.rate = 0.85;
    speechSynthesis.speak(utterance);
  }, [lang]);

  const handleKnown = useCallback(() => {
    setKnownCount((c) => c + 1);
    if (currentIndex < activeQueue.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setSessionComplete(true);
    }
  }, [currentIndex, activeQueue.length]);

  const handleUnknown = useCallback(() => {
    setUnknownCount((c) => c + 1);
    if (currentIndex < activeQueue.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setSessionComplete(true);
    }
  }, [currentIndex, activeQueue.length]);

  const handleSkip = useCallback(() => {
    if (currentIndex < activeQueue.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setSessionComplete(true);
    }
  }, [currentIndex, activeQueue.length]);

  const handleStartSession = useCallback((m: LessonMode) => {
    setMode(m);
    setCurrentIndex(0);
    setKnownCount(0);
    setUnknownCount(0);
    setSessionComplete(false);
    setSessionStarted(true);
  }, []);

  const handleReset = useCallback(() => {
    setSessionStarted(false);
    setSessionComplete(false);
    setCurrentIndex(0);
    setKnownCount(0);
    setUnknownCount(0);
  }, []);

  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  if (!sessionStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" /> 返回
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1
              className="font-[family-name:var(--font-outfit)] text-3xl font-bold mb-2"
              style={{ color: theme.primary }}
            >
              单词记忆
            </h1>
            <p className="text-slate-500">选择学习模式，开始今日单词之旅</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <motion.button
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleStartSession('learn')}
              className="group rounded-2xl border border-slate-100 bg-white p-6 text-left shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${theme.primary}15` }}
                >
                  <BookOpen className="w-6 h-6" style={{ color: theme.primary }} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">学习新词</h3>
                  <span className="text-xs text-slate-400">{learnQueue.length} 个单词</span>
                </div>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                按难度从易到难学习新单词，循序渐进掌握词汇
              </p>
            </motion.button>

            <motion.button
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleStartSession('review')}
              className="group rounded-2xl border border-slate-100 bg-white p-6 text-left shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${theme.primary}15` }}
                >
                  <RotateCcw className="w-6 h-6" style={{ color: theme.primary }} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">复习旧词</h3>
                  <span className="text-xs text-slate-400">{reviewWords.length} 个单词</span>
                </div>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                随机抽取已学单词进行复习，巩固记忆效果
              </p>
            </motion.button>
          </div>

          <Card>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-slate-800">{allWords.length}</div>
                <div className="text-xs text-slate-400 mt-1">总词数</div>
              </div>
              <div>
                <div className="text-2xl font-bold" style={{ color: theme.primary }}>
                  {mode === 'learn' ? learnQueue.length : reviewWords.length}
                </div>
                <div className="text-xs text-slate-400 mt-1">本轮待学</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-500">0</div>
                <div className="text-xs text-slate-400 mt-1">今日已学</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (sessionComplete) {
    const accuracy = knownCount + unknownCount > 0 ? Math.round((knownCount / (knownCount + unknownCount)) * 100) : 0;
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-4 md:p-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-6"
        >
          <div
            className="w-20 h-20 rounded-full mx-auto flex items-center justify-center"
            style={{ background: theme.gradient }}
          >
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-slate-800">
              本轮完成！
            </h2>
            <p className="text-slate-500 mt-1">{mode === 'learn' ? '学习模式' : '复习模式'}结果</p>
          </div>

          <Card>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">正确率</span>
                <span className="text-lg font-bold" style={{ color: theme.primary }}>
                  {accuracy}%
                </span>
              </div>
              <ProgressBar value={accuracy} color={theme.primary} size="lg" />
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center p-3 rounded-xl bg-emerald-50">
                  <div className="text-xl font-bold text-emerald-600">{knownCount}</div>
                  <div className="text-xs text-emerald-600/70">认识</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-red-50">
                  <div className="text-xl font-bold text-red-400">{unknownCount}</div>
                  <div className="text-xs text-red-400/70">不认识</div>
                </div>
              </div>
            </div>
          </Card>

          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={handleReset}>
              返回选择
            </Button>
            <Button
              onClick={() => handleStartSession(mode)}
              icon={<RotateCcw className="w-4 h-4" />}
            >
              再来一轮
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentWord = activeQueue[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-4 md:p-8">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> 返回
          </button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-sm">
              <Target className="w-4 h-4 text-emerald-500" />
              <span className="font-medium text-emerald-600">{knownCount}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="text-slate-500">
                {mode === 'learn' ? '学习中' : '复习中'}
              </span>
            </div>
          </div>
        </div>

        <ProgressBar
          value={((currentIndex + 1) / activeQueue.length) * 100}
          color={theme.primary}
          size="sm"
          className="mb-8"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            {currentWord && (
              <FlashCard
                word={currentWord}
                currentIndex={currentIndex}
                total={activeQueue.length}
                themeColor={theme.primary}
                onKnown={handleKnown}
                onUnknown={handleUnknown}
                onSkip={handleSkip}
                onSpeak={handleSpeak}
                isSpeaking={false}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
