import { ArrowLeft, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

export default function InfoPageLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-surface overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl transition-all duration-500 rounded-full glass-effect shadow-lg shadow-black/5">
        <div className="flex items-center justify-between px-6 py-3">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-ink rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif font-bold text-xl text-ink tracking-tight">AdaptLearn</span>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-sm font-medium text-ink/60 hover:text-ink transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="gradient-blob w-[500px] h-[500px] bg-accent-orange-light top-0 -right-40 animate-pulse-soft" />
        <div className="gradient-blob w-[400px] h-[400px] bg-primary-200 bottom-0 -left-40 animate-pulse-soft" style={{ animationDelay: '2s' }} />
        <div className="relative z-10 max-w-4xl mx-auto text-center section-padding animate-fade-in-up">
          <h1 className="font-serif font-bold text-4xl md:text-5xl text-ink mb-4">{title}</h1>
          <p className="text-ink-secondary text-lg max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
        </div>
      </section>

      {/* Content */}
      <section className="relative pb-20">
        <div className="relative z-10 max-w-4xl mx-auto section-padding animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          {children}
        </div>
      </section>

      <Footer />
    </div>
  );
}
