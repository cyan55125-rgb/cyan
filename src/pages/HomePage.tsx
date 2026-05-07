import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, GraduationCap } from 'lucide-react';
import Button from '@/components/common/Button';
import HeroSection from '@/components/home/HeroSection';
import CourseCarousel from '@/components/home/CourseCarousel';
import StatsPanel from '@/components/home/StatsPanel';
import { useAuthStore } from '@/stores/useAuthStore';

const ctaVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 14 },
  },
};

export default function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />

      <StatsPanel />

      <CourseCarousel />

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={ctaVariants}
        className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
        style={{
          background: 'linear-gradient(135deg, #f0f4ff 0%, #faf5ff 50%, #f0fdf4 100%)',
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            加入 10,000+ 学习者的行列
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-5 leading-tight font-[Outfit,'Noto Sans SC',sans-serif]">
            今天就开始你的
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500">
              语言学习之旅
            </span>
          </h2>

          <p className="text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed">
            免费开始学习，无需信用卡。科学的学习路径、互动式课程设计，
            让每一分钟的学习都充满收获。
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              icon={<GraduationCap className="w-5 h-5" />}
              onClick={() => navigate(isAuthenticated ? '/learn' : '/register')}
              className="min-w-[200px]"
            >
              {isAuthenticated ? '继续学习' : '免费注册'}
            </Button>
            <Button
              variant="outline"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
              onClick={() => navigate('/courses')}
              className="min-w-[200px]"
            >
              探索课程
            </Button>
          </div>

          <div className="mt-14 flex items-center justify-center gap-8 sm:gap-12 text-slate-400">
            {[
              { value: '10+', label: '精品课程' },
              { value: '50K+', label: '活跃学习者' },
              { value: '4.9', label: '用户评分' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-2xl font-bold text-slate-700 font-[Outfit,sans-serif]">{item.value}</p>
                <p className="text-xs mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
