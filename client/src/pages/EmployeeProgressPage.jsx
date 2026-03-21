import { useState } from 'react';
import HRSidebar from '../components/dashboard/HRSidebar';
import { getEmployees } from '../mockAuth';
import { TrendingUp, Users, Award, BarChart3 } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  LineChart, Line,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  PieChart, Pie, Cell,
} from 'recharts';

// ─── Mock Data Generators ───

const generateWeeklyProgress = (employees) => {
  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'];
  return weeks.map((name, i) => ({
    name,
    modulesCompleted: Math.round(3 + i * 2.2 + Math.random() * 3),
    quizzesPassed: Math.round(2 + i * 1.5 + Math.random() * 2),
    avgScore: Math.round(55 + i * 5 + Math.random() * 10),
  }));
};

const generateSkillRadar = () => [
  { skill: 'JavaScript', level: 85, fullMark: 100 },
  { skill: 'React', level: 78, fullMark: 100 },
  { skill: 'Node.js', level: 62, fullMark: 100 },
  { skill: 'Python', level: 45, fullMark: 100 },
  { skill: 'SQL', level: 70, fullMark: 100 },
  { skill: 'System Design', level: 55, fullMark: 100 },
  { skill: 'DevOps', level: 40, fullMark: 100 },
  { skill: 'Cloud', level: 50, fullMark: 100 },
];

const generateCompletionPie = (employees) => {
  const active = employees.filter(e => e.status === 'active').length;
  return [
    { name: 'Completed', value: Math.round(active * 0.35) || 2, color: '#22c55e' },
    { name: 'In Progress', value: Math.round(active * 0.45) || 3, color: '#6366f1' },
    { name: 'Not Started', value: Math.round(active * 0.2) || 1, color: '#f59e0b' },
  ];
};

const generateEmployeePerformance = (employees) => {
  const activeEmps = employees.filter(e => e.status === 'active').slice(0, 8);
  if (activeEmps.length === 0) {
    return [
      { name: 'Alice', score: 92, modules: 8 },
      { name: 'Bob', score: 78, modules: 6 },
      { name: 'Charlie', score: 85, modules: 7 },
      { name: 'Diana', score: 95, modules: 9 },
      { name: 'Eve', score: 60, modules: 4 },
    ];
  }
  return activeEmps.map(e => ({
    name: e.name.split(' ')[0],
    score: Math.round(50 + Math.random() * 50),
    modules: Math.round(2 + Math.random() * 8),
  }));
};

// ─── Custom Tooltip ───

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white/95 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg border border-gray-100">
        <p className="text-xs font-bold text-ink mb-1">{label}</p>
        {payload.map((entry, i) => (
          <p key={i} className="text-xs text-ink-secondary">
            <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: entry.color }} />
            {entry.name}: <span className="font-semibold text-ink">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// ─── Component ───

export default function EmployeeProgressPage() {
  const employees = getEmployees();
  const weeklyData = generateWeeklyProgress(employees);
  const radarData = generateSkillRadar();
  const pieData = generateCompletionPie(employees);
  const perfData = generateEmployeePerformance(employees);

  const activeCount = employees.filter(e => e.status === 'active').length;
  const avgScore = perfData.length > 0 ? Math.round(perfData.reduce((a, b) => a + b.score, 0) / perfData.length) : 0;
  const totalModules = perfData.reduce((a, b) => a + b.modules, 0);

  return (
    <div className="min-h-screen bg-surface flex">
      <HRSidebar />
      <main className="flex-1 lg:pl-64 flex flex-col min-w-0 relative overflow-x-hidden min-h-screen">
        <div className="gradient-blob w-[500px] h-[500px] bg-accent-orange-light top-0 -left-20 animate-pulse-soft absolute pointer-events-none" />
        <div className="gradient-blob w-[600px] h-[600px] bg-primary-200 bottom-0 -right-20 animate-pulse-soft absolute pointer-events-none" style={{ animationDelay: '2s' }} />

        <div className="flex-1 p-6 md:p-10 z-10 relative">
          <div className="max-w-7xl mx-auto space-y-8">

            {/* Header */}
            <div className="animate-fade-in-up">
              <h1 className="font-serif font-bold text-3xl md:text-4xl text-ink mb-2">Employee Progress</h1>
              <p className="text-ink-secondary text-base">Track learning performance and skill development across your team</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
              {[
                { label: 'Active Learners', value: activeCount || 5, icon: Users, bg: 'bg-primary-50', color: 'text-primary-600' },
                { label: 'Avg. Quiz Score', value: `${avgScore}%`, icon: Award, bg: 'bg-accent-green-light', color: 'text-accent-green' },
                { label: 'Modules Done', value: totalModules, icon: BarChart3, bg: 'bg-accent-orange-light', color: 'text-accent-orange' },
                { label: 'Growth Rate', value: '+12%', icon: TrendingUp, bg: 'bg-primary-50', color: 'text-primary-600' },
              ].map((stat, i) => (
                <div key={i} className="glass-effect rounded-2xl p-5 bg-white/50 border border-white/60 shadow-sm flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <div className={`w-11 h-11 rounded-xl ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-ink">{stat.value}</p>
                    <p className="text-xs text-ink-muted">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Row 1: Weekly Progress + Skill Radar */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

              {/* Weekly Progress Line Chart */}
              <div className="glass-effect rounded-2xl p-6 bg-white/50 border border-white/60 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <h3 className="font-semibold text-ink text-base mb-1">Weekly Learning Progress</h3>
                <p className="text-xs text-ink-muted mb-6">Modules completed and quiz scores over time</p>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '12px' }} />
                    <Line 
                      type="monotone" dataKey="modulesCompleted" name="Modules" 
                      stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4, fill: '#6366f1' }} activeDot={{ r: 6 }} 
                    />
                    <Line 
                      type="monotone" dataKey="quizzesPassed" name="Quizzes Passed" 
                      stroke="#22c55e" strokeWidth={2.5} dot={{ r: 4, fill: '#22c55e' }} activeDot={{ r: 6 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Skill Radar / Web Chart */}
              <div className="glass-effect rounded-2xl p-6 bg-white/50 border border-white/60 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
                <h3 className="font-semibold text-ink text-base mb-1">Team Skill Web</h3>
                <p className="text-xs text-ink-muted mb-6">Average competency levels across core skills</p>
                <ResponsiveContainer width="100%" height={280}>
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: '#64748b' }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 9, fill: '#94a3b8' }} />
                    <Radar 
                      name="Skill Level" dataKey="level" 
                      stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} strokeWidth={2} 
                    />
                    <Tooltip content={<CustomTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Charts Row 2: Employee Performance Bar + Completion Pie */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

              {/* Employee Performance Bar Chart */}
              <div className="xl:col-span-2 glass-effect rounded-2xl p-6 bg-white/50 border border-white/60 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h3 className="font-semibold text-ink text-base mb-1">Employee Performance</h3>
                <p className="text-xs text-ink-muted mb-6">Quiz scores and modules completed per employee</p>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={perfData} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '12px' }} />
                    <Bar dataKey="score" name="Quiz Score (%)" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={24} />
                    <Bar dataKey="modules" name="Modules Done" fill="#22c55e" radius={[6, 6, 0, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Completion Status Pie Chart */}
              <div className="glass-effect rounded-2xl p-6 bg-white/50 border border-white/60 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
                <h3 className="font-semibold text-ink text-base mb-1">Completion Status</h3>
                <p className="text-xs text-ink-muted mb-6">Overall team learning status</p>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie 
                      data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} 
                      paddingAngle={4} dataKey="value" strokeWidth={0}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-col gap-2 mt-4">
                  {pieData.map((entry, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-ink-secondary">{entry.name}</span>
                      </div>
                      <span className="font-bold text-ink">{entry.value}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Avg Score Trend */}
            <div className="glass-effect rounded-2xl p-6 bg-white/50 border border-white/60 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h3 className="font-semibold text-ink text-base mb-1">Average Score Trend</h3>
              <p className="text-xs text-ink-muted mb-6">How team average quiz scores are evolving over time</p>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={weeklyData}>
                  <defs>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[40, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" dataKey="avgScore" name="Avg Score (%)" 
                    stroke="#6366f1" strokeWidth={3} dot={{ r: 5, fill: '#fff', stroke: '#6366f1', strokeWidth: 2 }} 
                    activeDot={{ r: 7, fill: '#6366f1' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
