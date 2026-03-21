import InfoPageLayout from '../../components/InfoPageLayout';

const sections = [
  { title: '1. Information We Collect', content: 'We collect information you provide directly, including your name, email address, uploaded resumes, job descriptions, and quiz responses. We also collect usage data such as page visits, feature interactions, and learning progress metrics to improve our AI models and your experience.' },
  { title: '2. How We Use Your Information', content: 'Your data is used to: (a) power AI-driven skill analysis and personalized roadmap generation via the Gemini API, (b) track your learning progress and quiz performance, (c) provide HR managers with team analytics, (d) improve our algorithms and platform experience, and (e) communicate important updates about your account.' },
  { title: '3. Resume & Document Processing', content: 'Uploaded resumes and job descriptions are processed by our AI engine to extract skills, experience, and qualifications. This data is stored locally in your browser (localStorage) and is not transmitted to external servers beyond the Gemini API call. You can clear this data at any time by logging out.' },
  { title: '4. Data Sharing', content: 'We do not sell your personal information. Data may be shared with: (a) Google\'s Gemini API for AI processing (subject to Google\'s privacy policy), (b) your organization\'s HR administrators for learning progress tracking, and (c) service providers who assist in platform operations under strict confidentiality agreements.' },
  { title: '5. Data Security', content: 'We implement industry-standard security measures including encrypted data transmission (TLS 1.3), secure API key management, and regular security audits. Currently, employee data is stored client-side in localStorage for demonstration purposes; production deployments use encrypted database storage.' },
  { title: '6. Your Rights', content: 'You have the right to: (a) access all personal data we hold about you, (b) request correction of inaccurate data, (c) request deletion of your account and associated data, (d) export your learning progress and skill analysis data, and (e) opt out of non-essential data processing at any time.' },
  { title: '7. Contact Us', content: 'For privacy-related inquiries, contact our Data Protection Officer at privacy@adaptlearn.ai. We respond to all requests within 30 business days.' },
];

export default function PrivacyPolicyPage() {
  return (
    <InfoPageLayout title="Privacy Policy" subtitle="Your privacy matters. Here's how AdaptLearn collects, uses, and protects your personal information.">
      <div className="space-y-1">
        <p className="text-xs text-ink-muted mb-6">Last updated: March 21, 2026</p>
        {sections.map((s, i) => (
          <div key={i} className="glass-effect rounded-2xl p-6 bg-white/50 border border-white/60 shadow-sm mb-4">
            <h3 className="font-semibold text-ink text-base mb-2">{s.title}</h3>
            <p className="text-ink-secondary text-sm leading-relaxed">{s.content}</p>
          </div>
        ))}
      </div>
    </InfoPageLayout>
  );
}
