import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, CheckCircle2, XCircle, ArrowRight, Lightbulb } from 'lucide-react';
import type { GrammarPoint } from '@/types/grammar';
import { cn } from '@/lib/utils';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import ProgressBar from '@/components/common/ProgressBar';

interface GrammarQuizProps {
  grammarPoint: GrammarPoint;
  themeColor: string;
  onComplete: (score: number) => void;
}

export default function GrammarQuiz({ grammarPoint, themeColor, onComplete }: GrammarQuizProps) {
  const [introOpen, setIntroOpen] = useState(true);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [scores, setScores] = useState<boolean[]>([]);

  const exercises = grammarPoint.exercises;
  const exercise = exercises[currentExercise];
  if (!exercise) return null;

  const isFillBlank = exercise.type === 'fill-blank';
  const isMultipleChoice = exercise.type === 'multiple-choice';
  const isOrdering = exercise.type === 'ordering';

  const checkAnswer = useCallback(() => {
    let correct = false;
    if (isMultipleChoice && userAnswer === exercise.answer) correct = true;
    else if (isFillBlank) {
      const expected = Array.isArray(exercise.answer) ? exercise.answer : [exercise.answer];
      correct = expected.some((a) => userAnswer.trim().toLowerCase() === a.toLowerCase());
    } else if (isOrdering) {
      const expected = Array.isArray(exercise.answer) ? exercise.answer : exercise.answer.split(',').map((s: string) => s.trim());
      correct = selectedOrder.length === expected.length && selectedOrder.every((w, i) => w === expected[i]);
    }
    setIsCorrect(correct);
    setSubmitted(true);
    setScores((prev) => [...prev, correct]);
  }, [userAnswer, selectedOrder, exercise, isMultipleChoice, isFillBlank, isOrdering]);

  const handleNext = useCallback(() => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise((i) => i + 1);
      setUserAnswer('');
      setSelectedOrder([]);
      setSubmitted(false);
      setIsCorrect(false);
    } else {
      const finalScore = scores.length === exercises.length
        ? Math.round((scores.filter(Boolean).length / exercises.length) * 100)
        : Math.round(((scores.filter(Boolean).length + (isCorrect ? 1 : 0)) / exercises.length) * 100);
      onComplete(finalScore);
    }
  }, [currentExercise, exercises.length, scores, isCorrect, onComplete]);

  const handleOrderingClick = useCallback(
    (word: string) => {
      if (!submitted && !selectedOrder.includes(word)) {
        setSelectedOrder((prev) => [...prev, word]);
      }
    },
    [selectedOrder, submitted]
  );

  const handleRemoveFromOrder = useCallback(
    (idx: number) => {
      setSelectedOrder((prev) => prev.filter((_, i) => i !== idx));
    },
    []
  );

  const allDone = currentExercise >= exercises.length - 1 && submitted;

  return (
    <div className="space-y-5">
      <Card padding="sm">
        <button
          onClick={() => setIntroOpen(!introOpen)}
          className="w-full flex items-center justify-between py-1"
        >
          <span className="font-semibold text-slate-800 text-sm">{grammarPoint.title}</span>
          {introOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>
        <AnimatePresence initial={false}>
          {introOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="pt-3 space-y-3 border-t border-slate-100 mt-2">
                <p className="text-sm text-slate-600 leading-relaxed">{grammarPoint.explanation}</p>
                <div className="rounded-lg bg-slate-50 p-3 font-mono text-xs text-slate-700 overflow-x-auto whitespace-pre-wrap">
                  {grammarPoint.pattern}
                </div>
                <div className="space-y-1.5">
                  {grammarPoint.examples.slice(0, 3).map((ex, i) => (
                    <div key={i} className="text-xs text-slate-500 leading-relaxed">
                      <span className="text-slate-700">·</span> {ex.sentence}
                      <span className="text-slate-400 ml-1">→ {ex.translation}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      <ProgressBar value={((currentExercise + 1) / exercises.length) * 100} color={themeColor} size="sm" />
      <div className="text-center text-sm font-medium" style={{ color: themeColor }}>
        第 {currentExercise + 1} 题 / 共 {exercises.length} 题
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={currentExercise} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          <Card>
            <p className="text-base font-medium text-slate-800 mb-5 leading-relaxed">{exercise.question}</p>

            {isMultipleChoice && exercise.options && (
              <div className="grid grid-cols-1 gap-2.5">
                {exercise.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => !submitted && setUserAnswer(opt)}
                    className={cn(
                      'text-left px-4 py-3 rounded-xl text-sm border transition-all',
                      submitted
                        ? opt === exercise.answer
                          ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                          : opt === userAnswer && opt !== exercise.answer
                            ? 'border-red-300 bg-red-50 text-red-600'
                            : 'border-slate-100 bg-white text-slate-500'
                        : userAnswer === opt
                          ? 'border-[2px] shadow-sm'
                          : 'border-slate-100 hover:border-slate-200'
                    )}
                    style={
                      !submitted && userAnswer === opt
                        ? { borderColor: themeColor, backgroundColor: `${themeColor}08` }
                        : undefined
                    }
                  >
                    {String.fromCharCode(65 + i)}. {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {isFillBlank && (
              <input
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={submitted}
                placeholder="在此输入答案..."
                className={cn(
                  'w-full px-4 py-3 rounded-xl border text-base outline-none transition-all',
                  submitted
                    ? isCorrect
                      ? 'border-emerald-300 bg-emerald-50'
                      : 'border-red-300 bg-red-50'
                    : 'border-slate-200 focus:border-[2px]'
                )}
                style={!submitted ? { '--tw-ring-color': themeColor } as React.CSSProperties : undefined}
                onKeyDown={(e) => e.key === 'Enter' && !submitted && checkAnswer()}
              />
            )}

            {isOrdering && (
              <div className="space-y-3">
                {selectedOrder.length > 0 && (
                  <div className="flex flex-wrap gap-2 min-h-[40px] p-3 rounded-xl bg-slate-50 border border-dashed border-slate-200">
                    {selectedOrder.map((word, idx) => (
                      <span
                        key={idx}
                        onClick={() => !submitted && handleRemoveFromOrder(idx)}
                        className={cn(
                          'inline-flex items-center px-3 py-1.5 rounded-lg text-sm cursor-pointer transition-colors',
                          submitted ? 'opacity-70' : 'hover:bg-red-50 hover:text-red-500'
                        )}
                        style={{
                          backgroundColor: `${themeColor}15`,
                          color: themeColor,
                          borderColor: `${themeColor}30`,
                        }}
                      >
                        {word} ×
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {exercise.question
                    .match(/\(([^\)]+)\)/)?.[1]
                    ?.split(/\s*\/\s*/)
                    .filter(Boolean)
                    .map((word, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleOrderingClick(word.trim())}
                        disabled={submitted || selectedOrder.includes(word.trim())}
                        className={cn(
                          'px-3 py-1.5 rounded-lg text-sm border transition-colors',
                          selectedOrder.includes(word.trim())
                            ? 'opacity-30 cursor-not-allowed border-transparent bg-slate-50'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        )}
                      >
                        {word.trim()}
                      </motion.button>
                    ))}
                </div>
              </div>
            )}

            {!submitted ? (
              <Button fullWidth className="mt-5" onClick={checkAnswer}>
                提交答案
              </Button>
            ) : (
              <div className="mt-5 space-y-3">
                <div
                  className={cn(
                    'flex items-start gap-3 p-4 rounded-xl',
                    isCorrect ? 'bg-emerald-50' : 'bg-red-50'
                  )}
                >
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <p className={cn('font-semibold text-sm', isCorrect ? 'text-emerald-700' : 'text-red-600')}>
                      {isCorrect ? '回答正确！🎉' : '再想想看 💡'}
                    </p>
                    {!isCorrect && isMultipleChoice && (
                      <p className="text-sm text-red-500 mt-1">
                        正确答案：<strong>{exercise.answer}</strong>
                      </p>
                    )}
                    {!isCorrect && isFillBlank && (
                      <p className="text-sm text-red-500 mt-1">
                        正确答案：<strong>{Array.isArray(exercise.answer) ? exercise.answer.join(' / ') : exercise.answer}</strong>
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50/50">
                  <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-amber-700/80 leading-relaxed">{exercise.explanation}</p>
                </div>

                <Button
                  fullWidth
                  variant={allDone ? 'primary' : 'secondary'}
                  icon={<ArrowRight className="w-4 h-4" />}
                  onClick={handleNext}
                >
                  {allDone ? '查看结果' : '下一题'}
                </Button>
              </div>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
