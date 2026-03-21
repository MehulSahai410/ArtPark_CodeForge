import { ArrowLeft, Brain, User, Briefcase, AlertCircle } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { mockAuth } from '../mockAuth'

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState(null)
  const navigate = useNavigate()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!selectedRole) {
      setErrorMsg("Please select a role to continue");
      return;
    }
    
    setErrorMsg('');
    setLoading(true);

    // Simulate a brief delay
    await new Promise(r => setTimeout(r, 500));

    mockAuth.login(email, selectedRole);
    
    if (selectedRole === 'employee') {
      navigate('/upload');
    } else {
      navigate('/hr-dashboard');
    }

    setLoading(false);
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

        {/* Login Card */}
        <div className="glass-effect rounded-[24px] p-8 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.04)] bg-white/50 border border-white/60">
          <div className="text-center mb-8">
            <h1 className="font-serif font-bold text-3xl text-ink mb-3 leading-tight">
              Welcome back to<br />smarter onboarding
            </h1>
            <p className="text-ink-secondary text-sm leading-relaxed">
              Continue your personalized learning journey powered by AI.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            
            {/* Role Selection */}
            <div className="space-y-3 mb-6 animate-fade-in">
              <p className="text-sm font-medium text-ink/80 text-center mb-1">Select your role to continue</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => { setSelectedRole('employee'); setErrorMsg(''); }}
                  className={`relative flex items-center justify-center gap-2.5 p-4 rounded-xl border transition-all duration-300 ease-in-out ${
                    selectedRole === 'employee'
                      ? 'bg-white border-primary-500 shadow-[0_4px_16px_rgba(99,102,241,0.15)] scale-[1.03] ring-1 ring-primary-500/50'
                      : 'bg-white/40 border-gray-200 hover:bg-white/80 hover:scale-[1.01]'
                  } ${selectedRole && selectedRole !== 'employee' ? 'opacity-50 grayscale-[30%]' : 'opacity-100'}`}
                >
                  <User className={`w-5 h-5 transition-colors duration-300 ${selectedRole === 'employee' ? 'text-primary-600' : 'text-ink/60'}`} />
                  <span className={`font-semibold text-sm transition-colors duration-300 ${selectedRole === 'employee' ? 'text-primary-700' : 'text-ink/80'}`}>Employee</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setSelectedRole('hr'); setErrorMsg(''); }}
                  className={`relative flex items-center justify-center gap-2.5 p-4 rounded-xl border transition-all duration-300 ease-in-out ${
                    selectedRole === 'hr'
                      ? 'bg-white border-primary-500 shadow-[0_4px_16px_rgba(99,102,241,0.15)] scale-[1.03] ring-1 ring-primary-500/50'
                      : 'bg-white/40 border-gray-200 hover:bg-white/80 hover:scale-[1.01]'
                  } ${selectedRole && selectedRole !== 'hr' ? 'opacity-50 grayscale-[30%]' : 'opacity-100'}`}
                >
                  <Briefcase className={`w-5 h-5 transition-colors duration-300 ${selectedRole === 'hr' ? 'text-primary-600' : 'text-ink/60'}`} />
                  <span className={`font-semibold text-sm transition-colors duration-300 ${selectedRole === 'hr' ? 'text-primary-700' : 'text-ink/80'}`}>HR</span>
                </button>
              </div>
            </div>

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
              <div className="flex items-center justify-between ml-1 mb-1">
                <label className="text-sm font-medium text-ink/80 block" htmlFor="password">Password</label>
                <a href="#" className="text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors">Forgot Password?</a>
              </div>
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

            <div className="flex items-center ml-1">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500/50" />
              <label htmlFor="remember" className="ml-2 text-sm text-ink/70">Remember me</label>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full btn-primary !py-3.5 !rounded-2xl mt-4 transition-all duration-300 ${(!selectedRole || loading) ? 'opacity-80 hover:-translate-y-0 hover:shadow-none cursor-not-allowed' : ''}`}
            >
              {loading ? 'Authenticating...' : 'Log In'}
            </button>

            {/* Conditional Signup Link for HR */}
            <div className={`mt-6 text-center transition-all duration-500 overflow-hidden ${selectedRole === 'hr' ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0 m-0 p-0'}`}>
              <p className="text-sm text-ink/70">
                Don't have an account? <Link to="/signup" className="font-semibold text-primary-600 hover:text-primary-700 transition-colors">Create Account</Link>
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
