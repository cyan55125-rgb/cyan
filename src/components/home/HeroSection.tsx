import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Sparkles, ArrowRight, Play } from 'lucide-react';
import Button from '@/components/common/Button';
import LanguageSelector from './LanguageSelector';
import { LANGUAGES, LANGUAGE_THEMES } from '@/utils/constants';
import type { LanguageCode } from '@/types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 14 },
  },
};

const floatVariants = {
  animate: (i: number) => ({
    y: [0, -16, 0],
    x: [0, i % 2 === 0 ? 8 : -8, 0],
    rotate: [0, i % 2 === 0 ? 6 : -6, 0],
    transition: {
      duration: 4 + i * 0.6,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: i * 0.4,
    },
  }),
};

export default function HeroSection() {
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState<LanguageCode>('en');
  const coursesRef = useRef<HTMLDivElement>(null);

  const currentTheme = LANGUAGE_THEMES[selectedLang];
  const selectedLanguageConfig = LANGUAGES.find((l) => l.code === selectedLang)!;

  const handleSelectLanguage = (lang: LanguageCode) => {
    setSelectedLang(lang);
  };

  const scrollToCourses = () => {
    coursesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const languageDescriptions: Record<LanguageCode, string> = {
    en: '从零基础到流利表达，系统化英语学习路径',
    ja: '五十音到N1，沉浸式日语学习体验',
    ko: '四十音到TOPIK 6级，趣味韩语入门',
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${currentTheme.primary}08 0%, ${currentTheme.secondary}15 50%, #fafbff 100%)`,
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, ${currentTheme.primary} 1px, transparent 1px), radial-gradient(circle at 80% 70%, ${currentTheme.secondary} 1px, transparent 1px)`,
          backgroundSize: '60px 60px, 80px 80px',
        }}
      />

      <motion.div
        className="absolute top-[12%] left-[8%] w-16 h-16 rounded-full opacity-20 blur-sm"
        style={{ backgroundColor: currentTheme.primary }}
        variants={floatVariants}
        custom={0}
        animate="animate"
      />
      <motion.div
        className="absolute top-[25%] right-[12%] w-10 h-10 rounded-full opacity-15 blur-sm"
        style={{ backgroundColor: currentTheme.secondary }}
        variants={floatVariants}
        custom={1}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-[30%] left-[15%] w-12 h-12 rounded-full opacity-10 blur-sm"
        style={{ backgroundColor: currentTheme.primary }}
        variants={floatVariants}
        custom={2}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-[18%] right-[20%] w-8 h-8 rounded-full opacity-15 blur-sm"
        style={{ backgroundColor: currentTheme.secondary }}
        variants={floatVariants}
        custom={3}
        animate="animate"
      />
      <motion.div
        className="absolute top-[55%] left-[45%] w-6 h-6 rounded-full opacity-10 blur-sm"
        style={{ backgroundColor: currentTheme.primary }}
        variants={floatVariants}
        custom={4}
        animate="animate"
      />

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-4">
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
            style={{
              backgroundColor: `${currentTheme.primary}12`,
              color: currentTheme.primary,
              border: `1px solid ${currentTheme.primary}30`,
            }}
          >
            <Sparkles className="w-4 h-4" />
            知识花园 · 多语种在线学习平台
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6 font-[Outfit,'Noto Sans SC',sans-serif]"
        >
          开启你的{' '}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
            }}
          >
            多语种学习之旅
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-500 leading-relaxed mb-10"
        >
          在知识花园中探索英语、日语、韩语的奥秘。科学的学习方法、精心设计的课程体系，
          让语言学习像呼吸一样自然。
        </motion.p>

        <motion.div variants={itemVariants} className="mb-12">
          <LanguageSelector onSelect={handleSelectLanguage} selectedLang={selectedLang} />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedLang}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="mb-10 p-5 rounded-2xl max-w-md mx-auto bg-white/60 backdrop-blur-sm border border-slate-100/80 shadow-sm"
          >
            <p className="text-base text-slate-600">
              <span className="text-3xl mr-2">{selectedLanguageConfig.flag}</span>
              {languageDescriptions[selectedLang]}
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            variant="primary"
            size="lg"
            icon={<Play className="w-5 h-5" />}
            onClick={() => navigate('/learn')}
            className="min-w-[180px]"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
            }}
          >
            立即开始学习
          </Button>
          <Button
            variant="outline"
            size="lg"
            icon={<BookOpen className="w-5 h-5" />}
            onClick={scrollToCourses}
            className="min-w-[180px]"
          >
            浏览全部课程
          </Button>
        </motion.div>

        <div ref={coursesRef} />
      </motion.div>

      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: `linear-gradient(to top, rgba(255,255,255,0.9), transparent)`,
        }}
      />
    </section>
  );
}
