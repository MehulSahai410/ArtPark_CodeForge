import InfoPageLayout from '../../components/InfoPageLayout';
import { MapPin, Briefcase, Zap, Heart } from 'lucide-react';

const positions = [
  { title: 'Senior AI/ML Engineer', team: 'AI Platform', location: 'Remote', type: 'Full-time', desc: 'Design and optimize the Gemini API integration pipeline. Build intelligent skill extraction, gap analysis, and adaptive learning algorithms.' },
  { title: 'Full-Stack Developer', team: 'Product Engineering', location: 'Bangalore, India', type: 'Full-time', desc: 'Build and maintain the React + Node.js platform. Work on dashboard analytics, quiz systems, and the employee management module.' },
  { title: 'Product Designer', team: 'Design', location: 'Remote', type: 'Full-time', desc: 'Create beautiful, intuitive interfaces for HR managers and employees. Own the design system, component library, and user research.' },
  { title: 'DevOps Engineer', team: 'Infrastructure', location: 'Remote', type: 'Contract', desc: 'Manage cloud infrastructure, CI/CD pipelines, and deployment automation. Ensure 99.9% uptime and performance at scale.' },
  { title: 'Customer Success Manager', team: 'Growth', location: 'New York, USA', type: 'Full-time', desc: 'Guide enterprise clients through onboarding, drive product adoption, and gather feedback to shape the product roadmap.' },
];

const perks = [
  'Flexible remote work policy',
  'Learning budget ($2,000/year)',
  'Health & wellness coverage',
  'Stock options for early team',
  'Unlimited PTO policy',
  '4-day work week pilot',
];

export default function CareersPage() {
  return (
    <InfoPageLayout title="Careers" subtitle="Join us in building the future of AI-powered employee onboarding. We're growing fast and looking for passionate people.">
      <div className="space-y-10">
        {/* Perks */}
        <div className="glass-effect rounded-3xl p-8 bg-white/50 border border-white/60 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <Heart className="w-5 h-5 text-red-500" />
            <h2 className="font-serif font-bold text-xl text-ink">Why AdaptLearn?</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {perks.map((p, i) => (
              <div key={i} className="bg-primary-50/50 border border-primary-100/30 rounded-xl py-3 px-4 text-sm font-medium text-primary-700 text-center">{p}</div>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div>
          <h2 className="font-serif font-bold text-2xl text-ink mb-5">Open Positions</h2>
          <div className="space-y-4">
            {positions.map((pos, i) => (
              <div key={i} className="glass-effect rounded-2xl p-6 bg-white/50 border border-white/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="font-semibold text-ink text-lg group-hover:text-primary-600 transition-colors">{pos.title}</h3>
                </div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary-50 text-primary-700">{pos.team}</span>
                  <span className="flex items-center gap-1 text-xs text-ink-muted"><MapPin className="w-3 h-3" /> {pos.location}</span>
                  <span className="flex items-center gap-1 text-xs text-ink-muted"><Briefcase className="w-3 h-3" /> {pos.type}</span>
                </div>
                <p className="text-ink-secondary text-sm leading-relaxed mb-4">{pos.desc}</p>
                <a href="mailto:careers@adaptlearn.ai" className="text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors">Apply Now →</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </InfoPageLayout>
  );
}
