import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20">
      {/* Gradient blobs */}
      <div className="gradient-blob w-[500px] h-[500px] bg-accent-orange-light top-20 -right-40 animate-pulse-soft" />
      <div className="gradient-blob w-[600px] h-[600px] bg-primary-200 -bottom-20 -left-40 animate-pulse-soft" style={{ animationDelay: '2s' }} />
      <div className="gradient-blob w-[300px] h-[300px] bg-accent-purple-light top-40 left-1/3 animate-pulse-soft" style={{ animationDelay: '4s' }} />

      <div className="relative z-10 max-w-5xl mx-auto text-center section-padding">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/50 shadow-sm mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-primary-500" />
          <span className="text-xs font-semibold text-ink/70 tracking-wide uppercase">
            AI-Powered Onboarding Platform
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-serif font-bold text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-ink leading-[1.05] tracking-tight animate-fade-in-up">
          Smarter onboarding,
          <br />
          <span className="relative">
            personalized
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
              <path d="M2 8 C50 2, 100 2, 150 6 S250 10, 298 4" stroke="url(#grad)" strokeWidth="3" strokeLinecap="round" />
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF9F43" />
                  <stop offset="100%" stopColor="#6366F1" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          {' '}for all
        </h1>

        {/* Subtext */}
        <p className="mt-8 text-lg md:text-xl text-ink-secondary max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Our AI engine parses each hire's resume and skills, then dynamically builds
          an optimized learning pathway — so every employee reaches competency faster.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Link to="/login" className="btn-primary inline-flex items-center gap-2 text-base">
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a href="#how-it-works" className="btn-secondary inline-flex items-center gap-2 text-base">
            See How It Works
          </a>
        </div>

        {/* Trust line */}
        <p className="mt-12 text-sm text-ink-muted animate-fade-in" style={{ animationDelay: '0.6s' }}>
          Trusted by <span className="font-semibold text-ink/70">500+</span> enterprises worldwide
        </p>

        {/* Company logos */}
        <div className="mt-6 flex items-center justify-center gap-8 md:gap-12 opacity-40 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          {['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix'].map((name) => (
            <span key={name} className="text-sm md:text-base font-bold text-ink/50 tracking-wider uppercase">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
