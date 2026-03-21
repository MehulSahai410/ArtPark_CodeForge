import Sidebar from '../components/dashboard/Sidebar';
import { getAnalysis } from '../mockAuth';
import { Target, CheckCircle2, XCircle, AlertTriangle, Lightbulb } from 'lucide-react';

export default function SkillGapReportPage() {
  const analysis = getAnalysis();

  const matched = analysis?.matched_skills || ['Java', 'React', 'REST APIs'];
  const missing = analysis?.missing_skills || ['System Design', 'Docker', 'AWS', 'Redis'];
  const summary = analysis?.summary || 'Candidate has strong backend fundamentals but lacks scalability and cloud knowledge.';
  const skillReport = analysis?.skill_gap_report || { Java: 'Strong', React: 'Strong', SQL: 'Moderate', 'System Design': 'Missing', Docker: 'Missing', AWS: 'Missing' };
  const totalSkills = matched.length + missing.length;
  const matchPct = totalSkills > 0 ? Math.round((matched.length / totalSkills) * 100) : 72;

  const readinessLabel = matchPct >= 80 ? 'Advanced' : matchPct >= 50 ? 'Intermediate' : 'Beginner';
  const readinessColor = matchPct >= 80 ? 'text-accent-green' : matchPct >= 50 ? 'text-accent-orange' : 'text-red-500';

  const suggestions = [
    'Focus on System Design fundamentals — start with caching and load balancing.',
    'Build a containerized project with Docker to solidify DevOps skills.',
    'Take an AWS Cloud Practitioner course to establish cloud foundations.',
    'Practice designing scalable REST APIs with rate limiting.',
    'Study distributed databases and eventual consistency patterns.',
  ];

  const statusColor = { Strong: 'bg-accent-green-light text-accent-green', Moderate: 'bg-accent-orange-light text-accent-orange', Missing: 'bg-red-50 text-red-600' };

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
              <h1 className="font-serif font-bold text-3xl md:text-4xl text-ink mb-2">Skill Gap Report</h1>
              <p className="text-ink-secondary text-base">AI-based analysis against your target role</p>
            </div>

            {/* Overall Match Score */}
            <div className="glass-effect rounded-2xl p-8 bg-white/50 border border-white/60 shadow-sm flex flex-col md:flex-row items-center gap-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="relative w-36 h-36 shrink-0">
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                  <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth="10" strokeDasharray={`${(matchPct / 100) * 327} 327`} strokeLinecap="round" className="text-primary-500 transition-all duration-1000" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-ink">{matchPct}%</span>
                  <span className="text-xs text-ink-muted">Match</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-ink text-lg mb-1">Overall Readiness</h3>
                <p className={`text-sm font-bold ${readinessColor} mb-2`}>{readinessLabel} Level</p>
                <p className="text-ink-muted text-sm leading-relaxed max-w-md">{summary}</p>
              </div>
            </div>

            {/* Matched & Missing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Matched Skills */}
              <div className="glass-effect rounded-xl p-6 bg-white/50 border border-white/60 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-accent-green" />
                  <h3 className="font-semibold text-ink">Matched Skills</h3>
                  <span className="ml-auto text-xs font-bold bg-accent-green-light text-accent-green px-2 py-0.5 rounded-full">{matched.length}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {matched.map((s, i) => (
                    <span key={i} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-accent-green-light text-accent-green">{s}</span>
                  ))}
                </div>
              </div>
              {/* Missing Skills */}
              <div className="glass-effect rounded-xl p-6 bg-white/50 border border-white/60 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="w-5 h-5 text-red-500" />
                  <h3 className="font-semibold text-ink">Missing Skills</h3>
                  <span className="ml-auto text-xs font-bold bg-red-50 text-red-600 px-2 py-0.5 rounded-full">{missing.length}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {missing.map((s, i) => (
                    <span key={i} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-red-50 text-red-600">{s}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Detailed Skill Breakdown */}
            <div className="glass-effect rounded-xl p-6 bg-white/50 border border-white/60 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h3 className="font-semibold text-ink mb-4 flex items-center gap-2"><Target className="w-5 h-5 text-primary-600" /> Detailed Breakdown</h3>
              <div className="space-y-3">
                {Object.entries(skillReport).map(([skill, level], idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-sm font-medium text-ink">{skill}</span>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${statusColor[level] || 'bg-gray-100 text-ink-muted'}`}>{level}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Improvement Suggestions */}
            <div className="glass-effect rounded-xl p-6 bg-white/50 border border-white/60 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
              <h3 className="font-semibold text-ink mb-4 flex items-center gap-2"><Lightbulb className="w-5 h-5 text-accent-orange" /> Improvement Suggestions</h3>
              <ul className="space-y-3">
                {suggestions.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-ink-secondary">
                    <AlertTriangle className="w-4 h-4 text-accent-orange mt-0.5 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
