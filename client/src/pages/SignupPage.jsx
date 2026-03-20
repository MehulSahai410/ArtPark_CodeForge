import { ArrowLeft, Brain } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignupPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-surface">
      {/* Background blobs to match the landing page theme */}
      <div className="gradient-blob w-[500px] h-[500px] bg-accent-orange-light top-0 -left-20 animate-pulse-soft" />
      <div className="gradient-blob w-[600px] h-[600px] bg-primary-200 bottom-0 -right-20 animate-pulse-soft" style={{ animationDelay: '2s' }} />
      <div className="gradient-blob w-[300px] h-[300px] bg-accent-purple-light top-1/4 right-1/4 animate-pulse-soft" style={{ animationDelay: '4s' }} />

      {/* Back button */}
      <Link to="/" className="absolute top-6 left-6 md:top-10 md:left-10 z-50 flex items-center gap-2 text-sm font-medium text-ink/60 hover:text-ink transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="relative z-10 w-full max-w-md px-6 animate-fade-in-up">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 bg-ink rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="font-serif font-bold text-2xl text-ink tracking-tight">
              AdaptLearn
            </span>
          </Link>
        </div>

        {/* Signup Card */}
        <div className="glass-effect rounded-[24px] p-8 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.04)] bg-white/50 border border-white/60">
          <div className="text-center mb-8">
            <h1 className="font-serif font-bold text-3xl text-ink mb-3 leading-tight">
              Create your HR account
            </h1>
            <p className="text-ink-secondary text-sm leading-relaxed">
              Manage onboarding and personalize learning for your team
            </p>
          </div>

          <form className="space-y-5" onSubmit={(e) => {
            e.preventDefault();
            // Redirect to dashboard mock
            navigate('/dashboard');
          }}>
            <div className="space-y-1">
              <label className="text-sm font-medium text-ink/80 ml-1 block" htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 placeholder:text-gray-400"
                placeholder="name@company.com"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-ink/80 block ml-1" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 placeholder:text-gray-400"
                placeholder="••••••••"
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full btn-primary !py-3.5 !rounded-2xl mt-4 transition-all duration-300"
            >
              Create Account
            </button>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-ink/70">
                Already have an account? <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-700 transition-colors">Log In</Link>
              </p>
            </div>
          </form>
        </div>

        {/* Project Specific Enhancements */}
        <div className="mt-8 text-center space-y-2 pb-10">
          <p className="text-[13px] text-ink-muted">
            Your learning path is personalized using AI insights
          </p>
        </div>

      </div>
    </div>
  )
}
