import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CTABanner() {
  return (
    <section id="pricing" className="relative py-28 section-padding">
      <div className="max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-4xl bg-ink p-12 md:p-20 text-center">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute w-[300px] h-[300px] bg-primary-500/20 rounded-full -top-20 -left-20 blur-[80px]" />
            <div className="absolute w-[300px] h-[300px] bg-accent-orange/20 rounded-full -bottom-20 -right-20 blur-[80px]" />
            <div className="absolute w-[200px] h-[200px] bg-accent-purple/15 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[60px]" />
          </div>

          <div className="relative z-10">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Build the future of
              <br />
              onboarding with
              <br />
              <span className="bg-gradient-to-r from-accent-orange via-primary-400 to-accent-purple bg-clip-text text-transparent">
                AdaptLearn
              </span>
            </h2>

            <p className="mt-6 text-lg text-white/60 max-w-xl mx-auto">
              Join 500+ enterprises already transforming how they onboard talent. Start your free trial today.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-white text-ink px-8 py-4 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-white/20 hover:-translate-y-0.5"
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white px-8 py-4 rounded-full font-medium border border-white/20 hover:border-white/40 transition-all duration-300"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
