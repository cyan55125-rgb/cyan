import { Github, Twitter, Mail, Heart } from 'lucide-react';

const footerLinks = {
  about: [
    { label: '关于我们', href: '#' },
    { label: '团队介绍', href: '#' },
    { label: '加入我们', href: '#' },
    { label: '品牌故事', href: '#' },
  ],
  quick: [
    { label: '课程中心', href: '/courses' },
    { label: '学习社区', href: '/community' },
    { label: '帮助中心', href: '#' },
    { label: '隐私政策', href: '#' },
  ],
  contact: [
    { label: 'contact@linguaflow.com', href: 'mailto:contact@linguaflow.com', icon: Mail },
    { label: '@LinguaFlow', href: '#', icon: Twitter },
    { label: 'GitHub', href: '#', icon: Github },
  ],
};

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          <div>
            <h3
              className="text-xl font-bold text-white mb-4"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              LinguaFlow
            </h3>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              在知识花园中探索语言的魅力，让学习成为一段温暖而有趣的旅程。
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">快速链接</h4>
            <ul className="space-y-2.5">
              {footerLinks.quick.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">联系我们</h4>
            <ul className="space-y-2.5">
              {footerLinks.contact.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} LinguaFlow. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-xs text-slate-500">
            Made with <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> for language learners
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
