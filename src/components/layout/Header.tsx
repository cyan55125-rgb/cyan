import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogIn, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/useAuthStore';
import Avatar from '@/components/common/Avatar';

const navLinks = [
  { to: '/', label: '首页' },
  { to: '/courses', label: '课程中心' },
  { to: '/community', label: '社区' },
  { to: '/progress', label: '进度' },
];

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="flex-shrink-0 group">
            <span
              className="text-2xl font-bold tracking-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 bg-clip-text text-transparent">
                LinguaFlow
              </span>
            </span>
          </NavLink>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'relative px-4 py-2 text-sm font-medium transition-colors rounded-lg',
                    isActive ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <motion.span
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-blue-500 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <button
                onClick={() => navigate('/profile')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors"
              >
                <Avatar src={user.avatar || undefined} name={user.nickname} size="sm" />
                <span className="text-sm font-medium text-slate-700">{user.nickname}</span>
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-[24px] bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium shadow-md shadow-blue-200 hover:shadow-lg transition-shadow"
              >
                <LogIn className="w-4 h-4" />
                登录
              </button>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="菜单"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-slate-100"
          >
            <nav className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'block px-4 py-3 rounded-xl text-base font-medium transition-colors',
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-slate-700 hover:bg-slate-50'
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="pt-3 border-t border-slate-100 mt-3">
                {isAuthenticated && user ? (
                  <button
                    onClick={() => {
                      navigate('/profile');
                      setMobileOpen(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-slate-50"
                  >
                    <Avatar src={user.avatar || undefined} name={user.nickname} size="sm" />
                    <span className="font-medium text-slate-700">{user.nickname}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      navigate('/login');
                      setMobileOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-[24px] bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium"
                  >
                    <LogIn className="w-4 h-4" />
                    登录 / 注册
                  </button>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
