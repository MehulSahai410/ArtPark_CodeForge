import { Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SkillGapCard({ skills }) {
  const getStatusColor = (status) => {
    switch(status) {
      case 'Strong': return 'bg-accent-green-light text-accent-green';
      case 'Partial': return 'bg-accent-orange-light text-accent-orange';
      case 'Missing': return 'bg-red-50 text-red-500';
      default: return 'bg-gray-100 text-ink-muted';
    }
  };

  const getProgressColor = (status) => {
    switch(status) {
      case 'Strong': return 'bg-accent-green';
      case 'Partial': return 'bg-accent-orange';
      case 'Missing': return 'bg-red-400';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="glass-effect rounded-[24px] p-8 mt-2 xl:mt-0 lg:ml-0 shadow-[0_8px_32px_rgba(0,0,0,0.04)] bg-white/50 border border-white/60 h-full flex flex-col relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-48 h-48 bg-accent-purple-light rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="flex items-start justify-between mb-8 relative z-10">
        <div>
          <h3 className="font-serif font-bold text-xl text-ink">Skill Gap Snapshot</h3>
          <p className="text-sm text-ink-muted mt-1">Based on target role profile</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white/80 shadow-sm border border-white flex items-center justify-center shrink-0">
          <Target className="w-6 h-6 text-primary-500" />
        </div>
      </div>

      <div className="flex-1 space-y-6 relative z-10 w-full overflow-hidden">
        {skills.map((skill, i) => (
          <div key={i} className="group/item">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-ink group-hover/item:text-primary-600 transition-colors truncate pr-2">{skill.name}</span>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg shrink-0 ${getStatusColor(skill.status)}`}>
                {skill.status}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-full bg-white/60 rounded-full overflow-hidden border border-gray-100">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${getProgressColor(skill.status)}`}
                  style={{ width: `${skill.progress}%` }}
                ></div>
              </div>
              <span className="text-xs font-bold text-ink-medium w-9 text-right shrink-0">{skill.progress}%</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100/60 relative z-10">
        <Link to="/dashboard/skill-gap" className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center justify-center gap-2 group/link">
          View Full Analysis
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
