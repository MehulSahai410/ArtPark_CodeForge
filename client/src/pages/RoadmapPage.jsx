import Sidebar from '../components/dashboard/Sidebar';
import { getAnalysis } from '../mockAuth';
import { CheckCircle2, Clock, Lock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RoadmapPage() {
  const analysis = getAnalysis();

  const roadmapItems = analysis?.roadmap
    ? analysis.roadmap.flatMap((phase, phaseIdx) =>
        phase.topics.map((topic, topicIdx) => {
          const globalIdx = analysis.roadmap
            .slice(0, phaseIdx)
            .reduce((acc, p) => acc + p.topics.length, 0) + topicIdx;
          let status = 'Locked';
          let progress = 0;
          if (globalIdx === 0) { status = 'Completed'; progress = 100; }
          else if (globalIdx === 1) { status = 'In Progress'; progress = 65; }
          return {
            title: topic,
            level: phase.level,
            duration: `${25 + globalIdx * 10} mins`,
            status,
            progress
          };
        })
      )
    : [];

  const statusConfig = {
    Completed: { icon: CheckCircle2, color: 'text-accent-green', bg: 'bg-accent-green-light', badge: 'bg-accent-green-light text-accent-green' },
    'In Progress': { icon: Clock, color: 'text-primary-600', bg: 'bg-primary-50', badge: 'bg-accent-orange-light text-accent-orange' },
    Locked: { icon: Lock, color: 'text-ink-muted', bg: 'bg-gray-100', badge: 'bg-gray-100 text-ink-muted' },
  };

  const hasItems = roadmapItems && roadmapItems.length > 0;

  return (
    <div className="min-h-screen bg-surface flex">
      <Sidebar />
      <main className="flex-1 lg:pl-64 flex flex-col min-w-0 relative overflow-x-hidden min-h-screen">
        <div className="gradient-blob w-[500px] h-[500px] bg-accent-orange-light top-0 -left-20 animate-pulse-soft absolute pointer-events-none" />
        <div className="gradient-blob w-[600px] h-[600px] bg-primary-200 bottom-0 -right-20 animate-pulse-soft absolute pointer-events-none" style={{ animationDelay: '2s' }} />

        <div className="flex-1 p-6 md:p-10 z-10 relative">
          <div className="max-w-4xl mx-auto space-y-8">

            {/* Header */}
            <div className="animate-fade-in-up">
              <h1 className="font-serif font-bold text-3xl md:text-4xl text-ink mb-2">My Learning Roadmap</h1>
              <p className="text-ink-secondary text-base">Personalized plan based on your target role</p>
            </div>

            {hasItems ? (
              <>
                {/* 4-Week Plan Badge */}
                <div className="glass-effect rounded-2xl p-5 bg-white/50 border border-white/60 shadow-sm flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-ink text-sm">4-Week Structured Plan</p>
                    <p className="text-ink-muted text-xs">
                      {roadmapItems.filter(r => r.status === 'Completed').length} of {roadmapItems.length} modules completed
                    </p>
                  </div>
                  <div className="ml-auto">
                    <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary-500 rounded-full transition-all duration-700" 
                        style={{ width: `${Math.round((roadmapItems.filter(r => r.status === 'Completed').length / roadmapItems.length) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="relative space-y-0">
                  {roadmapItems.map((item, idx) => {
                    const cfg = statusConfig[item.status] || statusConfig.Locked;
                    const Icon = cfg.icon;
                    const isLast = idx === roadmapItems.length - 1;

                    return (
                      <div key={idx} className="relative flex gap-5 animate-fade-in-up" style={{ animationDelay: `${0.1 + idx * 0.07}s` }}>
                        {/* Timeline Line + Node */}
                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${cfg.bg} shrink-0 border-2 border-white shadow-sm z-10`}>
                            <Icon className={`w-5 h-5 ${cfg.color}`} />
                          </div>
                          {!isLast && <div className="w-0.5 flex-1 bg-gray-200 my-1" />}
                        </div>

                        {/* Card */}
                        <div className={`glass-effect rounded-xl p-5 bg-white/50 border border-white/60 shadow-sm flex-1 mb-4 ${item.status === 'Locked' ? 'opacity-60' : ''}`}>
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <h3 className="font-semibold text-ink text-base">{item.title}</h3>
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${cfg.badge}`}>{item.status}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-ink-muted mb-3">
                            <span className="bg-primary-50 text-primary-700 px-2 py-0.5 rounded-md font-medium">{item.level}</span>
                            <span>{item.duration}</span>
                          </div>
                          {item.status !== 'Locked' && (
                            <div className="flex items-center gap-3">
                              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-primary-500 rounded-full transition-all duration-700" style={{ width: `${item.progress}%` }} />
                              </div>
                              <span className="text-xs font-semibold text-ink-muted">{item.progress}%</span>
                            </div>
                          )}
                          {item.status === 'In Progress' && (
                            <button className="mt-3 text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors">
                              Continue <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="glass-effect rounded-2xl p-10 bg-white/50 border border-white/60 shadow-sm text-center animate-fade-in-up flex flex-col items-center justify-center min-h-[40vh]">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-5">
                  <Lock className="w-7 h-7 text-ink-muted/60" />
                </div>
                <h3 className="text-xl font-serif font-bold text-ink mb-3">No roadmap available</h3>
                <p className="text-ink-secondary text-sm max-w-sm mx-auto mb-8 leading-relaxed">
                  Please upload your resume and job description to generate a personalized learning journey powered by AI.
                </p>
                <Link to="/upload" className="btn-primary inline-flex items-center justify-center gap-2 text-sm !px-6 !py-3">
                  Upload Documents <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
