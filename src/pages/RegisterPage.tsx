import { useState, type FormEvent, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Leaf, UserPlus, Github, CheckCircle2 } from 'lucide-react';
import Button from '@/components/common/Button';
import { useAuthStore } from '@/stores/useAuthStore';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 14 },
  },
};

interface FormErrors {
  nickname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreement?: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getPasswordStrength(password: string): { level: number; label: string; color: string } {
  if (password.length === 0) return { level: 0, label: '', color: '' };
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { level: 1, label: '弱', color: '#EF4444' };
  if (score <= 2) return { level: 2, label: '一般', color: '#F59E0B' };
  if (score <= 3) return { level: 3, label: '中等', color: '#3B82F6' };
  return { level: 4, label: '强', color: '#10B981' };
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuthStore();
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState('');

  const passwordStrength = useMemo(() => getPasswordStrength(password), [password]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!nickname.trim()) {
      newErrors.nickname = '请输入昵称';
    } else if (nickname.trim().length < 2) {
      newErrors.nickname = '昵称至少2个字符';
    }
    if (!email.trim()) {
      newErrors.email = '请输入邮箱地址';
    } else if (!validateEmail(email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }
    if (!password) {
      newErrors.password = '请输入密码';
    } else if (password.length < 6) {
      newErrors.password = '密码长度至少6位';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = '请确认密码';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = '两次密码不一致';
    }
    if (!agreedToTerms) {
      newErrors.agreement = '请阅读并同意用户协议';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    if (!validate()) return;

    try {
      await register(email, password, nickname.trim());
      navigate('/');
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : '注册失败，请重试');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f0f4ff 50%, #faf5ff 100%)' }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-500 shadow-lg shadow-emerald-200/50 mb-5">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 font-[Outfit,'Noto Sans SC',sans-serif]">
            创建账号
          </h1>
          <p className="mt-2 text-slate-400 text-sm">加入知识花园，开启你的多语种学习之旅</p>
        </motion.div>

        <motion.form
          variants={itemVariants}
          onSubmit={handleSubmit}
          noValidate
          className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 p-8 space-y-4.5 border border-slate-100/80"
        >
          <AnimatePresence mode="wait">
            {submitError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-50 text-red-600 text-sm px-4 py-2.5 rounded-xl flex items-center gap-2"
                role="alert"
              >
                <span>{submitError}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label htmlFor="nickname" className="block text-sm font-medium text-slate-700 mb-1.5">
              昵称
            </label>
            <div className="relative">
              <UserPlus className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
              <input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => { setNickname(e.target.value); if (errors.nickname) setErrors((prev) => ({ ...prev, nickname: undefined })); }}
                placeholder="你的昵称"
                autoComplete="nickname"
                className={`w-full pl-11 pr-4 py-3 rounded-xl border bg-slate-50/50 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 ${
                  errors.nickname ? 'border-red-300 bg-red-50/30' : 'border-slate-200'
                }`}
              />
            </div>
            <AnimatePresence>
              {errors.nickname && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-xs text-red-500">
                  {errors.nickname}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div>
            <label htmlFor="reg-email" className="block text-sm font-medium text-slate-700 mb-1.5">
              邮箱地址
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
              <input
                id="reg-email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((prev) => ({ ...prev, email: undefined })); }}
                placeholder="your@email.com"
                autoComplete="email"
                className={`w-full pl-11 pr-4 py-3 rounded-xl border bg-slate-50/50 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 ${
                  errors.email ? 'border-red-300 bg-red-50/30' : 'border-slate-200'
                }`}
              />
            </div>
            <AnimatePresence>
              {errors.email && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-xs text-red-500">
                  {errors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div>
            <label htmlFor="reg-password" className="block text-sm font-medium text-slate-700 mb-1.5">
              密码
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
              <input
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors((prev) => ({ ...prev, password: undefined })); }}
                placeholder="设置密码（至少6位）"
                autoComplete="new-password"
                className={`w-full pl-11 pr-11 py-3 rounded-xl border bg-slate-50/50 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 ${
                  errors.password ? 'border-red-300 bg-red-50/30' : 'border-slate-200'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
              </button>
            </div>
            {password.length > 0 && (
              <div className="mt-2 space-y-1.5">
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className="h-1.5 flex-1 rounded-full transition-colors duration-300"
                      style={{
                        backgroundColor: passwordStrength.level >= level ? passwordStrength.color : '#E2E8F0',
                      }}
                    />
                  ))}
                </div>
                <p className="text-xs" style={{ color: passwordStrength.color }}>
                  密码强度：{passwordStrength.label}
                </p>
              </div>
            )}
            <AnimatePresence>
              {errors.password && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-xs text-red-500">
                  {errors.password}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-700 mb-1.5">
              确认密码
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
              <input
                id="confirm-password"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined })); }}
                placeholder="再次输入密码"
                autoComplete="new-password"
                className={`w-full pl-11 pr-4 py-3 rounded-xl border bg-slate-50/50 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 ${
                  errors.confirmPassword ? 'border-red-300 bg-red-50/30' : 'border-slate-200'
                }`}
              />
            </div>
            <AnimatePresence>
              {errors.confirmPassword && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-xs text-red-500">
                  {errors.confirmPassword}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => { setAgreedToTerms(e.target.checked); if (errors.agreement) setErrors((prev) => ({ ...prev, agreement: undefined })); }}
                className="w-4 h-4 mt-0.5 rounded border-slate-300 text-blue-500 focus:ring-blue-400 cursor-pointer"
              />
              <span className="text-sm text-slate-500 group-hover:text-slate-700 transition-colors leading-relaxed">
                我已阅读并同意{' '}
                <Link to="/terms" className="text-blue-500 hover:text-blue-600 font-medium">服务协议</Link>
                {' '}和{' '}
                <Link to="/privacy" className="text-blue-500 hover:text-blue-600 font-medium">隐私政策</Link>
              </span>
            </label>
            <AnimatePresence>
              {errors.agreement && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 ml-6.5 text-xs text-red-500">
                  {errors.agreement}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            icon={<UserPlus className="w-5 h-5" />}
            loading={isLoading}
            className="mt-2"
          >
            注册
          </Button>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white text-slate-400">或</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Google
            </button>
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <Github className="w-5 h-5" />
              GitHub
            </button>
          </div>

          <p className="text-center text-sm text-slate-500 pt-1">
            已有账号？{' '}
            <Link to="/login" className="text-blue-500 hover:text-blue-600 font-medium transition-colors">
              立即登录
            </Link>
          </p>
        </motion.form>
      </motion.div>
    </div>
  );
}
