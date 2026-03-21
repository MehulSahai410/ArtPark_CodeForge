import Sidebar from '../components/dashboard/Sidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import MetricCard from '../components/dashboard/MetricCard';
import FeaturedModule from '../components/dashboard/FeaturedModule';
import SkillGapCard from '../components/dashboard/SkillGapCard';
import { mockAuth, getAnalysis } from '../mockAuth';
import { useNavigate } from 'react-router-dom';

export default function EmployeeDashboardPage() {
  const navigate = useNavigate();
  const user = mockAuth.getUser();
  const analysis = getAnalysis();

  // Build dynamic metrics from new Gemini AI analysis data if available
  const skillReport = analysis?.skill_gap_report || {};
  const skillEntries = Object.entries(skillReport);
  
  const matchedCount = analysis?.matched_skills?.length || 0;
  const missingCount = analysis?.missing_skills?.length || 0;
  const totalSkills = matchedCount + missingCount;
  const readiness = totalSkills > 0 ? Math.round((matchedCount / totalSkills) * 100) : 78;
  const totalModules = analysis?.modules?.length || 0;

  const metrics = [
    { title: 'Readiness Score', value: `${readiness}%`, change: '+5%', changeText: 'this week', trend: 'up' },
    { title: 'Modules Generated', value: `${totalModules}`, change: `${missingCount}`, changeText: 'gaps found', trend: missingCount > 2 ? 'down' : 'neutral' },
    { title: 'Skills Matched', value: `${matchedCount}`, change: 'AI', changeText: 'analyzed', trend: 'up' },
    { title: 'Blocking Gaps', value: `${missingCount}`, change: missingCount > 2 ? 'Critical' : 'Low', changeText: '', trend: missingCount > 2 ? 'down' : 'up' },
  ];

  // Build featured module from the updated `modules` schema
  const firstModule = analysis?.modules?.[0];
  const secondModule = analysis?.modules?.[1];

  const featuredModule = {
    title: firstModule?.title || 'Advanced React Patterns',
    description: analysis?.summary || firstModule?.notes || 'Master higher-order components, render props, and custom hooks to build scalable frontend architectures.',
    status: 'In Progress',
    duration: '45 mins left',
    progress: 65,
    modulesLeft: totalModules > 1 ? totalModules - 1 : 3,
    link: firstModule?.youtube_link || '#' // if the UI wants to use it later
  };

  const secondaryModule = {
    title: secondModule?.title || 'State Management with Redux Toolkit'
  };

  // Build skill gaps from skill_gap_report schema
  const skillGaps = analysis 
    ? skillEntries.map(([name, status]) => {
        let progress = 50;
        if (status === 'Strong') progress = 90;
        else if (status === 'Moderate') progress = 50;
        else if (status === 'Missing') progress = 10;
        return { name, status, progress };
      })
    : [
        { name: 'React Hooks Deep Dive', status: 'Strong', progress: 90 },
        { name: 'System Architecture', status: 'Partial', progress: 50 },
        { name: 'GraphQL Integration', status: 'Missing', progress: 10 },
        { name: 'Performance Optimization', status: 'Partial', progress: 40 },
      ];

  const handleLogout = () => {
    mockAuth.logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-surface flex">
      <Sidebar />
      <main className="flex-1 lg:pl-64 flex flex-col min-w-0 relative overflow-x-hidden min-h-screen">
        {/* Decorative background blooms inherited from LandingPage */}
        <div className="gradient-blob w-[500px] h-[500px] bg-accent-orange-light top-0 -left-20 animate-pulse-soft absolute pointer-events-none" />
        <div className="gradient-blob w-[600px] h-[600px] bg-primary-200 bottom-0 -right-20 animate-pulse-soft absolute pointer-events-none" style={{ animationDelay: '2s' }} />
        
        <div className="flex-1 p-6 md:p-10 z-10 relative">
          
          {/* Logout button */}
          <button 
            onClick={handleLogout} 
            className="absolute top-2 right-6 text-[11px] font-mono text-ink-muted/50 hover:text-red-500 transition-colors z-50"
          >
            [Logout]
          </button>

          <div className="max-w-6xl mx-auto space-y-8">
            <DashboardHeader userName={user?.email?.split('@')[0] || 'Alex'} day={14} />
            
            {/* Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              {metrics.map((metric, i) => (
                <MetricCard key={i} {...metric} />
              ))}
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-xl font-serif font-bold text-ink mb-2">Today's Focus</h3>
                <FeaturedModule module={featuredModule} secondaryModule={secondaryModule} />
              </div>
              <div className="xl:col-span-1 space-y-6 animate-fade-in-up flex flex-col" style={{ animationDelay: '0.3s' }}>
                {/* Visual alignment header for the grid */}
                <h3 className="text-xl font-serif font-bold text-ink mb-2 invisible xl:visible">Analysis</h3>
                <SkillGapCard skills={skillGaps} />
              </div>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}
