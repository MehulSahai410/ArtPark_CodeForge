import InfoPageLayout from '../../components/InfoPageLayout';
import { Building2, Shield, Zap, Users, BarChart3, HeadphonesIcon } from 'lucide-react';

const features = [
  { icon: Building2, title: 'Custom Deployments', desc: 'On-premise or private cloud deployment with full data sovereignty and compliance controls for regulated industries.' },
  { icon: Users, title: 'Unlimited Seats', desc: 'Scale to thousands of employees with no per-seat licensing. One flat rate covers your entire organization.' },
  { icon: Shield, title: 'SSO & SAML', desc: 'Enterprise-grade Single Sign-On integration with your existing identity providers — Okta, Azure AD, and more.' },
  { icon: BarChart3, title: 'Executive Dashboards', desc: 'C-suite analytics with organization-wide learning ROI metrics, skill heatmaps, and department-level insights.' },
  { icon: Zap, title: 'Priority API Access', desc: 'Dedicated API rate limits, custom webhook events, and direct integration with your HRIS and LMS platforms.' },
  { icon: HeadphonesIcon, title: 'Dedicated Support', desc: '24/7 dedicated customer success manager, priority ticket resolution, and quarterly business reviews.' },
];

export default function EnterprisePage() {
  return (
    <InfoPageLayout title="Enterprise" subtitle="Tailored AI-powered onboarding at scale for organizations of any size. Get the security, customization, and support your team deserves.">
      <div className="space-y-12">
        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div key={i} className="glass-effect rounded-2xl p-6 bg-white/50 border border-white/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
              <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-primary-600" />
              </div>
              <h3 className="font-semibold text-ink text-lg mb-2 group-hover:text-primary-600 transition-colors">{f.title}</h3>
              <p className="text-ink-secondary text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="glass-effect rounded-3xl p-10 bg-white/50 border border-white/60 shadow-sm text-center">
          <h2 className="font-serif font-bold text-2xl text-ink mb-3">Ready to transform your onboarding?</h2>
          <p className="text-ink-secondary text-sm mb-6 max-w-lg mx-auto">Contact our enterprise team for a personalized demo and custom pricing tailored to your organization's needs.</p>
          <a href="mailto:enterprise@adaptlearn.ai" className="btn-primary inline-flex items-center gap-2">Contact Sales</a>
        </div>
      </div>
    </InfoPageLayout>
  );
}
