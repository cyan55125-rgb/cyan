import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mic } from 'lucide-react';
import type { Language } from '@/types/index';
import vocabulary from '@/assets/data/vocabulary';
import { LANGUAGE_THEMES } from '@/utils/constants';
import SpeakingPractice from '@/components/learn/SpeakingPractice';

export default function SpeakingPage() {
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const language = (lang || 'en') as Language;
  const theme = LANGUAGE_THEMES[language as keyof typeof LANGUAGE_THEMES] || LANGUAGE_THEMES.en;

  const [sentenceIndex, setSentenceIndex] = useState(0);

  const sentences = useMemo(
    () =>
      vocabulary
        .filter((w) => w.language === language)
        .map((w) => ({ sentence: w.exampleSentence, translation: w.exampleTranslation })),
    [language]
  );

  const current = sentences[sentenceIndex];

  const LANG_NAMES: Record<string, string> = { en: '英语', ja: '日语', ko: '韩语' };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="sticky top-0 z-10 backdrop-blur-md bg-white/80 border-b border-slate-100">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
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
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-[family-name:var(--font-outfit)] text-lg font-bold text-slate-800 leading-tight">
                口语跟读
              </h1>
              <p className="text-xs text-slate-400">{LANG_NAMES[language] || language}</p>
            </div>
          </div>
          {current && (
            <span className="text-sm font-medium" style={{ color: theme.primary }}>
              {sentenceIndex + 1} / {sentences.length}
            </span>
          )}
        </div>
      </div>

      <div className="max-w-lg mx-auto p-4 md:p-6">
        {current ? (
          <SpeakingPractice
            sentence={current.sentence}
            translation={current.translation}
            themeColor={theme.primary}
            currentIndex={sentenceIndex}
            total={sentences.length}
            onPrev={() => setSentenceIndex((i) => Math.max(0, i - 1))}
            onNext={() => setSentenceIndex((i) => Math.min(sentences.length - 1, i + 1))}
          />
        ) : (
          <div className="py-20 text-center">
            <p className="text-slate-400">暂无{LANG_NAMES[language]}的跟读素材</p>
          </div>
        )}
      </div>
    </div>
  );
}
