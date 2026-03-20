import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Brain } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Pricing', href: '#pricing' },
  ]

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl transition-all duration-500 rounded-full ${
        scrolled
          ? 'glass-effect shadow-lg shadow-black/5'
          : 'bg-white/40 backdrop-blur-md border border-white/30'
      }`}
    >
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-ink rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="font-serif font-bold text-xl text-ink tracking-tight">
            AdaptLearn
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-ink/70 hover:text-ink rounded-full transition-all duration-200 hover:bg-black/5"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="btn-primary !px-6 !py-2.5 text-sm"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-full hover:bg-black/5 transition-colors"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden px-6 pb-5 pt-1 animate-slide-up">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-sm font-medium text-ink/70 hover:text-ink rounded-xl hover:bg-black/5 transition-all"
              >
                {link.label}
              </a>
            ))}
            <hr className="my-2 border-gray-200/50" />
            <Link to="/login" className="btn-primary text-center mt-1">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
