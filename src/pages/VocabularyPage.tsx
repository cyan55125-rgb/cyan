import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { LANGUAGE_THEMES } from '@/utils/constants';
import type { Language } from '@/types/index';
import VocabularyLesson from '@/components/learn/VocabularyLesson';

export default function VocabularyPage() {
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const language = (lang || 'en') as Language;
  const theme = LANGUAGE_THEMES[language as keyof typeof LANGUAGE_THEMES] || LANGUAGE_THEMES.en;

  const LANG_NAMES: Record<string, string> = {
    en: '英语',
    ja: '日语',
    ko: '韩语',
  };

  return (
    <div className="min-h-screen">
      <div
        className="sticky top-0 z-10 backdrop-blur-md bg-white/80 border-b border-slate-100"
      >
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
              style={{ background: theme.gradient }}
            >
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-[family-name:var(--font-outfit)] text-lg font-bold text-slate-800 leading-tight">
                单词记忆
              </h1>
              <p className="text-xs text-slate-400">{LANG_NAMES[language] || language}</p>
            </div>
          </div>
        </div>
      </div>

      <VocabularyLesson lang={language} onBack={() => navigate('/learn')} />
    </div>
  );
}
