import InfoPageLayout from '../../components/InfoPageLayout';
import { Shield, Lock, Eye, Server, AlertTriangle, CheckCircle2 } from 'lucide-react';

const practices = [
  { icon: Lock, title: 'Data Encryption', desc: 'All data in transit is encrypted using TLS 1.3. API calls to the Gemini AI service use secure HTTPS connections. Sensitive credentials are never stored in plaintext.' },
  { icon: Server, title: 'Infrastructure Security', desc: 'Our infrastructure runs on enterprise-grade cloud providers with SOC 2 compliance. We use containerized deployments with automated security patching and regular vulnerability scanning.' },
  { icon: Eye, title: 'Access Controls', desc: 'Role-based access control (RBAC) ensures employees can only access their own data. HR managers can view team progress but cannot access individual quiz answers or uploaded documents.' },
  { icon: Shield, title: 'API Key Protection', desc: 'Gemini API keys are stored securely in environment variables and never exposed in client-side code. Rate limiting and key rotation policies prevent unauthorized API usage.' },
  { icon: AlertTriangle, title: 'Incident Response', desc: 'We maintain a 24/7 incident response plan. In the event of a security incident, affected users are notified within 72 hours with details of the breach and remediation steps taken.' },
  { icon: CheckCircle2, title: 'Regular Audits', desc: 'We conduct quarterly security audits, annual penetration testing, and continuous automated vulnerability scanning across our entire codebase and infrastructure.' },
];

const certifications = [
  'SOC 2 Type II Compliant',
  'GDPR Compliant',
  'ISO 27001 Aligned',
  'OWASP Top 10 Protected',
  'Regular Pen Testing',
  'Bug Bounty Program',
];

export default function SecurityPage() {
  return (
    <InfoPageLayout title="Security" subtitle="How AdaptLearn protects your data, maintains compliance, and ensures platform integrity.">
      <div className="space-y-10">
        {/* Certifications */}
        <div className="glass-effect rounded-2xl p-6 bg-white/50 border border-white/60 shadow-sm">
          <h2 className="font-serif font-bold text-xl text-ink mb-4">Certifications & Compliance</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {certifications.map((c, i) => (
              <div key={i} className="flex items-center gap-2 py-3 px-4 rounded-xl bg-accent-green-light/50 border border-accent-green/10">
                <CheckCircle2 className="w-4 h-4 text-accent-green shrink-0" />
                <span className="text-sm font-medium text-ink">{c}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Security Practices */}
        <div>
          <h2 className="font-serif font-bold text-xl text-ink mb-5">Our Security Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {practices.map((p, i) => (
              <div key={i} className="glass-effect rounded-2xl p-6 bg-white/50 border border-white/60 shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                  <p.icon className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="font-semibold text-ink text-base mb-2">{p.title}</h3>
                <p className="text-ink-secondary text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Report */}
        <div className="glass-effect rounded-3xl p-8 bg-white/50 border border-white/60 shadow-sm text-center">
          <Shield className="w-10 h-10 text-primary-500 mx-auto mb-4" />
          <h2 className="font-serif font-bold text-xl text-ink mb-3">Report a Vulnerability</h2>
          <p className="text-ink-secondary text-sm mb-6 max-w-lg mx-auto">Found a security issue? We take all reports seriously and respond within 24 hours. Responsible disclosure is rewarded through our bug bounty program.</p>
          <a href="mailto:security@adaptlearn.ai" className="btn-primary inline-flex items-center gap-2">Report Issue</a>
        </div>
      </div>
    </InfoPageLayout>
  );
}
