import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Mic, MicOff, ChevronLeft, ChevronRight, RotateCcw, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';

interface SpeakingPracticeProps {
  sentence: string;
  translation: string;
  themeColor: string;
  currentIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

interface ScoreResult {
  total: number;
  accuracy: number;
  fluency: number;
  completeness: number;
  intonation: number;
}

interface HistoryRecord {
  sentence: string;
  score: number;
  timestamp: string;
}

const SPEED_OPTIONS = [0.5, 0.75, 1] as const;

function WaveformSVG({ color }: { color: string }) {
  const bars = [40, 70, 50, 85, 45, 90, 55, 75, 40, 65, 80, 50, 95, 60, 70, 45, 85, 55, 75, 48];
  return (
    <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="none">
      {bars.map((h, i) => (
        <rect
          key={i}
          x={i * 20 + 4}
          y={(100 - h) / 2}
          width={12}
          height={h}
          rx={6}
          fill={color}
          opacity={0.15 + Math.random() * 0.35}
        />
      ))}
    </svg>
  );
}

export default function SpeakingPractice({
  sentence,
  translation,
  themeColor,
  currentIndex,
  total,
  onPrev,
  onNext,
}: SpeakingPracticeProps) {
  const theme = {
    primary: themeColor,
    gradient: `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}cc 100%)`,
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<number>(1);
  const [repeatCount, setRepeatCount] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);
  const [history, setHistory] = useState<HistoryRecord[]>([]);

  const handlePlay = useCallback(() => {
    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.rate = speed;
    utterance.lang = 'en-US';
    utterance.onend = () => setIsPlaying(false);
    speechSynthesis.speak(utterance);
    setIsPlaying(true);
  }, [sentence, speed, isPlaying]);

  const handleRecord = useCallback(() => {
    if (!isRecording) {
      setIsRecording(true);
      setScoreResult(null);
      setTimeout(() => {
        setIsRecording(false);
        const total = Math.floor(Math.random() * 25) + 75;
        const result: ScoreResult = {
          total,
          accuracy: Math.floor(Math.random() * 20) + 75,
          fluency: Math.floor(Math.random() * 25) + 72,
          completeness: Math.floor(Math.random() * 18) + 78,
          intonation: Math.floor(Math.random() * 22) + 70,
        };
        setScoreResult(result);
        setHistory((prev) => [
          { sentence, score: total, timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }) },
          ...prev.slice(0, 4),
        ]);
      }, 2500);
    } else {
      setIsRecording(false);
    }
  }, [isRecording, sentence]);

  useEffect(() => {
    return () => speechSynthesis.cancel();
  }, []);

  const getScoreColor = (s: number) => (s >= 85 ? 'text-emerald-500' : s >= 70 ? 'text-amber-500' : 'text-red-400');

  return (
    <div className="space-y-5">
      <Card>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-slate-400 mb-1">
            <span>原文</span>
            <span>{currentIndex + 1} / {total}</span>
          </div>

          <p
            className="font-[family-name:var(--font-outfit)] text-xl md:text-2xl font-semibold leading-relaxed text-slate-800"
            style={{ color: themeColor }}
          >
            {sentence}
          </p>

          <p className="text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
            {translation}
          </p>
        </div>
      </Card>

      <Card padding="sm">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePlay}
              className={cn(
                'w-11 h-11 rounded-full flex items-center justify-center transition-colors',
                isPlaying ? 'bg-red-50 text-red-500' : 'text-white shadow-md'
              )}
              style={!isPlaying ? { background: theme.gradient } : undefined}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </motion.button>

            <Volume2 className="w-4 h-4 text-slate-400" />

            <div className="flex items-center gap-1 bg-slate-50 rounded-lg p-0.5">
              {SPEED_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={cn(
                    'px-2.5 py-1 rounded-md text-xs font-medium transition-all',
                    speed === s ? 'text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  )}
                  style={speed === s ? { background: theme.primary } : undefined}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>重复</span>
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                onClick={() => setRepeatCount(n)}
                className={cn(
                  'w-7 h-7 rounded-lg flex items-center justify-center font-medium transition-all',
                  repeatCount === n ? 'text-white' : 'hover:bg-slate-100'
                )}
                style={repeatCount === n ? { background: theme.primary } : undefined}
              >
                {n}x
              </button>
            ))}
          </div>
        </div>
      </Card>

      <div className="h-16 rounded-xl overflow-hidden bg-slate-50/80 border border-slate-100">
        <WaveformSVG color={themeColor} />
      </div>

      <div className="flex justify-center py-4">
        <motion.div
          animate={isRecording ? { scale: [1, 1.15, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1.2 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRecord}
            className={cn(
              'relative w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all',
              isRecording
                ? 'bg-red-500 shadow-red-300'
                : 'text-white'
            )}
            style={!isRecording ? { background: `linear-gradient(135deg, ${themeColor}, ${themeColor}cc)` } : undefined}
          >
            {isRecording && (
              <motion.div
                initial={{ scale: 1, opacity: 0.4 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="absolute inset-0 rounded-full bg-red-500"
              />
            )}
            {isRecording ? <MicOff className="w-8 h-8 text-white" /> : <Mic className="w-8 h-8" />}
          </motion.button>
        </motion.div>
        <p className="text-center text-xs text-slate-400 mt-3 w-full">
          {isRecording ? '录音中...' : '点击开始跟读'}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {scoreResult && (
          <motion.div
            key="score"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Card>
              <h3 className="font-semibold text-sm text-slate-700 mb-4 text-center">评分结果</h3>

              <div className="relative w-36 h-36 mx-auto mb-5">
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#f1f5f9" strokeWidth="10" />
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke={themeColor}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${(scoreResult.total / 100) * 327}`}
                    initial={{ strokeDashoffset: 327 }}
                    animate={{ strokeDashoffset: 327 - (scoreResult.total / 100) * 327 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-3xl font-bold" style={{ color: themeColor }}>
                    {scoreResult.total}
                  </span>
                  <span className="text-[10px] text-slate-400">总分</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: '准确度', value: scoreResult.accuracy },
                  { label: '流利度', value: scoreResult.fluency },
                  { label: '完整度', value: scoreResult.completeness },
                  { label: '语调', value: scoreResult.intonation },
                ].map((item) => (
                  <div key={item.label} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">{item.label}</span>
                      <span className={cn('font-semibold', getScoreColor(item.value))}>{item.value}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.value}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: themeColor }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {history.length > 0 && (
        <Card padding="sm">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1 pb-2">最近记录</h3>
          <div className="space-y-1.5">
            {history.map((record, i) => (
              <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="min-w-0 mr-3">
                  <p className="text-xs text-slate-600 truncate">{record.sentence}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{record.timestamp}</p>
                </div>
                <span
                  className={cn('text-sm font-bold flex-shrink-0 ml-2', getScoreColor(record.score))}
                >
                  {record.score}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="flex items-center justify-between pt-2">
        <Button variant="ghost" size="sm" icon={<ChevronLeft className="w-4 h-4" />} onClick={onPrev} disabled={currentIndex <= 0}>
          上一句
        </Button>
        <Button variant="ghost" size="sm" icon={<RotateCcw className="w-4 h-4" />} onClick={() => { setScoreResult(null); }}>
          重练
        </Button>
        <Button variant="ghost" size="sm" icon={<ChevronRight className="w-4 h-4" />} onClick={onNext} disabled={currentIndex >= total - 1}>
          下一句
        </Button>
      </div>
    </div>
  );
}
