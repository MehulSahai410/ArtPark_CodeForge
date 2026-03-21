import Sidebar from '../components/dashboard/Sidebar';
import { Zap, Code2, Server, Flame, Brain, Trophy, Clock, BookOpen, BarChart3 } from 'lucide-react';

const BADGES = [
  { title: 'Fast Learner', description: 'Completed 3 modules in one day', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-50', unlocked: '2024-03-12' },
  { title: 'React Specialist', description: 'Mastered all React modules', icon: Code2, color: 'text-blue-500', bg: 'bg-blue-50', unlocked: '2024-03-15' },
  { title: 'Backend Builder', description: 'Completed Java + SQL track', icon: Server, color: 'text-purple-500', bg: 'bg-purple-50', unlocked: '2024-03-18' },
  { title: '7-Day Streak', description: 'Logged in 7 days in a row', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50', unlocked: '2024-03-20' },
  { title: 'Problem Solver', description: 'Solved 10+ practice challenges', icon: Brain, color: 'text-primary-600', bg: 'bg-primary-50', unlocked: null },
  { title: 'Cloud Pioneer', description: 'Start the Cloud Fundamentals track', icon: Trophy, color: 'text-emerald-500', bg: 'bg-emerald-50', unlocked: null },
];

const STATS = [
  { title: 'Modules Completed', value: '12', icon: BookOpen, color: 'text-primary-600' },
  { title: 'Learning Hours', value: '34h', icon: Clock, color: 'text-accent-orange' },
  { title: 'Current Streak', value: '7 days', icon: Flame, color: 'text-orange-500' },
  { title: 'Skill Mastery', value: '72%', icon: BarChart3, color: 'text-accent-green' },
];

export default function AchievementsPage() {
  return (
    <div className="min-h-screen bg-surface flex">
      <Sidebar />
      <main className="flex-1 lg:pl-64 flex flex-col min-w-0 relative overflow-x-hidden min-h-screen">
        <div className="gradient-blob w-[500px] h-[500px] bg-accent-orange-light top-0 -left-20 animate-pulse-soft absolute pointer-events-none" />
        <div className="gradient-blob w-[600px] h-[600px] bg-primary-200 bottom-0 -right-20 animate-pulse-soft absolute pointer-events-none" style={{ animationDelay: '2s' }} />

        <div className="flex-1 p-6 md:p-10 z-10 relative">
          <div className="max-w-5xl mx-auto space-y-8">

            {/* Header */}
            <div className="animate-fade-in-up">
              <h1 className="font-serif font-bold text-3xl md:text-4xl text-ink mb-2">Achievements & Milestones</h1>
              <p className="text-ink-secondary text-base">Track your progress and unlock new badges</p>
            </div>

            {/* Progress Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              {STATS.map((stat, i) => (
                <div key={i} className="glass-effect rounded-xl p-5 bg-white/50 border border-white/60 shadow-sm text-center">
                  <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                  <p className="text-2xl font-bold text-ink">{stat.value}</p>
                  <p className="text-xs text-ink-muted mt-1">{stat.title}</p>
                </div>
              ))}
            </div>

            {/* Badges */}
            <div>
              <h3 className="font-serif font-bold text-xl text-ink mb-4">Badges Earned</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {BADGES.map((badge, idx) => {
                  const Icon = badge.icon;
                  const locked = !badge.unlocked;
                  return (
                    <div
                      key={idx}
                      className={`glass-effect rounded-xl p-6 bg-white/50 border border-white/60 shadow-sm transition-all duration-300 animate-fade-in-up ${
                        locked ? 'opacity-50 grayscale-[40%]' : 'hover:shadow-md hover:-translate-y-1'
                      }`}
                      style={{ animationDelay: `${0.1 + idx * 0.06}s` }}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl ${badge.bg} flex items-center justify-center shrink-0`}>
                          <Icon className={`w-6 h-6 ${badge.color}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-ink text-sm mb-0.5">{badge.title}</h4>
                          <p className="text-ink-muted text-xs leading-relaxed">{badge.description}</p>
                          {badge.unlocked ? (
                            <p className="text-[10px] text-accent-green font-semibold mt-2">Unlocked {badge.unlocked}</p>
                          ) : (
                            <p className="text-[10px] text-ink-muted font-semibold mt-2">🔒 Locked</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
