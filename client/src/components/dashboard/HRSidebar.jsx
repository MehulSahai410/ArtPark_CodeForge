import { Link, useLocation } from 'react-router-dom';
import { Home, Users, BarChart3 } from 'lucide-react';

export default function HRSidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const sections = [
    {
      title: 'Overview',
      items: [
        { label: 'Home', path: '/hr-dashboard', icon: Home },
      ]
    },
    {
      title: 'Employee Management',
      items: [
        { label: 'Manage Employees', path: '/hr/manage-employees', icon: Users },
        { label: 'Employee Progress', path: '/hr/employee-progress', icon: BarChart3, badge: 'New' },
      ]
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 glass-effect border-r border-white/60 bg-white/40 flex flex-col z-50 animate-fade-in-left hidden lg:flex">
      <div className="p-6 border-b border-gray-100/50">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-xl">
            A
          </div>
          <span className="font-serif font-bold text-xl text-ink">AdaptLearn</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
        {sections.map((section, idx) => (
          <div key={idx}>
            <p className="px-3 text-xs font-semibold text-ink-light uppercase tracking-wider mb-3">
              {section.title}
            </p>
            <div className="space-y-1">
              {section.items.map((item, i) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={i}
                    to={item.path}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                      active 
                        ? 'bg-primary-50 text-primary-600 font-medium shadow-sm border border-primary-100/50' 
                        : 'text-ink-secondary hover:bg-white/60 hover:text-ink'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-5 h-5 ${active ? 'text-primary-500' : 'text-ink-muted group-hover:text-primary-400 transition-colors'}`} />
                      <span className="text-sm">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.badge === 'New' 
                          ? 'bg-accent-orange-light text-accent-orange' 
                          : 'bg-primary-100 text-primary-700'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
