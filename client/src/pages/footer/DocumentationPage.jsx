import InfoPageLayout from '../../components/InfoPageLayout';
import { BookOpen, Upload, Brain, BarChart3, Shield, Zap } from 'lucide-react';

const sections = [
  { icon: Upload, title: '1. Upload Documents', desc: 'Employees upload their resume (PDF) and the HR-provided job description. Our parser extracts key skills, technologies, and experience levels automatically.' },
  { icon: Brain, title: '2. AI Analysis', desc: 'AdaptLearn sends the extracted data to the Gemini API, which performs skill matching, gap identification, and generates a comprehensive learning plan tailored to the role.' },
  { icon: BookOpen, title: '3. Personalized Roadmap', desc: 'A multi-level learning roadmap (Beginner → Intermediate → Advanced) is generated with curated modules, YouTube tutorials, and documentation resources.' },
  { icon: BarChart3, title: '4. Skill Gap Report', desc: 'A real-time skill gap analysis is presented showing matched skills, missing competencies, and proficiency levels with actionable improvement recommendations.' },
  { icon: Zap, title: '5. Quizzes & Validation', desc: 'Interactive MCQ-based quizzes test knowledge at the end of each module. Scores directly update the skill gap report, enabling dynamic progress tracking.' },
  { icon: Shield, title: '6. HR Dashboard', desc: 'HR managers get a dedicated dashboard to manage employee accounts, track learning progress with visual analytics, and monitor team-wide skill development.' },
];

export default function DocumentationPage() {
  return (
    <InfoPageLayout title="Documentation" subtitle="Everything you need to understand, deploy, and get the most out of the AdaptLearn platform.">
      <div className="space-y-10">
        <div className="glass-effect rounded-2xl p-6 bg-white/50 border border-white/60 shadow-sm">
          <h2 className="font-serif font-bold text-xl text-ink mb-3">Getting Started</h2>
          <p className="text-ink-secondary text-sm leading-relaxed mb-4">AdaptLearn is an AI-powered adaptive onboarding platform designed to create personalized learning journeys for every employee. Here's how the system works end-to-end:</p>
        </div>

        <div className="space-y-4">
          {sections.map((s, i) => (
            <div key={i} className="glass-effect rounded-2xl p-6 bg-white/50 border border-white/60 shadow-sm hover:shadow-md transition-all duration-300 flex gap-5 items-start">
              <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                <s.icon className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-ink text-base mb-1">{s.title}</h3>
                <p className="text-ink-secondary text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-effect rounded-2xl p-6 bg-white/50 border border-white/60 shadow-sm">
          <h2 className="font-serif font-bold text-xl text-ink mb-3">Technology Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['React 18', 'Vite', 'Tailwind CSS', 'Recharts', 'Gemini API', 'Node.js', 'Lucide Icons', 'React Router'].map((tech, i) => (
              <div key={i} className="text-center py-3 px-4 rounded-xl bg-primary-50/50 border border-primary-100/50 text-sm font-medium text-primary-700">{tech}</div>
            ))}
          </div>
        </div>
      </div>
    </InfoPageLayout>
  );
}
