import { ArrowLeft, Brain, AlertCircle } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function SignupPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      // 1. SignUp
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw new Error(authError.message);

      if (authData.user) {
        // 2. Insert HR role into profiles
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{ id: authData.user.id, email: email, role: 'hr' }]);

        if (profileError) {
          throw new Error('Verification sent, but assigning HR role failed. Contact support.');
        } else {
          // Typically auth state listener in App.jsx catches this, but if email confirm is required
          // we should alert the user to check email.
          // Assuming email confirms are OFF for easy onboarding flow for now:
        }
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

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

          <form className="space-y-5" onSubmit={handleSignup}>
            
            {errorMsg && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-xl text-sm font-medium animate-fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {errorMsg}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-sm font-medium text-ink/80 ml-1 block" htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 placeholder:text-gray-400"
                placeholder="••••••••"
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full btn-primary !py-3.5 !rounded-2xl mt-4 transition-all duration-300 ${loading ? 'opacity-70 cursor-wait' : ''}`}
            >
              {loading ? 'Creating...' : 'Create Account'}
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
