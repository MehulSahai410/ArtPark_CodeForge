import InfoPageLayout from '../../components/InfoPageLayout';
import { Handshake, Globe, Zap, ArrowRight } from 'lucide-react';

const partners = [
  { name: 'Google Cloud', type: 'Technology Partner', desc: 'Powered by Google\'s Gemini AI for advanced skill analysis, natural language processing, and intelligent learning path generation.' },
  { name: 'LinkedIn Learning', type: 'Content Partner', desc: 'Access to 16,000+ professional courses integrated directly into personalized learning roadmaps for comprehensive skill development.' },
  { name: 'Coursera for Business', type: 'Content Partner', desc: 'University-grade certifications and specializations mapped to skill gaps for employees pursuing advanced competencies.' },
  { name: 'Workday', type: 'Integration Partner', desc: 'Seamless HRIS integration allowing automatic employee data sync, progress tracking, and compliance reporting within Workday.' },
  { name: 'Slack', type: 'Integration Partner', desc: 'Real-time notifications for learning milestones, quiz results, and onboarding progress delivered directly to team channels.' },
  { name: 'Microsoft Teams', type: 'Integration Partner', desc: 'In-app learning reminders, skill gap alerts, and manager notifications embedded within the Teams collaboration environment.' },
];

const partnerTypes = {
  'Technology Partner': 'bg-primary-50 text-primary-700',
  'Content Partner': 'bg-accent-green-light text-accent-green',
  'Integration Partner': 'bg-accent-orange-light text-accent-orange',
};

export default function PartnersPage() {
  return (
    <InfoPageLayout title="Partners" subtitle="We collaborate with industry leaders to deliver the most comprehensive AI-powered onboarding experience.">
      <div className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {partners.map((p, i) => (
            <div key={i} className="glass-effect rounded-2xl p-6 bg-white/50 border border-white/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg font-bold text-ink">{p.name.charAt(0)}</div>
                <div>
                  <h3 className="font-semibold text-ink text-base group-hover:text-primary-600 transition-colors">{p.name}</h3>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${partnerTypes[p.type]}`}>{p.type}</span>
                </div>
              </div>
              <p className="text-ink-secondary text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="glass-effect rounded-3xl p-10 bg-white/50 border border-white/60 shadow-sm text-center">
          <Handshake className="w-10 h-10 text-primary-500 mx-auto mb-4" />
          <h2 className="font-serif font-bold text-2xl text-ink mb-3">Become a Partner</h2>
          <p className="text-ink-secondary text-sm mb-6 max-w-lg mx-auto">Interested in integrating with AdaptLearn or becoming a content partner? We'd love to explore how we can grow together.</p>
          <a href="mailto:partners@adaptlearn.ai" className="btn-primary inline-flex items-center gap-2">Partner With Us <ArrowRight className="w-4 h-4" /></a>
        </div>
      </div>
    </InfoPageLayout>
  );
}
