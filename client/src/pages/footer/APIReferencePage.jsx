import InfoPageLayout from '../../components/InfoPageLayout';
import { Code, Key, Globe, Zap } from 'lucide-react';

const endpoints = [
  { method: 'POST', path: '/api/analyze', desc: 'Submit resume and job description for AI-powered skill analysis. Returns roadmap, modules, skill gap report, and recommended resources.' },
  { method: 'GET', path: '/api/employees', desc: 'Retrieve list of all managed employees with their status, roles, and onboarding progress.' },
  { method: 'POST', path: '/api/employees', desc: 'Create a new employee account with auto-generated credentials. Returns user ID and temporary password.' },
  { method: 'PATCH', path: '/api/employees/:id', desc: 'Update employee status (active/removed), role, or profile information.' },
  { method: 'GET', path: '/api/progress/:id', desc: 'Fetch learning progress data for a specific employee including module completion, quiz scores, and skill levels.' },
  { method: 'POST', path: '/api/quiz/submit', desc: 'Submit quiz answers for grading. Returns score, skill status updates, and updated gap report.' },
];

const methodColors = {
  GET: 'bg-accent-green-light text-accent-green',
  POST: 'bg-primary-50 text-primary-700',
  PATCH: 'bg-accent-orange-light text-accent-orange',
  DELETE: 'bg-red-50 text-red-600',
};

export default function APIReferencePage() {
  return (
    <InfoPageLayout title="API Reference" subtitle="Integrate AdaptLearn's AI-powered learning engine directly into your existing HR systems and workflows.">
      <div className="space-y-8">
        {/* Auth Section */}
        <div className="glass-effect rounded-2xl p-6 bg-white/50 border border-white/60 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center"><Key className="w-5 h-5 text-primary-600" /></div>
            <h2 className="font-serif font-bold text-xl text-ink">Authentication</h2>
          </div>
          <p className="text-ink-secondary text-sm leading-relaxed mb-4">All API requests require a valid API key passed in the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">Authorization</code> header:</p>
          <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-green-400 overflow-x-auto">
            Authorization: Bearer YOUR_API_KEY
          </div>
        </div>

        {/* Base URL */}
        <div className="glass-effect rounded-2xl p-6 bg-white/50 border border-white/60 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-accent-green-light flex items-center justify-center"><Globe className="w-5 h-5 text-accent-green" /></div>
            <h2 className="font-serif font-bold text-xl text-ink">Base URL</h2>
          </div>
          <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-blue-400">
            https://api.adaptlearn.ai/v1
          </div>
        </div>

        {/* Endpoints */}
        <div>
          <h2 className="font-serif font-bold text-xl text-ink mb-4">Endpoints</h2>
          <div className="space-y-3">
            {endpoints.map((ep, i) => (
              <div key={i} className="glass-effect rounded-2xl p-5 bg-white/50 border border-white/60 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${methodColors[ep.method]}`}>{ep.method}</span>
                  <code className="text-sm font-mono font-semibold text-ink">{ep.path}</code>
                </div>
                <p className="text-ink-secondary text-sm leading-relaxed">{ep.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Rate Limits */}
        <div className="glass-effect rounded-2xl p-6 bg-white/50 border border-white/60 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-accent-orange-light flex items-center justify-center"><Zap className="w-5 h-5 text-accent-orange" /></div>
            <h2 className="font-serif font-bold text-xl text-ink">Rate Limits</h2>
          </div>
          <p className="text-ink-secondary text-sm leading-relaxed">Standard plans: <strong>100 requests/min</strong>. Enterprise plans: <strong>Unlimited</strong> with dedicated infrastructure. Contact sales for custom rate limits.</p>
        </div>
      </div>
    </InfoPageLayout>
  );
}
