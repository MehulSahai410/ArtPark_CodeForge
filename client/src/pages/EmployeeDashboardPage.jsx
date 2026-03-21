import Sidebar from '../components/dashboard/Sidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import MetricCard from '../components/dashboard/MetricCard';
import FeaturedModule from '../components/dashboard/FeaturedModule';
import SkillGapCard from '../components/dashboard/SkillGapCard';
import { supabase } from '../supabaseClient';
import { useState } from 'react';

export default function EmployeeDashboardPage() {
  const metrics = [
    { title: 'Readiness Score', value: '78%', change: '+5%', changeText: 'this week', trend: 'up' },
    { title: 'Modules Completed', value: '12', change: '6', changeText: 'remaining', trend: 'neutral' },
    { title: 'Time to Close Gaps', value: '3 weeks', change: '-1 week', changeText: 'faster', trend: 'up' },
    { title: 'Blocking Gaps', value: '2', change: 'Critical', changeText: '', trend: 'down' },
  ];

  const featuredModule = {
    title: 'Advanced React Patterns',
    description: 'Master higher-order components, render props, and custom hooks to build scalable frontend architectures.',
    status: 'In Progress',
    duration: '45 mins left',
    progress: 65,
    modulesLeft: 3
  };

  const secondaryModule = {
    title: 'State Management with Redux Toolkit'
  };

  const skillGaps = [
    { name: 'React Hooks Deep Dive', status: 'Strong', progress: 90 },
    { name: 'System Architecture', status: 'Partial', progress: 50 },
    { name: 'GraphQL Integration', status: 'Missing', progress: 10 },
    { name: 'Performance Optimization', status: 'Partial', progress: 40 },
  ];

  const handleCreateTestEmployee = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return alert("Not logged in");
    
    // Check if user is HR before invoking link
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
    if (profile?.role !== 'hr') return alert("Only HR can create employees.");

    try {
      const res = await fetch('http://localhost:5001/api/hr/create-employee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: `employee_${Math.floor(Math.random()*1000)}@company.com`,
          password: 'Password123!',
          hrId: session.user.id
        })
      });
      const data = await res.json();
      if (data.success) {
        alert("Success! Employee created.\\nEmail: " + data.user.email + "\\nPassword: Password123!");
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      alert("Network error: " + err.message + "\\nIs the Node server running on port 5001?");
    }
  };

  return (
    <div className="min-h-screen bg-surface flex">
      <Sidebar />
      <main className="flex-1 lg:pl-64 flex flex-col min-w-0 relative overflow-x-hidden min-h-screen">
        {/* Decorative background blooms inherited from LandingPage */}
        <div className="gradient-blob w-[500px] h-[500px] bg-accent-orange-light top-0 -left-20 animate-pulse-soft absolute pointer-events-none" />
        <div className="gradient-blob w-[600px] h-[600px] bg-primary-200 bottom-0 -right-20 animate-pulse-soft absolute pointer-events-none" style={{ animationDelay: '2s' }} />
        
        <div className="flex-1 p-6 md:p-10 z-10 relative">
          
          {/* Hidden HR Trigger to create employee */}
          <button 
            onClick={handleCreateTestEmployee} 
            className="absolute top-2 right-6 text-[11px] font-mono text-ink-muted/50 hover:text-primary-500 transition-colors z-50 mix-blend-multiply"
          >
            [Dev: Create Employee]
          </button>

          <div className="max-w-6xl mx-auto space-y-8">
            <DashboardHeader userName="Alex" day={14} />
            
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
