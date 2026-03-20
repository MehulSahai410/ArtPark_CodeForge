import { Brain, Target, Route, BarChart3 } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI Resume Parsing',
    description: 'Upload a resume and our AI instantly extracts skills, experience, and certifications to build a complete learner profile.',
    gradient: 'from-primary-500/10 to-accent-purple-light',
    iconBg: 'bg-primary-500',
  },
  {
    icon: Target,
    title: 'Adaptive Assessments',
    description: 'Diagnostic quizzes that adjust difficulty in real-time, accurately pinpointing skill gaps without wasting time on known concepts.',
    gradient: 'from-accent-orange/10 to-accent-orange-light/50',
    iconBg: 'bg-accent-orange',
  },
  {
    icon: Route,
    title: 'Dynamic Pathways',
    description: 'AI generates a personalized learning journey — skipping mastered topics and prioritizing areas that need the most attention.',
    gradient: 'from-accent-green/10 to-accent-green-light',
    iconBg: 'bg-accent-green',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Analytics',
    description: 'HR teams and managers get live dashboards tracking progress, bottleneck modules, and time-to-competency per hire.',
    gradient: 'from-primary-400/10 to-primary-100',
    iconBg: 'bg-primary-600',
  },
]

export default function FeatureGrid() {
  return (
    <section id="features" className="relative py-28 section-padding">
      {/* Subtle background blob */}
      <div className="gradient-blob w-[400px] h-[400px] bg-accent-orange-light top-0 right-20 opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-600 bg-primary-50 rounded-full mb-4">
            Features
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-ink leading-tight">
            Powering the future of<br />corporate onboarding
          </h2>
          <p className="mt-5 text-ink-secondary text-lg leading-relaxed">
            From resume parsing to personalized learning paths — everything your team needs to onboard faster and smarter.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group relative bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-white/50 shadow-sm
                hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 transition-all duration-500`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-12 h-12 ${feature.iconBg} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="font-serif text-2xl font-bold text-ink mb-3">
                  {feature.title}
                </h3>
                <p className="text-ink-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
