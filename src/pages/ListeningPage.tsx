import { useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Headphones, ChevronRight } from 'lucide-react';
import type { Language } from '@/types/index';
import type { ListeningMaterial } from '@/types/listening';
import { listeningMaterials } from '@/assets/data/listening';
import { LANGUAGE_THEMES } from '@/utils/constants';
import { cn } from '@/lib/utils';
import ListeningTrainer from '@/components/learn/ListeningTrainer';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';

const DIFFICULTY_STYLES: Record<string, string> = {
  beginner: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  elementary: 'bg-blue-50 text-blue-700 ring-blue-200',
  intermediate: 'bg-amber-50 text-amber-700 ring-amber-200',
  'upper-intermediate': 'bg-orange-50 text-orange-700 ring-orange-200',
  advanced: 'bg-red-50 text-red-700 ring-red-200',
};

const DIFFICULTY_LABELS: Record<string, string> = {
  beginner: '入门',
  elementary: '基础',
  intermediate: '进阶',
  'upper-intermediate': '高级进阶',
  advanced: '高级',
};

export default function ListeningPage() {
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const language = (lang || 'en') as Language;
  const theme = LANGUAGE_THEMES[language as keyof typeof LANGUAGE_THEMES] || LANGUAGE_THEMES.en;

  const [selectedMaterialId, setSelectedMaterialId] = useState<string | null>(null);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  const materials = useMemo(
    () => listeningMaterials.filter((m) => m.language === language),
    [language]
  );

  const selectedMaterial = materials.find((m) => m.id === selectedMaterialId) || null;

  const handleComplete = useCallback(() => {
    if (selectedMaterial) {
      setCompletedIds((prev) => new Set([...prev, selectedMaterial.id]));
    }
    const currentIndex = materials.findIndex((m) => m.id === selectedMaterialId);
    if (currentIndex < materials.length - 1 && selectedMaterial) {
      setSelectedMaterialId(materials[currentIndex + 1].id);
    }
  }, [selectedMaterial, materials]);

  const handleSelectMaterial = useCallback(
    (id: string) => {
      setSelectedMaterialId(id);
      setCompletedIds(new Set());
    },
    []
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
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-[family-name:var(--font-outfit)] text-lg font-bold text-slate-800 leading-tight">
                听力训练
              </h1>
              <p className="text-xs text-slate-400">{LANG_NAMES[language] || language}</p>
            </div>
          </div>
          {completedIds.size > 0 && (
            <Badge text={`已完成 ${completedIds.size} 个材料`} variant="success" />
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
              材料列表
            </h3>
            {materials.map((m) => (
              <button
                key={m.id}
                onClick={() => handleSelectMaterial(m.id)}
                className={cn(
                  'w-full text-left px-4 py-3 rounded-xl transition-all group',
                  selectedMaterialId === m.id ? 'shadow-sm' : 'hover:bg-slate-50'
                )}
                style={
                  selectedMaterialId === m.id
                    ? {
                        backgroundColor: `${theme.primary}08`,
                        color: theme.primary,
                      }
                    : undefined
                }
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className={cn('text-sm font-medium truncate', selectedMaterialId === m.id ? '' : 'text-slate-700')}>
                      {m.title}
                    </p>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">{m.category}</span>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span
                      className={cn(
                        'px-2 py-0.5 rounded-full text-[10px] font-medium ring-1',
                        DIFFICULTY_STYLES[m.difficulty]
                      )}
                    >
                      {DIFFICULTY_LABELS[m.difficulty]}
                    </span>
                    {completedIds.has(m.id) && (
                      <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[8px]">
                        ✓
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </Card>
        </motion.aside>

        <main className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {!selectedMaterial ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-16 text-center">
                <div
                  className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                  style={{ backgroundColor: `${theme.primary}10` }}
                >
                  <Headphones className="w-10 h-10" style={{ color: theme.primary }} />
                </div>
                <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-slate-700 mb-2">
                  选择听力材料开始训练
                </h2>
                <p className="text-sm text-slate-400">左侧共有 {materials.length} 个材料</p>
              </motion.div>
            ) : (
              <motion.div key={selectedMaterial.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <ListeningTrainer
                  material={selectedMaterial}
                  themeColor={theme.primary}
                  onComplete={handleComplete}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
