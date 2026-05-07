import { useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, BookOpen } from 'lucide-react';
import type { Language } from '@/types/index';
import type { GrammarPoint } from '@/types/grammar';
import grammarData from '@/assets/data/grammar';
import { LANGUAGE_THEMES } from '@/utils/constants';
import { cn } from '@/lib/utils';
import GrammarQuiz from '@/components/learn/GrammarQuiz';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';

const DIFFICULTY_LABELS: Record<string, string> = {
  beginner: '入门',
  elementary: '基础',
  intermediate: '进阶',
  'upper-intermediate': '高级进阶',
  advanced: '高级',
};

export default function GrammarPage() {
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const language = (lang || 'en') as Language;
  const theme = LANGUAGE_THEMES[language as keyof typeof LANGUAGE_THEMES] || LANGUAGE_THEMES.en;

  const [selectedPointId, setSelectedPointId] = useState<string | null>(null);
  const [completedPoints, setCompletedPoints] = useState<string[]>([]);
  const [pointScores, setPointScores] = useState<Record<string, number>>({});

  const grammarPoints = useMemo(
    () => grammarData.filter((gp) => gp.language === language),
    [language]
  );

  const selectedPoint = useMemo(
    () => grammarPoints.find((gp) => gp.id === selectedPointId) || null,
    [selectedPointId, grammarPoints]
  );

  const handleComplete = useCallback(
    (score: number) => {
      if (selectedPoint) {
        setCompletedPoints((prev) =>
          prev.includes(selectedPoint.id) ? prev : [...prev, selectedPoint.id]
        );
        setPointScores((prev) => ({ ...prev, [selectedPoint.id]: score }));

        const currentIndex = grammarPoints.findIndex((gp) => gp.id === selectedPoint.id);
        if (currentIndex < grammarPoints.length - 1) {
          setSelectedPointId(grammarPoints[currentIndex + 1].id);
        }
      }
    },
    [selectedPoint, grammarPoints]
  );

  const LANG_NAMES: Record<string, string> = { en: '英语', ja: '日语', ko: '韩语' };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="sticky top-0 z-10 backdrop-blur-md bg-white/80 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/learn')}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
              style={{ background: theme.gradient }}
            >
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-[family-name:var(--font-outfit)] text-lg font-bold text-slate-800 leading-tight">
                语法练习
              </h1>
              <p className="text-xs text-slate-400">{LANG_NAMES[language] || language}</p>
            </div>
          </div>
          {completedPoints.length > 0 && (
            <Badge text={`已完成 ${completedPoints.length}/${grammarPoints.length}`} variant="success" />
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-4 md:p-6 flex flex-col md:flex-row gap-6">
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:w-72 flex-shrink-0"
        >
          <Card padding="sm" className="space-y-1 max-h-[calc(100vh-140px)] overflow-y-auto">
            <h3 className="px-4 pt-3 pb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              语法点列表
            </h3>
            {grammarPoints.map((point) => (
              <button
                key={point.id}
                onClick={() => setSelectedPointId(point.id)}
                className={cn(
                  'w-full text-left px-4 py-3 rounded-xl text-sm transition-all flex items-center justify-between group',
                  selectedPointId === point.id
                    ? 'font-semibold shadow-sm'
                    : 'hover:bg-slate-50'
                )}
                style={
                  selectedPointId === point.id
                    ? {
                        backgroundColor: `${theme.primary}08`,
                        color: theme.primary,
                      }
                    : undefined
                }
              >
                <span className="truncate pr-2">{point.title}</span>
                {completedPoints.includes(point.id) && (
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                    ✓
                  </span>
                )}
              </button>
            ))}
          </Card>
        </motion.aside>

        <main className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {!selectedPoint ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-16 text-center">
                <div
                  className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                  style={{ backgroundColor: `${theme.primary}10` }}
                >
                  <BookOpen className="w-10 h-10" style={{ color: theme.primary }} />
                </div>
                <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-slate-700 mb-2">
                  选择一个语法点开始练习
                </h2>
                <p className="text-sm text-slate-400">左侧共有 {grammarPoints.length} 个语法点</p>
              </motion.div>
            ) : completedPoints.length === grammarPoints.length && !selectedPoint ? (
              <motion.div key="all-done" initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="py-12 text-center space-y-6">
                <div
                  className="w-24 h-24 rounded-full mx-auto flex items-center justify-center"
                  style={{ background: theme.gradient }}
                >
                  <Trophy className="w-12 h-12 text-white" />
                </div>
                <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-slate-800">
                  全部完成！🎉
                </h2>
                <Card>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4">
                      <div className="text-3xl font-bold" style={{ color: theme.primary }}>
                        {grammarPoints.length}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">语法点</div>
                    </div>
                    <div className="text-center p-4">
                      <div className="text-3xl font-bold text-emerald-500">
                        {Math.round(Object.values(pointScores).reduce((a, b) => a + b, 0) / (grammarPoints.length || 1))}%
                      </div>
                      <div className="text-xs text-slate-400 mt-1">平均得分</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ) : (
              <motion.div key={selectedPointId} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="mb-4 flex items-center gap-2">
                  <Badge
                    text={DIFFICULTY_LABELS[selectedPoint?.difficulty || ''] || selectedPoint?.difficulty}
                    variant={
                      selectedPoint?.difficulty === 'beginner' || selectedPoint?.difficulty === 'elementary'
                        ? 'success'
                        : selectedPoint?.difficulty === 'intermediate'
                          ? 'warning'
                          : 'danger'
                    }
                    size="sm"
                  />
                </div>
                {selectedPoint && (
                  <GrammarQuiz
                    grammarPoint={selectedPoint}
                    themeColor={theme.primary}
                    onComplete={handleComplete}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
