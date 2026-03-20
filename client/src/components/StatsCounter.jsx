import CountUp from 'react-countup'
import { useInView } from './hooks/useInView'
import { Users, Clock, Award, TrendingUp } from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: 50000,
    suffix: '+',
    label: 'Employees Onboarded',
    color: 'text-primary-500',
    bg: 'bg-primary-50',
  },
  {
    icon: Clock,
    value: 60,
    suffix: '%',
    label: 'Faster Ramp-Up Time',
    color: 'text-accent-orange',
    bg: 'bg-orange-50',
  },
  {
    icon: Award,
    value: 95,
    suffix: '%',
    label: 'Competency Pass Rate',
    color: 'text-accent-green',
    bg: 'bg-emerald-50',
  },
  {
    icon: TrendingUp,
    value: 500,
    suffix: '+',
    label: 'Enterprise Clients',
    color: 'text-primary-600',
    bg: 'bg-indigo-50',
  },
]

export default function StatsCounter() {
  const [ref, inView] = useInView({ threshold: 0.3 })

  return (
    <section className="relative py-24 section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Glassmorphic container */}
        <div className="glass-effect rounded-4xl p-10 md:p-14 shadow-xl shadow-black/5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                {/* Icon */}
                <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>

                {/* Counter */}
                <div className="font-serif text-4xl md:text-5xl font-bold text-ink mb-2">
                  {inView ? (
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      separator=","
                      suffix={stat.suffix}
                    />
                  ) : (
                    <span>0{stat.suffix}</span>
                  )}
                </div>

                {/* Label */}
                <p className="text-sm text-ink-secondary font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
