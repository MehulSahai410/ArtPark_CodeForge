import { Bell, User } from 'lucide-react';

export default function DashboardHeader({ userName, day }) {
  return (
    <header className="w-full flex items-center justify-between py-6 animate-fade-in-up">
      <div>
        <h1 className="font-serif font-bold text-3xl text-ink mb-1">Home Dashboard</h1>
        <p className="text-ink-secondary text-sm">
          Welcome back, <span className="font-medium text-ink">{userName}</span> · Day {day} of onboarding
        </p>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2.5 rounded-full glass-effect bg-white/40 border-white/60 text-ink-secondary hover:text-ink hover:bg-white/60 transition-colors relative shadow-sm">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-accent-orange border-2 border-white"></span>
        </button>
        <button className="flex items-center gap-2 p-1.5 pr-4 rounded-full glass-effect bg-white/40 border-white/60 hover:bg-white/60 transition-colors shadow-sm">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white shadow-sm">
            <User className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium text-ink hidden sm:block">{userName}</span>
        </button>
      </div>
    </header>
  );
}
