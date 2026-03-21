import InfoPageLayout from '../../components/InfoPageLayout';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const posts = [
  { date: 'Mar 18, 2026', category: 'AI & ML', title: 'How Gemini AI Transforms Corporate Onboarding', excerpt: 'Explore how AdaptLearn leverages Google\'s Gemini API to parse resumes, match skills to job requirements, and generate hyper-personalized learning roadmaps in seconds.', readTime: '5 min' },
  { date: 'Mar 12, 2026', category: 'Product Update', title: 'Introducing the HR Employee Progress Dashboard', excerpt: 'We\'ve launched a powerful new analytics dashboard for HR managers featuring radar charts, performance tracking, and real-time skill development metrics.', readTime: '4 min' },
  { date: 'Mar 5, 2026', category: 'Best Practices', title: 'Building Effective Skill Gap Reports', excerpt: 'Learn how to use AdaptLearn\'s skill gap analysis to identify team weaknesses, design targeted training programs, and measure competency growth over time.', readTime: '6 min' },
  { date: 'Feb 28, 2026', category: 'Engineering', title: 'From Resume to Roadmap: The Technical Pipeline', excerpt: 'A deep dive into how AdaptLearn processes PDF resumes, extracts structured skill data, and generates multi-level learning paths with curated resources.', readTime: '8 min' },
  { date: 'Feb 20, 2026', category: 'Enterprise', title: 'Why Adaptive Onboarding Reduces Time-to-Competency by 45%', excerpt: 'Case data from 500+ enterprises shows that personalized onboarding paths significantly outperform one-size-fits-all training programs.', readTime: '5 min' },
  { date: 'Feb 14, 2026', category: 'Feature Spotlight', title: 'Quiz-Driven Learning: Test, Learn, Improve', excerpt: 'How our MCQ-based quiz system dynamically adjusts skill gap reports and learning recommendations based on employee performance.', readTime: '4 min' },
];

const categoryColors = {
  'AI & ML': 'bg-primary-50 text-primary-700',
  'Product Update': 'bg-accent-green-light text-accent-green',
  'Best Practices': 'bg-accent-orange-light text-accent-orange',
  'Engineering': 'bg-gray-100 text-ink-secondary',
  'Enterprise': 'bg-primary-100 text-primary-700',
  'Feature Spotlight': 'bg-red-50 text-red-600',
};

export default function BlogPage() {
  return (
    <InfoPageLayout title="Blog" subtitle="Insights on AI-powered onboarding, adaptive learning, and building high-performing teams.">
      <div className="space-y-5">
        {posts.map((post, i) => (
          <div key={i} className="glass-effect rounded-2xl p-6 bg-white/50 border border-white/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-ink-muted'}`}>{post.category}</span>
              <span className="flex items-center gap-1 text-xs text-ink-muted"><Calendar className="w-3 h-3" /> {post.date}</span>
              <span className="flex items-center gap-1 text-xs text-ink-muted"><Clock className="w-3 h-3" /> {post.readTime} read</span>
            </div>
            <h3 className="font-semibold text-ink text-lg mb-2 group-hover:text-primary-600 transition-colors">{post.title}</h3>
            <p className="text-ink-secondary text-sm leading-relaxed mb-3">{post.excerpt}</p>
            <span className="text-xs font-semibold text-primary-600 flex items-center gap-1 group-hover:gap-2 transition-all">Read More <ArrowRight className="w-3.5 h-3.5" /></span>
          </div>
        ))}
      </div>
    </InfoPageLayout>
  );
}
