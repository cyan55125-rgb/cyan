import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LANGUAGES } from '@/utils/constants';
import type { LanguageCode } from '@/types';

interface LanguageSelectorProps {
  onSelect: (lang: LanguageCode) => void;
  selectedLang: LanguageCode;
}

const languageCourseCount: Record<LanguageCode, number> = {
  en: 9,
  ja: 9,
  ko: 9,
};

export default function LanguageSelector({ onSelect, selectedLang }: LanguageSelectorProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      {LANGUAGES.map((lang, index) => {
        const isSelected = lang.code === selectedLang;
        const courseCount = languageCourseCount[lang.code];

        return (
          <motion.button
            key={lang.code}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1, type: 'spring', stiffness: 120, damping: 14 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(lang.code)}
            className={cn(
              'relative flex items-center gap-4 px-6 py-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer min-w-[200px]',
              isSelected
                ? 'border-current shadow-lg'
                : 'border-slate-200 bg-white/80 hover:border-slate-300 hover:bg-white'
            )}
            style={{
              color: isSelected ? lang.primaryColor : '#64748b',
              backgroundColor: isSelected ? `${lang.primaryColor}08` : undefined,
              borderColor: isSelected ? lang.primaryColor : undefined,
            }}
          >
            <span className="text-4xl">{lang.flag}</span>
            <div className="text-left">
              <p className="font-bold text-base font-[Outfit,'Noto Sans SC',sans-serif]">{lang.name}</p>
              <p className="text-xs mt-0.5 opacity-70">{courseCount} 门课程在学</p>
            </div>

            {isSelected && (
              <motion.div
                layoutId="language-indicator"
                className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-10 h-[3px] rounded-full"
                style={{ backgroundColor: lang.primaryColor }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
