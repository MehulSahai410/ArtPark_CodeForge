import InfoPageLayout from '../../components/InfoPageLayout';
import { Brain, Target, Users, Sparkles, Globe } from 'lucide-react';

const values = [
  { icon: Brain, title: 'AI-First Approach', desc: 'We believe every employee deserves a learning journey tailored to their unique skills, background, and career goals — powered by cutting-edge AI.' },
  { icon: Target, title: 'Measurable Outcomes', desc: 'Every feature we build is designed to produce quantifiable results: faster onboarding, higher retention, and demonstrable skill growth.' },
  { icon: Users, title: 'People-Centered Design', desc: 'Technology should serve humans, not the other way around. Our platform is built for simplicity, accessibility, and real-world usability.' },
  { icon: Sparkles, title: 'Continuous Innovation', desc: 'The learning landscape evolves rapidly. We continuously integrate the latest AI models, pedagogical research, and industry best practices.' },
];

const team = [
  { name: 'Mehul Sahai', role: 'Founder & CEO', desc: 'Visionary leader driving the mission to make onboarding smarter with AI technology.' },
  { name: 'Krishna Lanjiwar', role: 'Lead Engineer', desc: 'Full-stack engineer building the core platform architecture and AI integration pipeline.' },
  { name: 'Praddh', role: 'Frontend Architect', desc: 'Crafting the premium user experience and design system that powers the AdaptLearn interface.' },
];

export default function AboutUsPage() {
  return (
    <InfoPageLayout title="About Us" subtitle="We're on a mission to make corporate onboarding personalized, intelligent, and genuinely effective.">
      <div className="space-y-12">
        {/* Story */}
        <div className="glass-effect rounded-3xl p-8 bg-white/50 border border-white/60 shadow-sm">
          <h2 className="font-serif font-bold text-2xl text-ink mb-4">Our Story</h2>
          <div className="space-y-3 text-sm text-ink-secondary leading-relaxed">
            <p>AdaptLearn was born from a simple frustration: why does every new hire go through the same generic training program regardless of their existing expertise? A senior React developer shouldn't sit through basic HTML tutorials, and a cloud architect shouldn't start with "What is a server?"</p>
            <p>We built AdaptLearn to solve this. By leveraging Google's Gemini AI, we analyze each employee's resume and match it against their target role to create a truly personalized learning roadmap — from day one.</p>
            <p>Today, AdaptLearn serves organizations ranging from startups to Fortune 500 companies, helping them reduce time-to-competency by up to 45% while improving employee satisfaction with the onboarding experience.</p>
          </div>
        </div>

        {/* Values */}
        <div>
          <h2 className="font-serif font-bold text-2xl text-ink mb-5">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <div key={i} className="glass-effect rounded-2xl p-6 bg-white/50 border border-white/60 shadow-sm group hover:shadow-md transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                  <v.icon className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="font-semibold text-ink text-base mb-2">{v.title}</h3>
                <p className="text-ink-secondary text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <h2 className="font-serif font-bold text-2xl text-ink mb-5">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {team.map((t, i) => (
              <div key={i} className="glass-effect rounded-2xl p-6 bg-white/50 border border-white/60 shadow-sm text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-2xl font-bold text-primary-700 mx-auto mb-4">{t.name.charAt(0)}</div>
                <h3 className="font-semibold text-ink text-base mb-0.5">{t.name}</h3>
                <p className="text-xs font-medium text-primary-600 mb-2">{t.role}</p>
                <p className="text-ink-muted text-xs leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </InfoPageLayout>
  );
}
