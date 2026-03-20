import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    quote: 'AdaptLearn cut our onboarding time by 60%. New engineers are productive from week one instead of month two. The AI pathway is genuinely transformative.',
    author: 'Priya Sharma',
    role: 'VP of Engineering',
    company: 'TechCorp Global',
    avatar: 'PS',
  },
  {
    quote: 'We used to have a one-size-fits-all training program. Now every hire gets a customized journey. HR workload dropped dramatically while satisfaction scores went up.',
    author: 'Rajesh Mehta',
    role: 'Chief People Officer',
    company: 'InnovateFin',
    avatar: 'RM',
  },
  {
    quote: 'The adaptive assessments are brilliant. Senior hires skip basics they already know, while juniors get the foundational support they need. Everyone wins.',
    author: 'Ananya Reddy',
    role: 'L&D Director',
    company: 'CloudScale Systems',
    avatar: 'AR',
  },
  {
    quote: 'Real-time dashboards give me complete visibility into my team\'s progress. I can identify struggling hires early and provide targeted support before it\'s too late.',
    author: 'Vikram Singh',
    role: 'Engineering Manager',
    company: 'DataBridge AI',
    avatar: 'VS',
  },
]

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const next = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
      setIsTransitioning(false)
    }, 300)
  }

  const prev = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
      setIsTransitioning(false)
    }, 300)
  }

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [])

  const testimonial = testimonials[current]

  return (
    <section id="testimonials" className="relative py-28 section-padding">
      <div className="gradient-blob w-[400px] h-[400px] bg-accent-purple-light -right-20 top-20 opacity-20" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-600 bg-primary-50 rounded-full mb-4">
            Testimonials
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-ink">
            What our customers say
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="relative bg-white/60 backdrop-blur-sm rounded-4xl p-10 md:p-14 border border-white/50 shadow-xl shadow-black/5">
          {/* Quote Icon */}
          <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center mb-8">
            <Quote className="w-6 h-6 text-primary-500" />
          </div>

          {/* Quote Text */}
          <blockquote
            className={`font-serif text-2xl md:text-3xl text-ink leading-relaxed mb-10 transition-opacity duration-300 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          >
            "{testimonial.quote}"
          </blockquote>

          {/* Author */}
          <div className={`flex items-center gap-4 transition-opacity duration-300 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}>
            <div className="w-12 h-12 bg-ink rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {testimonial.avatar}
            </div>
            <div>
              <p className="font-semibold text-ink">{testimonial.author}</p>
              <p className="text-sm text-ink-secondary">
                {testimonial.role}, {testimonial.company}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="absolute bottom-10 right-10 md:right-14 flex items-center gap-3">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-surface hover:bg-primary-50 border border-gray-200 flex items-center justify-center transition-all duration-200 hover:scale-105"
            >
              <ChevronLeft className="w-4 h-4 text-ink" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-ink hover:bg-gray-800 flex items-center justify-center transition-all duration-200 hover:scale-105"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsTransitioning(true)
                setTimeout(() => {
                  setCurrent(index)
                  setIsTransitioning(false)
                }, 300)
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === current
                  ? 'w-8 bg-ink'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
