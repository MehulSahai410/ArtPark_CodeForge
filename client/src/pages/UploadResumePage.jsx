import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import UploadCard from '../components/UploadCard';

export default function UploadResumePage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center overflow-x-hidden bg-surface py-20 px-6">
      {/* Background blobs to match the landing page theme */}
      <div className="gradient-blob w-[500px] h-[500px] bg-accent-orange-light top-0 -left-20 animate-pulse-soft" />
      <div className="gradient-blob w-[600px] h-[600px] bg-primary-200 bottom-0 -right-20 animate-pulse-soft" style={{ animationDelay: '2s' }} />
      <div className="gradient-blob w-[300px] h-[300px] bg-accent-purple-light top-1/4 right-1/4 animate-pulse-soft" style={{ animationDelay: '4s' }} />

      {/* Back button */}
      <div className="w-full max-w-3xl mx-auto mb-8 relative z-10 animate-fade-in flex">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-ink/60 hover:text-ink transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="relative z-10 w-full max-w-3xl">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="font-serif font-bold text-4xl md:text-5xl text-ink mb-4 leading-tight">
            UPLOAD DOCUMENTS
          </h1>
          <p className="text-ink-secondary text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            Upload your resume and the target job description to see how well you match.
          </p>
        </div>

        {/* Section 1: Resume */}
        <UploadCard
          title="Resume"
          dropText="Drag & Drop your Resume"
          writeText="Write your resume"
        />

        {/* Section 2: Job Description */}
        <UploadCard
          title="Job Description"
          dropText="Drag & Drop your Job Description"
          writeText="Write your job description"
        />

        {/* Action Button */}
        <div className="mt-10 flex justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <button 
            onClick={() => navigate('/dashboard')}
            className="btn-primary !px-12 !py-4 !text-base !rounded-2xl w-full md:w-auto min-w-[200px]"
          >
            Analyze Documents
          </button>
        </div>

      </div>
    </div>
  );
}
