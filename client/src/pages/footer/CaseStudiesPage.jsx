import InfoPageLayout from '../../components/InfoPageLayout';
import { TrendingUp, Clock, Users, Quote } from 'lucide-react';

const studies = [
  {
    company: 'TechCorp Global',
    industry: 'Technology',
    metric: '45%',
    metricLabel: 'Faster Onboarding',
    challenge: 'TechCorp was spending an average of 12 weeks to onboard new software engineers, with inconsistent quality across teams and high early attrition.',
    solution: 'AdaptLearn analyzed each hire\'s resume and generated personalized roadmaps covering their skill gaps relative to the role. Engineers received targeted modules instead of a generic 3-month bootcamp.',
    result: 'Time-to-competency dropped from 12 weeks to 6.5 weeks. New hire retention improved by 28% in the first 90 days.',
    quote: 'AdaptLearn cut our onboarding from 3 months to 6 weeks while making new hires more effective.',
    quoteName: 'Sarah Chen, VP Engineering',
  },
  {
    company: 'FinanceFirst Ltd',
    industry: 'Financial Services',
    metric: '60%',
    metricLabel: 'Improved Skill Matching',
    challenge: 'HR was manually creating training plans that rarely aligned with actual skill gaps. Compliance-critical skills like SQL and data governance were being overlooked.',
    solution: 'AdaptLearn\'s Gemini AI analysis identified precise skill gaps from resumes and mapped them against regulatory requirements, generating compliant training paths automatically.',
    result: 'Skill-to-role match accuracy increased by 60%. Compliance audit pass rates improved from 72% to 96%.',
    quote: 'The AI-driven gap analysis caught skill deficiencies we were missing entirely with manual reviews.',
    quoteName: 'James Park, Chief HR Officer',
  },
  {
    company: 'HealthBridge Inc',
    industry: 'Healthcare IT',
    metric: '35%',
    metricLabel: 'Cost Reduction',
    challenge: 'Training costs were escalating with each new cohort. Generic courses had low engagement, and employees felt their learning wasn\'t relevant to their roles.',
    solution: 'AdaptLearn replaced blanket training with personalized module libraries. Each employee saw only the courses relevant to their skill gaps, with quiz validation ensuring engagement.',
    result: 'Training costs reduced by 35%. Module completion rates jumped from 42% to 89% due to relevance.',
    quote: 'Employees finally feel like their training is designed for them, not just a checkbox exercise.',
    quoteName: 'Dr. Maya Patel, L&D Director',
  },
];

export default function CaseStudiesPage() {
  return (
    <InfoPageLayout title="Case Studies" subtitle="Real results from real organizations using AdaptLearn to transform their employee onboarding.">
      <div className="space-y-8">
        {studies.map((study, i) => (
          <div key={i} className="glass-effect rounded-3xl p-8 bg-white/50 border border-white/60 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary-50 text-primary-700">{study.industry}</span>
              <h3 className="font-serif font-bold text-xl text-ink">{study.company}</h3>
            </div>

            <div className="glass-effect rounded-2xl p-5 bg-primary-50/50 border border-primary-100/30 flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
                <TrendingUp className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-primary-700">{study.metric}</p>
                <p className="text-xs text-primary-600 font-medium">{study.metricLabel}</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div><h4 className="text-xs font-bold text-ink-muted uppercase tracking-wider mb-1">Challenge</h4><p className="text-sm text-ink-secondary leading-relaxed">{study.challenge}</p></div>
              <div><h4 className="text-xs font-bold text-ink-muted uppercase tracking-wider mb-1">Solution</h4><p className="text-sm text-ink-secondary leading-relaxed">{study.solution}</p></div>
              <div><h4 className="text-xs font-bold text-ink-muted uppercase tracking-wider mb-1">Result</h4><p className="text-sm text-ink-secondary leading-relaxed">{study.result}</p></div>
            </div>

            <div className="border-t border-gray-100/60 pt-5 flex items-start gap-3">
              <Quote className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm italic text-ink leading-relaxed mb-1">"{study.quote}"</p>
                <p className="text-xs font-semibold text-ink-muted">— {study.quoteName}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </InfoPageLayout>
  );
}
