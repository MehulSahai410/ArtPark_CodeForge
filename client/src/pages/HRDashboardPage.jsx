import HRSidebar from '../components/dashboard/HRSidebar';
import { mockAuth, getEmployees } from '../mockAuth';
import { useNavigate } from 'react-router-dom';
import { Users, UserCheck, UserX, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HRDashboardPage() {
  const navigate = useNavigate();
  const user = mockAuth.getUser();
  const employees = getEmployees();

  const activeCount = employees.filter(e => e.status === 'active').length;
  const removedCount = employees.filter(e => e.status === 'removed').length;

  const handleLogout = () => {
    mockAuth.logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-surface flex">
      <HRSidebar />
      <main className="flex-1 lg:pl-64 flex flex-col min-w-0 relative overflow-x-hidden min-h-screen">
        <div className="gradient-blob w-[500px] h-[500px] bg-accent-orange-light top-0 -left-20 animate-pulse-soft absolute pointer-events-none" />
        <div className="gradient-blob w-[600px] h-[600px] bg-primary-200 bottom-0 -right-20 animate-pulse-soft absolute pointer-events-none" style={{ animationDelay: '2s' }} />

        <div className="flex-1 p-6 md:p-10 z-10 relative">
          <button 
            onClick={handleLogout} 
            className="absolute top-2 right-6 text-[11px] font-mono text-ink-muted/50 hover:text-red-500 transition-colors z-50"
          >
            [Logout]
          </button>

          <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="animate-fade-in-up">
              <p className="text-ink-muted text-sm mb-1">Welcome back,</p>
              <h1 className="font-serif font-bold text-3xl md:text-4xl text-ink mb-2">
                {user?.email?.split('@')[0] || 'HR Manager'} 👋
              </h1>
              <p className="text-ink-secondary text-base">Here's your team overview</p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="glass-effect rounded-[20px] p-6 bg-white/50 border border-white/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center"><Users className="w-5 h-5 text-primary-600" /></div>
                </div>
                <p className="text-3xl font-bold text-ink">{employees.length}</p>
                <p className="text-xs text-ink-muted mt-1">Total Employees</p>
              </div>
              <div className="glass-effect rounded-[20px] p-6 bg-white/50 border border-white/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-accent-green-light flex items-center justify-center"><UserCheck className="w-5 h-5 text-accent-green" /></div>
                </div>
                <p className="text-3xl font-bold text-ink">{activeCount}</p>
                <p className="text-xs text-ink-muted mt-1">Active Employees</p>
              </div>
              <div className="glass-effect rounded-[20px] p-6 bg-white/50 border border-white/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center"><UserX className="w-5 h-5 text-red-500" /></div>
                </div>
                <p className="text-3xl font-bold text-ink">{removedCount}</p>
                <p className="text-xs text-ink-muted mt-1">Removed</p>
              </div>
              <div className="glass-effect rounded-[20px] p-6 bg-white/50 border border-white/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-accent-orange-light flex items-center justify-center"><TrendingUp className="w-5 h-5 text-accent-orange" /></div>
                </div>
                <p className="text-3xl font-bold text-ink">{employees.length > 0 ? Math.round((activeCount / employees.length) * 100) : 0}%</p>
                <p className="text-xs text-ink-muted mt-1">Retention Rate</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-xl font-serif font-bold text-ink mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link 
                  to="/hr/manage-employees"
                  className="glass-effect rounded-[24px] p-8 bg-white/50 border border-white/60 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-48 h-48 bg-primary-100 rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/2 group-hover:opacity-60 transition-opacity pointer-events-none" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-primary-600" />
                    </div>
                    <h4 className="font-semibold text-ink text-lg mb-1">Manage Employees</h4>
                    <p className="text-sm text-ink-muted mb-4">Add new hires, generate credentials, and manage your team</p>
                    <span className="text-sm font-semibold text-primary-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                      Go to Management <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>

                <div className="glass-effect rounded-[24px] p-8 bg-white/50 border border-white/60 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-accent-green/10 rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-accent-green-light flex items-center justify-center mb-4">
                      <TrendingUp className="w-6 h-6 text-accent-green" />
                    </div>
                    <h4 className="font-semibold text-ink text-lg mb-1">Team Analytics</h4>
                    <p className="text-sm text-ink-muted mb-4">View skill progression and learning metrics across your team</p>
                    <span className="text-sm font-semibold text-ink-muted/50">Coming Soon</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Employees */}
            {employees.length > 0 && (
              <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-serif font-bold text-ink">Recent Employees</h3>
                  <Link to="/hr/manage-employees" className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1">
                    View All <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="glass-effect rounded-2xl bg-white/50 border border-white/60 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-100/80">
                          <th className="text-left px-6 py-4 text-xs font-semibold text-ink-muted uppercase tracking-wider">Name</th>
                          <th className="text-left px-6 py-4 text-xs font-semibold text-ink-muted uppercase tracking-wider">Email</th>
                          <th className="text-left px-6 py-4 text-xs font-semibold text-ink-muted uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employees.slice(-5).reverse().map(emp => (
                          <tr key={emp.id} className="border-b border-gray-50 last:border-0 hover:bg-white/40 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-xs font-bold text-primary-700">
                                  {emp.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="font-medium text-sm text-ink">{emp.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-ink-secondary">{emp.email}</td>
                            <td className="px-6 py-4">
                              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full capitalize ${
                                emp.status === 'active' ? 'bg-accent-green-light text-accent-green' : 'bg-red-50 text-red-600'
                              }`}>
                                {emp.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
