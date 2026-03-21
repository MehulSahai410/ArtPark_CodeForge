import InfoPageLayout from '../../components/InfoPageLayout';
import { Cookie, ToggleLeft, Settings } from 'lucide-react';

const cookieTypes = [
  { name: 'Essential Cookies', required: true, desc: 'Required for the platform to function. These cookies manage your authentication session, store your role preference (Employee/HR), and maintain your current state within the application. They cannot be disabled.' },
  { name: 'Analytics Cookies', required: false, desc: 'Help us understand how users interact with AdaptLearn. We track page visits, feature usage patterns, and quiz completion rates to improve the platform experience. Data is anonymized.' },
  { name: 'Functional Cookies', required: false, desc: 'Remember your preferences such as dashboard layout settings, search filters, and notification preferences. Disabling these will reset your preferences on each visit.' },
  { name: 'Performance Cookies', required: false, desc: 'Monitor platform performance including page load times, API response latency, and rendering metrics. This data helps us optimize the user experience for all users.' },
];

export default function CookiePolicyPage() {
  return (
    <InfoPageLayout title="Cookie Policy" subtitle="Learn how AdaptLearn uses cookies and similar technologies to provide and improve your experience.">
      <div className="space-y-8">
        <div className="glass-effect rounded-2xl p-6 bg-white/50 border border-white/60 shadow-sm">
          <p className="text-xs text-ink-muted mb-4">Last updated: March 21, 2026</p>
          <p className="text-ink-secondary text-sm leading-relaxed">AdaptLearn uses cookies and localStorage to provide essential functionality, remember your preferences, and analyze platform usage. This policy explains what data we store, why, and how you can manage your preferences.</p>
        </div>

        <div>
          <h2 className="font-serif font-bold text-xl text-ink mb-4">Types of Cookies We Use</h2>
          <div className="space-y-4">
            {cookieTypes.map((c, i) => (
              <div key={i} className="glass-effect rounded-2xl p-6 bg-white/50 border border-white/60 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0 mt-0.5">
                  <Cookie className="w-5 h-5 text-primary-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-ink text-base">{c.name}</h3>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${c.required ? 'bg-accent-green-light text-accent-green' : 'bg-accent-orange-light text-accent-orange'}`}>
                      {c.required ? 'Required' : 'Optional'}
                    </span>
                  </div>
                  <p className="text-ink-secondary text-sm leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-effect rounded-2xl p-6 bg-white/50 border border-white/60 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <Settings className="w-5 h-5 text-primary-600" />
            <h2 className="font-serif font-bold text-xl text-ink">Managing Your Cookies</h2>
          </div>
          <p className="text-ink-secondary text-sm leading-relaxed">You can manage cookies through your browser settings. Note that disabling essential cookies will prevent the platform from functioning properly. AdaptLearn primarily uses localStorage for client-side data, which can be cleared via your browser's developer tools or by logging out of your account.</p>
        </div>
      </div>
    </InfoPageLayout>
  );
}
