import Sidebar from '../components/dashboard/Sidebar';
import { getAnalysis } from '../mockAuth';
import { Search, Clock, Star, ChevronRight, BookOpen } from 'lucide-react';
import { useState } from 'react';

const DEFAULT_MODULES = [
  { title: 'Data Structures in Java', description: 'Arrays, LinkedLists, Trees, HashMaps with real-world use cases.', tags: ['Java', 'DSA'], duration: '4 hrs', difficulty: 'Intermediate', rating: 4.8, enrolled: true },
  { title: 'REST API Design', description: 'Build production-grade RESTful services following best practices.', tags: ['API', 'Backend'], duration: '3 hrs', difficulty: 'Intermediate', rating: 4.7, enrolled: false },
  { title: 'Microservices Architecture', description: 'Design patterns, service mesh, and inter-service communication.', tags: ['Architecture', 'Cloud'], duration: '5 hrs', difficulty: 'Advanced', rating: 4.9, enrolled: false },
  { title: 'SQL Optimization', description: 'Query tuning, indexing strategies, and execution plan analysis.', tags: ['SQL', 'Database'], duration: '2.5 hrs', difficulty: 'Intermediate', rating: 4.5, enrolled: false },
  { title: 'AWS Fundamentals', description: 'EC2, S3, Lambda, IAM and cloud architecture essentials.', tags: ['AWS', 'Cloud'], duration: '6 hrs', difficulty: 'Beginner', rating: 4.6, enrolled: false },
  { title: 'Docker & Kubernetes', description: 'Containerization, orchestration, deployments, and scaling.', tags: ['DevOps', 'Docker'], duration: '5 hrs', difficulty: 'Advanced', rating: 4.8, enrolled: false },
  { title: 'React Performance', description: 'Memoization, code splitting, lazy loading, and profiling.', tags: ['React', 'Frontend'], duration: '3 hrs', difficulty: 'Advanced', rating: 4.7, enrolled: true },
  { title: 'System Design Basics', description: 'Scalability, load balancing, caching, and database sharding.', tags: ['System Design'], duration: '4 hrs', difficulty: 'Intermediate', rating: 4.9, enrolled: false },
  { title: 'Git & CI/CD Pipelines', description: 'Branching strategies, GitHub Actions, and deployment automation.', tags: ['DevOps', 'Git'], duration: '2 hrs', difficulty: 'Beginner', rating: 4.4, enrolled: false },
  { title: 'TypeScript Mastery', description: 'Advanced types, generics, decorators, and type-safe patterns.', tags: ['TypeScript', 'Frontend'], duration: '3.5 hrs', difficulty: 'Intermediate', rating: 4.6, enrolled: false },
];

const difficultyColor = {
  Beginner: 'bg-accent-green-light text-accent-green',
  Intermediate: 'bg-accent-orange-light text-accent-orange',
  Advanced: 'bg-red-50 text-red-600',
};

export default function ModuleLibraryPage() {
  const analysis = getAnalysis();
  const [search, setSearch] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('All');

  // Merge AI modules with defaults
  const aiModules = (analysis?.modules || []).map(m => ({
    title: m.title,
    description: m.notes || '',
    tags: [],
    duration: '3 hrs',
    difficulty: 'Intermediate',
    rating: 4.7,
    enrolled: false,
    youtube_link: m.youtube_link,
    resources: m.resources,
  }));

  const allModules = [...aiModules, ...DEFAULT_MODULES].filter(
    (m, i, arr) => arr.findIndex(x => x.title === m.title) === i
  );

  const filtered = allModules.filter(m => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase()) || m.description.toLowerCase().includes(search.toLowerCase());
    const matchDiff = filterDifficulty === 'All' || m.difficulty === filterDifficulty;
    return matchSearch && matchDiff;
  });

  return (
    <div className="min-h-screen bg-surface flex">
      <Sidebar />
      <main className="flex-1 lg:pl-64 flex flex-col min-w-0 relative overflow-x-hidden min-h-screen">
        <div className="gradient-blob w-[500px] h-[500px] bg-accent-orange-light top-0 -left-20 animate-pulse-soft absolute pointer-events-none" />
        <div className="gradient-blob w-[600px] h-[600px] bg-primary-200 bottom-0 -right-20 animate-pulse-soft absolute pointer-events-none" style={{ animationDelay: '2s' }} />

        <div className="flex-1 p-6 md:p-10 z-10 relative">
          <div className="max-w-6xl mx-auto space-y-8">

            {/* Header */}
            <div className="animate-fade-in-up">
              <h1 className="font-serif font-bold text-3xl md:text-4xl text-ink mb-2">Module Library</h1>
              <p className="text-ink-secondary text-base">Browse and enroll in learning modules</p>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
                <input
                  type="text"
                  placeholder="Search modules..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 text-sm"
                />
              </div>
              <select
                value={filterDifficulty}
                onChange={e => setFilterDifficulty(e.target.value)}
                className="px-4 py-3 rounded-2xl border border-gray-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-sm text-ink"
              >
                <option value="All">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Module Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((mod, idx) => (
                <div
                  key={idx}
                  className="glass-effect rounded-xl p-6 bg-white/50 border border-white/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col animate-fade-in-up"
                  style={{ animationDelay: `${0.05 + idx * 0.05}s` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                      <BookOpen className="w-5 h-5 text-primary-600" />
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${difficultyColor[mod.difficulty] || difficultyColor.Intermediate}`}>
                      {mod.difficulty}
                    </span>
                  </div>
                  <h3 className="font-semibold text-ink text-base mb-1.5">{mod.title}</h3>
                  <p className="text-ink-muted text-xs leading-relaxed mb-3 flex-1">{mod.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {mod.tags.map((t, i) => (
                      <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-primary-50 text-primary-700">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-ink-muted mb-4">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {mod.duration}</span>
                    <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-yellow-500" /> {mod.rating}</span>
                  </div>
                  <button className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    mod.enrolled
                      ? 'bg-primary-50 text-primary-700 hover:bg-primary-100'
                      : 'btn-primary !text-xs !py-2.5 !rounded-xl'
                  }`}>
                    {mod.enrolled ? 'Continue' : 'Enroll'}
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
