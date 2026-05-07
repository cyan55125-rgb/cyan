import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Check, X, SkipForward, RotateCcw } from 'lucide-react';
import type { VocabularyWord } from '@/types/vocabulary';
import { cn } from '@/lib/utils';
import Badge from '@/components/common/Badge';

interface FlashCardProps {
  word: VocabularyWord;
  currentIndex: number;
  total: number;
  themeColor: string;
  onKnown: () => void;
  onUnknown: () => void;
  onSkip: () => void;
  onSpeak: (text: string) => void;
  isSpeaking: boolean;
}

const POS_LABELS: Record<string, string> = {
  noun: '名词',
  verb: '动词',
  adjective: '形容词',
  adverb: '副词',
  pronoun: '代词',
  preposition: '介词',
  conjunction: '连词',
  interjection: '感叹词',
  phrase: '短语',
};

export default function FlashCard({
  word,
  currentIndex,
  total,
  themeColor,
  onKnown,
  onUnknown,
  onSkip,
  onSpeak,
  isSpeaking,
}: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = useCallback(() => setIsFlipped((prev) => !prev), []);
  const handleSpeak = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onSpeak(word.word);
    },
    [onSpeak, word.word]
  );
  const handleKnown = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onKnown();
      setIsFlipped(false);
    },
    [onKnown]
  );
  const handleUnknown = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onUnknown();
      setIsFlipped(false);
    },
    [onUnknown]
  );
  const handleSkip = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onSkip();
      setIsFlipped(false);
    },
    [onSkip]
  );

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto">
      <div className="text-sm font-medium text-slate-400">
        {currentIndex + 1} / {total}
      </div>

      <div
        className="relative w-full aspect-[3/4] max-h-[420px] cursor-pointer perspective-1000"
        onClick={handleFlip}
        style={{ perspective: '1000px' }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {!isFlipped ? (
            <motion.div
              key="front"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 0 }}
              exit={{ rotateY: -180 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full"
              style={{ backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}
            >
              <div
                className={cn(
                  'w-full h-full rounded-3xl shadow-lg border p-8 flex flex-col items-center justify-center gap-5',
                  'bg-white border-slate-100/80'
                )}
              >
                <div className="flex flex-col items-center gap-3">
                  <span
                    className="font-[family-name:var(--font-outfit)] text-4xl md:text-5xl font-bold tracking-tight"
                    style={{ color: themeColor }}
                  >
                    {word.word}
                  </span>
                  <span className="text-lg text-slate-400 font-medium">
                    {word.phonetic}
                  </span>
                </div>
                <Badge
                  text={POS_LABELS[word.partOfSpeech] || word.partOfSpeech}
                  variant="info"
                  size="md"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(true);
                  }}
                  className="mt-4 px-6 py-2 rounded-[24px] text-sm font-medium text-slate-500 bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  查看释义 ↻
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ rotateY: 180 }}
              animate={{ rotateY: 0 }}
              exit={{ rotateY: 180 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full"
              style={{
                backfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d',
                transform: 'rotateY(180deg)',
              }}
            >
              <div
                className={cn(
                  'w-full h-full rounded-3xl shadow-lg border p-8 flex flex-col justify-center gap-5',
                  'bg-white border-slate-100/80'
                )}
              >
                <div className="flex flex-col gap-4">
                  <div
                    className="font-[family-name:var(--font-outfit)] text-2xl md:text-3xl font-bold text-center leading-relaxed"
                    style={{ color: themeColor }}
                  >
                    {word.meaning}
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                  <div className="space-y-3">
                    <p className="text-base text-slate-700 italic leading-relaxed">
                      {word.exampleSentence}
                    </p>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {word.exampleTranslation}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(false);
                  }}
                  className="mt-2 px-6 py-2 rounded-[24px] text-sm font-medium text-slate-500 bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  返回单词 ↻
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-3 w-full px-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSpeak}
          disabled={isSpeaking}
          className={cn(
            'flex items-center justify-center w-12 h-12 rounded-full transition-colors',
            isSpeaking
              ? 'bg-blue-50 text-blue-500'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          )}
        >
          <Volume2 className={cn('w-5 h-5', isSpeaking && 'animate-pulse')} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleKnown}
          className={cn(
            'flex items-center gap-2 px-6 py-3 rounded-[24px] font-medium text-white transition-all shadow-md',
            'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200'
          )}
        >
          <Check className="w-4 h-4" /> 认识
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUnknown}
          className={cn(
            'flex items-center gap-2 px-6 py-3 rounded-[24px] font-medium text-white transition-all shadow-md',
            'bg-red-400 hover:bg-red-500 shadow-red-200'
          )}
        >
          <X className="w-4 h-4" /> 不认识
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSkip}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
        >
          <SkipForward className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}
