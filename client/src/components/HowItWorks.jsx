import { Upload, ClipboardCheck, Route, GraduationCap } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Upload Resume',
    description: 'New hire uploads their resume or CV. Our AI extracts skills, experience, and certifications in seconds.',
    accent: 'bg-primary-500',
    line: true,
  },
  {
    number: '02',
    icon: ClipboardCheck,
    title: 'Take Diagnostic Assessment',
    description: 'An adaptive quiz adjusts difficulty in real-time, accurately mapping the learner\'s current competency levels.',
    accent: 'bg-accent-orange',
    line: true,
  },
  {
    number: '03',
    icon: Route,
    title: 'Get Personalized Pathway',
    description: 'AI compares skills against role requirements and builds an optimized learning path — skipping what you already know.',
    accent: 'bg-accent-green',
    line: true,
  },
  {
    number: '04',
    icon: GraduationCap,
    title: 'Achieve Competency',
    description: 'Work through modules at your own pace. The path adapts as you progress. Earn certificates when you\'re ready.',
    accent: 'bg-primary-600',
    line: false,
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-28 section-padding">
      {/* Background */}
      <div className="gradient-blob w-[500px] h-[500px] bg-primary-200 bottom-10 -left-40 opacity-20" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-orange bg-surface-warm rounded-full mb-4">
            How It Works
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-ink leading-tight">
            Four steps to<br />smarter onboarding
          </h2>
          <p className="mt-5 text-ink-secondary text-lg">
            From upload to certification — the entire journey is AI-driven and personalized.
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="space-y-0">
          {steps.map((step, index) => (
            <div key={step.number} className="relative flex gap-6 md:gap-10">
              {/* Left: Number + Line */}
              <div className="flex flex-col items-center">
                <div className={`w-14 h-14 ${step.accent} rounded-2xl flex items-center justify-center shadow-lg shrink-0`}>
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                {step.line && (
                  <div className="w-0.5 h-full bg-gradient-to-b from-gray-200 to-transparent my-2 min-h-[60px]" />
                )}
              </div>

              {/* Right: Content Card */}
              <div className={`pb-12 ${!step.line ? 'pb-0' : ''}`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold tracking-widest text-ink-muted uppercase">
                    Step {step.number}
                  </span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-ink mb-3">
                  {step.title}
                </h3>
                <p className="text-ink-secondary text-base md:text-lg leading-relaxed max-w-lg">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
