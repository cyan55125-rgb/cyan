import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, Eye, EyeOff, Volume2, CheckCircle2, XCircle, ChevronRight, RotateCcw } from 'lucide-react';
import type { ListeningMaterial } from '@/types/listening';
import { cn } from '@/lib/utils';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';

type Phase = 'main' | 'detail' | 'result';

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2] as const;

interface ListeningTrainerProps {
  material: ListeningMaterial;
  themeColor: string;
  onComplete: () => void;
}

export default function ListeningTrainer({ material, themeColor, onComplete }: ListeningTrainerProps) {
  const theme = {
    primary: themeColor,
    gradient: `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}cc 100%)`,
  };

  const [phase, setPhase] = useState<Phase>('main');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState<number>(1);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [scores, setScores] = useState<(boolean | null)[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<{ q: string; correct: number; selected: number | null }[]>([]);

  const questions = material.questions;
  const currentQuestion = questions[currentQuestionIndex];

  const handlePlayToggle = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    setIsPlaying(true);
    let p = 0;
    const interval = setInterval(() => {
      p += speed * 1.5;
      if (p >= 100) {
        clearInterval(interval);
        setIsPlaying(false);
        setProgress(100);
      }
      setProgress(Math.min(p, 100));
    }, 200);
    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  const handleSubmitAnswer = useCallback(() => {
    if (selectedAnswer === null) return;
    const correct = selectedAnswer === currentQuestion.answer;
    setIsCorrect(correct);
    setSubmitted(true);
    setScores((prev) => [...prev, correct]);
    if (!correct) {
      setWrongAnswers((prev) => [
        ...prev,
        { q: currentQuestion.question, correct: currentQuestion.answer, selected: selectedAnswer },
      ]);
    }
  }, [selectedAnswer, currentQuestion]);

  const handleNextQuestion = useCallback(() => {
    if (phase === 'main') {
      setPhase('detail');
      setCurrentQuestionIndex(1);
      setSelectedAnswer(null);
      setSubmitted(false);
      setIsCorrect(null);
    } else if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
      setSelectedAnswer(null);
      setSubmitted(false);
      setIsCorrect(null);
    } else {
      setPhase('result');
    }
  }, [phase, currentQuestionIndex, questions.length]);

  const handleRestart = useCallback(() => {
    setPhase('main');
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setSubmitted(false);
    setIsCorrect(null);
    setScores([]);
    setWrongAnswers([]);
    setProgress(0);
    setIsPlaying(false);
  }, []);

  const correctCount = scores.filter(Boolean).length;
  const totalAnswered = scores.length;

  const DIFFICULTY_MAP: Record<string, { label: string; variant: 'success' | 'warning' | 'danger' }> = {
    beginner: { label: '入门', variant: 'success' },
    elementary: { label: '基础', variant: 'success' },
    intermediate: { label: '进阶', variant: 'warning' },
    'upper-intermediate': { label: '高级进阶', variant: 'danger' },
    advanced: { label: '高级', variant: 'danger' },
  };

  const diffConfig = DIFFICULTY_MAP[material.difficulty] || { label: material.difficulty, variant: 'info' as const };

  if (phase === 'result') {
    const scorePercent = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
    return (
      <div className="space-y-5">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-4">
          <div
            className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold"
            style={{ background: theme.gradient }}
          >
            {scorePercent}
          </div>
          <h3 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-slate-800">
            听力训练完成！
          </h3>
          <p className="text-sm text-slate-500">正确 {correctCount} / 共 {totalAnswered} 题</p>
        </motion.div>

        <Card>
          <h4 className="font-semibold text-sm text-slate-700 mb-3 flex items-center gap-2">
            <Volume2 className="w-4 h-4" style={{ color: themeColor }} />
            原文对照
          </h4>
          <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
            {material.content.split('\n').filter((l) => l.trim()).map((line, i) => (
              <div key={i} className="text-sm leading-relaxed">
                <span className="text-slate-700">{line}</span>
                {material.translation.split('\n')[i] && (
                  <p className="text-xs text-slate-400 mt-0.5 pl-3 border-l-2" style={{ borderColor: `${themeColor}40` }}>
                    {material.translation.split('\n')[i]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Card>

        {wrongAnswers.length > 0 && (
          <Card padding="sm">
            <h4 className="font-semibold text-sm text-red-500 mb-3 flex items-center gap-2">
              <XCircle className="w-4 h-4" /> 错题回顾 ({wrongAnswers.length})
            </h4>
            <div className="space-y-2">
              {wrongAnswers.map((wa, i) => (
                <div key={i} className="p-3 rounded-lg bg-red-50/50 border border-red-100">
                  <p className="text-xs text-slate-700 mb-1.5">{wa.q}</p>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-red-400">你的答案：{wa.selected !== null ? wa.selected + 1 : '-'}</span>
                    <span className="text-emerald-600 font-medium">正确：{wa.correct + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        <div className="flex gap-3 justify-center pt-2">
          <Button variant="outline" icon={<RotateCcw className="w-4 h-4" />} onClick={handleRestart}>
            再练一次
          </Button>
          <Button icon={<ChevronRight className="w-4 h-4" />} onClick={onComplete}>
            下一材料
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <Card padding="sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge text={diffConfig.label} variant={diffConfig.variant} size="sm" />
            <Badge text={material.category} variant="info" size="sm" />
          </div>
          <Badge text={`${Math.round(material.duration / 60)}分钟`} variant="default" size="sm" />
        </div>
        <h2 className="font-[family-name:var(--font-outify)] text-lg font-bold text-slate-800 leading-tight">
          {material.title}
        </h2>
      </Card>

      <Card padding="sm">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlayToggle}
              className={cn(
                'w-11 h-11 rounded-full flex items-center justify-center transition-colors',
                isPlaying ? 'bg-red-50 text-red-500' : 'text-white shadow-md'
              )}
              style={!isPlaying ? { background: theme.gradient } : undefined}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </motion.button>

            <div className="flex-1">
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden cursor-pointer" onClick={() => setProgress(0)}>
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: themeColor,
                  }}
                />
              </div>
              <div className="flex justify-between mt-1 text-[10px] text-slate-400">
                <span>{Math.floor((progress / 100) * material.duration)}s</span>
                <span>{material.duration}s</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 bg-slate-50 rounded-lg p-0.5">
              {SPEED_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={cn(
                    'px-2 py-1 rounded-md text-xs font-medium transition-all',
                    speed === s ? 'text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  )}
                  style={speed === s ? { background: theme.primary } : undefined}
                >
                  {s}x
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowSubtitle(!showSubtitle)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                showSubtitle ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
              )}
            >
              {showSubtitle ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              字幕
            </button>
          </div>
        </div>
      </Card>

      {(showSubtitle || phase === 'detail') && (
        <AnimatePresence>
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
            <Card padding="sm">
              <div className="max-h-48 overflow-y-auto space-y-1.5 text-sm text-slate-600 leading-relaxed pr-1">
                {material.content.split('\n').filter((l) => l.trim()).map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      )}

      <Card>
        <div className="mb-3">
          <span className="text-xs font-medium text-slate-400">
            {phase === 'main' ? '阶段一：听主旨' : `阶段二：精听 (${currentQuestionIndex + 1}/${questions.length})`}
          </span>
        </div>

        {currentQuestion && (
          <>
            <p className="text-base font-medium text-slate-800 mb-4 leading-relaxed">{currentQuestion.question}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
              {currentQuestion.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => !submitted && setSelectedAnswer(i)}
                  disabled={submitted}
                  className={cn(
                    'text-left px-4 py-3 rounded-xl text-sm border transition-all',
                    submitted
                      ? i === currentQuestion.answer
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                        : i === selectedAnswer && i !== currentQuestion.answer
                          ? 'border-red-300 bg-red-50 text-red-600'
                          : 'border-slate-100 bg-white text-slate-400'
                      : selectedAnswer === i
                        ? 'border-[2px]'
                        : 'border-slate-100 hover:border-slate-200'
                  )}
                  style={
                    !submitted && selectedAnswer === i
                      ? { borderColor: themeColor, backgroundColor: `${themeColor}08` }
                      : undefined
                  }
                >
                  {String.fromCharCode(65 + i)}. {opt}
                </motion.button>
              ))}
            </div>

            {!submitted ? (
              <Button fullWidth onClick={handleSubmitAnswer} disabled={selectedAnswer === null}>
                提交答案
              </Button>
            ) : (
              <div className="space-y-3">
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
                  <p className={cn('text-sm font-semibold', isCorrect ? 'text-emerald-700' : 'text-red-600')}>
                    {isCorrect ? '回答正确！🎉' : `正确答案是 ${String.fromCharCode(65 + currentQuestion.answer)}`}
                  </p>
                </div>
                <Button
                  fullWidth
                  variant={phase === 'main' ? 'primary' : 'secondary'}
                  icon={<ChevronRight className="w-4 h-4" />}
                  onClick={handleNextQuestion}
                >
                  {phase === 'main' ? '进入精听' : currentQuestionIndex >= questions.length - 1 ? '查看结果' : '下一题'}
                </Button>
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
}
