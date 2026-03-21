import InfoPageLayout from '../../components/InfoPageLayout';
import { Mail, MapPin, Phone, MessageSquare, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <InfoPageLayout title="Contact Us" subtitle="Have questions about AdaptLearn? We'd love to hear from you. Reach out and our team will respond within 24 hours.">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { icon: Mail, label: 'Email', value: 'hello@adaptlearn.ai', href: 'mailto:hello@adaptlearn.ai' },
          { icon: Phone, label: 'Phone', value: '+91 80-XXXX-XXXX', href: 'tel:+918000000000' },
          { icon: MapPin, label: 'Office', value: 'Bangalore, India', href: '#' },
        ].map((c, i) => (
          <a key={i} href={c.href} className="glass-effect rounded-2xl p-6 bg-white/50 border border-white/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 text-center group">
            <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mx-auto mb-3">
              <c.icon className="w-5 h-5 text-primary-600" />
            </div>
            <p className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-1">{c.label}</p>
            <p className="text-sm font-medium text-ink group-hover:text-primary-600 transition-colors">{c.value}</p>
          </a>
        ))}
      </div>

      <div className="glass-effect rounded-3xl p-8 bg-white/50 border border-white/60 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <MessageSquare className="w-5 h-5 text-primary-600" />
          <h2 className="font-serif font-bold text-xl text-ink">Send us a message</h2>
        </div>

        {submitted ? (
          <div className="text-center py-10 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-accent-green-light flex items-center justify-center mx-auto mb-4">
              <Send className="w-7 h-7 text-accent-green" />
            </div>
            <h3 className="font-semibold text-ink text-lg mb-2">Message Sent!</h3>
            <p className="text-ink-secondary text-sm">Thank you for reaching out. We'll get back to you within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-1.5 block">Full Name</label>
                <input type="text" required placeholder="John Doe" className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-1.5 block">Email</label>
                <input type="email" required placeholder="john@company.com" className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 text-sm" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-1.5 block">Subject</label>
              <input type="text" required placeholder="How can we help?" className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 text-sm" />
            </div>
            <div>
              <label className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-1.5 block">Message</label>
              <textarea rows={4} required placeholder="Tell us about your project..." className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 text-sm resize-none" />
            </div>
            <button type="submit" className="btn-primary !rounded-2xl !py-3.5 w-full md:w-auto !px-10">Send Message</button>
          </form>
        )}
      </div>
    </InfoPageLayout>
  );
}
