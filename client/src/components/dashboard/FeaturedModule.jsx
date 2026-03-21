import { PlayCircle, Clock } from 'lucide-react';

export default function FeaturedModule({ module, secondaryModule }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="glass-effect rounded-[24px] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)] bg-white/50 border border-white/60 relative overflow-hidden group hover:shadow-lg transition-shadow duration-300">
        {/* Decorative Blob inherited from landing page styles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 group-hover:opacity-70 transition-opacity"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-accent-orange-light text-accent-orange">
              {module.status}
            </span>
            <span className="flex items-center gap-1 text-xs font-medium text-ink-muted">
              <Clock className="w-3.5 h-3.5" />
              {module.duration}
            </span>
          </div>
          
          <h2 className="font-serif font-bold text-2xl text-ink mb-2">{module.title}</h2>
          <p className="text-sm text-ink-secondary leading-relaxed mb-8 max-w-md">
            {module.description}
          </p>

          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-semibold text-ink mb-2">
              <span>{module.progress}% Complete</span>
              <span>{module.modulesLeft} lessons left</span>
            </div>
            <div className="h-2 w-full bg-white/60 rounded-full overflow-hidden border border-gray-100">
              <div 
                className="h-full bg-primary-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${module.progress}%` }}
              ></div>
            </div>
          </div>

          <button className="btn-primary flex items-center gap-2">
            <PlayCircle className="w-5 h-5" />
            Continue Module
          </button>
        </div>
      </div>

      {secondaryModule && (
        <div className="glass-effect rounded-[20px] p-5 shadow-[0_8px_32px_rgba(0,0,0,0.02)] bg-white/40 border border-white/60 flex items-center justify-between hover:bg-white/60 hover:-translate-y-0.5 transition-all cursor-pointer group">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted mb-1 block">Up Next</span>
            <h4 className="font-medium text-ink text-sm group-hover:text-primary-600 transition-colors">{secondaryModule.title}</h4>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-sm border border-white">
            <PlayCircle className="w-5 h-5 text-ink-muted group-hover:text-primary-500 transition-colors" />
          </div>
        </div>
      )}
    </div>
  );
}
