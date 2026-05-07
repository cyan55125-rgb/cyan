import { NavLink } from 'react-router-dom';
import { Home, BookOpen, PenTool, Users, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const tabs = [
  { to: '/', icon: Home, label: '首页' },
  { to: '/courses', icon: BookOpen, label: '课程' },
  { to: '/practice', icon: PenTool, label: '练习' },
  { to: '/community', icon: Users, label: '社区' },
  { to: '/profile', icon: UserCircle, label: '我的' },
];

function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/90 backdrop-blur-xl border-t border-slate-100 safe-area-inset-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              cn(
                'relative flex flex-col items-center justify-center gap-0.5 w-full py-1.5 rounded-xl transition-colors',
                isActive ? 'text-blue-600' : 'text-slate-400'
              )
            }
          >
            {({ isActive }) => (
              <>
                <tab.icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium">{tab.label}</span>
                {isActive && (
                  <span className="absolute -top-0.5 w-1 h-1 rounded-full bg-blue-500" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default MobileNav;
