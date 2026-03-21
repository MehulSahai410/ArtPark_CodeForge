import { useState } from 'react';
import HRSidebar from '../components/dashboard/HRSidebar';
import { getEmployees, addEmployee, removeEmployee } from '../mockAuth';
import { Search, UserPlus, Trash2, X, Copy, CheckCircle2, AlertTriangle, Users, UserCheck, UserX } from 'lucide-react';

export default function ManageEmployeesPage() {
  const [employees, setEmployees] = useState(getEmployees());
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCredentials, setShowCredentials] = useState(null);
  const [confirmRemove, setConfirmRemove] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [copied, setCopied] = useState('');

  const filtered = employees.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || e.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const activeCount = employees.filter(e => e.status === 'active').length;
  const removedCount = employees.filter(e => e.status === 'removed').length;

  const handleAdd = () => {
    if (!formData.name.trim() || !formData.email.trim()) return;
    const newEmp = addEmployee(formData.name.trim(), formData.email.trim());
    setEmployees(getEmployees());
    setFormData({ name: '', email: '' });
    setShowAddModal(false);
    setShowCredentials(newEmp);
  };

  const handleRemove = (id) => {
    removeEmployee(id);
    setEmployees(getEmployees());
    setConfirmRemove(null);
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="min-h-screen bg-surface flex">
      <HRSidebar />
      <main className="flex-1 lg:pl-64 flex flex-col min-w-0 relative overflow-x-hidden min-h-screen">
        <div className="gradient-blob w-[500px] h-[500px] bg-accent-orange-light top-0 -left-20 animate-pulse-soft absolute pointer-events-none" />
        <div className="gradient-blob w-[600px] h-[600px] bg-primary-200 bottom-0 -right-20 animate-pulse-soft absolute pointer-events-none" style={{ animationDelay: '2s' }} />

        <div className="flex-1 p-6 md:p-10 z-10 relative">
          <div className="max-w-6xl mx-auto space-y-8">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-fade-in-up">
              <div>
                <h1 className="font-serif font-bold text-3xl md:text-4xl text-ink mb-2">Manage Employees</h1>
                <p className="text-ink-secondary text-base">Add, manage, and remove employee accounts</p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="btn-primary flex items-center gap-2 !py-3 !px-6 shrink-0"
              >
                <UserPlus className="w-4 h-4" /> Add Employee
              </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
              <div className="glass-effect rounded-2xl p-5 bg-white/50 border border-white/60 shadow-sm flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center"><Users className="w-5 h-5 text-primary-600" /></div>
                <div><p className="text-2xl font-bold text-ink">{employees.length}</p><p className="text-xs text-ink-muted">Total Employees</p></div>
              </div>
              <div className="glass-effect rounded-2xl p-5 bg-white/50 border border-white/60 shadow-sm flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-accent-green-light flex items-center justify-center"><UserCheck className="w-5 h-5 text-accent-green" /></div>
                <div><p className="text-2xl font-bold text-ink">{activeCount}</p><p className="text-xs text-ink-muted">Active</p></div>
              </div>
              <div className="glass-effect rounded-2xl p-5 bg-white/50 border border-white/60 shadow-sm flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center"><UserX className="w-5 h-5 text-red-500" /></div>
                <div><p className="text-2xl font-bold text-ink">{removedCount}</p><p className="text-xs text-ink-muted">Removed</p></div>
              </div>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 text-sm"
                />
              </div>
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="px-4 py-3 rounded-2xl border border-gray-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-sm text-ink"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="removed">Removed</option>
              </select>
            </div>

            {/* Employee Table */}
            <div className="glass-effect rounded-2xl bg-white/50 border border-white/60 shadow-sm overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100/80">
                      <th className="text-left px-6 py-4 text-xs font-semibold text-ink-muted uppercase tracking-wider">Employee Name</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-ink-muted uppercase tracking-wider">Email / User ID</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-ink-muted uppercase tracking-wider">Role</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-ink-muted uppercase tracking-wider">Status</th>
                      <th className="text-right px-6 py-4 text-xs font-semibold text-ink-muted uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length > 0 ? filtered.map((emp, idx) => (
                      <tr 
                        key={emp.id} 
                        className="border-b border-gray-50 last:border-0 hover:bg-white/40 transition-colors animate-fade-in-up"
                        style={{ animationDelay: `${0.02 * idx}s` }}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-sm font-bold text-primary-700 shrink-0">
                              {emp.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-medium text-sm text-ink">{emp.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-ink-secondary">{emp.email}</td>
                        <td className="px-6 py-4">
                          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary-50 text-primary-700 capitalize">{emp.role}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full capitalize ${
                            emp.status === 'active' ? 'bg-accent-green-light text-accent-green' : 'bg-red-50 text-red-600'
                          }`}>
                            {emp.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {emp.status === 'active' && (
                            <button
                              onClick={() => setConfirmRemove(emp)}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-all duration-200"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Remove
                            </button>
                          )}
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-16 text-center">
                          <div className="flex flex-col items-center">
                            <Users className="w-10 h-10 text-ink-muted/30 mb-3" />
                            <p className="text-sm font-medium text-ink-muted">No employees found</p>
                            <p className="text-xs text-ink-muted/60 mt-1">Try adjusting your search or add a new employee</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* ===== ADD EMPLOYEE MODAL ===== */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden relative border border-white/20">
            <button onClick={() => setShowAddModal(false)} className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 transition-colors z-10">
              <X className="w-5 h-5 text-ink-muted" />
            </button>
            <div className="p-8">
              <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-6">
                <UserPlus className="w-7 h-7 text-primary-600" />
              </div>
              <h2 className="text-xl font-serif font-bold text-ink text-center mb-1">Add New Employee</h2>
              <p className="text-ink-secondary text-sm text-center mb-8">Credentials will be auto-generated</p>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-1.5 block">Employee Name</label>
                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-1.5 block">Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. john@company.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 text-sm"
                  />
                </div>
              </div>

              <button
                onClick={handleAdd}
                disabled={!formData.name.trim() || !formData.email.trim()}
                className="btn-primary w-full !rounded-2xl !py-3.5 mt-8 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Create Employee
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== CREDENTIALS POPUP ===== */}
      {showCredentials && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden relative border border-white/20">
            <button onClick={() => setShowCredentials(null)} className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 transition-colors z-10">
              <X className="w-5 h-5 text-ink-muted" />
            </button>
            <div className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-accent-green-light flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-accent-green" />
              </div>
              <h2 className="text-xl font-serif font-bold text-ink mb-1">Employee Created!</h2>
              <p className="text-ink-secondary text-sm mb-8">Share these credentials with the employee</p>

              <div className="space-y-3 text-left">
                <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-semibold text-ink-muted uppercase tracking-wider mb-1">User ID</p>
                    <p className="text-sm font-medium text-ink font-mono">{showCredentials.email}</p>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(showCredentials.email, 'email')}
                    className={`p-2 rounded-lg transition-all duration-200 ${copied === 'email' ? 'bg-accent-green-light text-accent-green' : 'hover:bg-gray-200 text-ink-muted'}`}
                  >
                    {copied === 'email' ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-semibold text-ink-muted uppercase tracking-wider mb-1">Password</p>
                    <p className="text-sm font-medium text-ink font-mono">{showCredentials.password}</p>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(showCredentials.password, 'password')}
                    className={`p-2 rounded-lg transition-all duration-200 ${copied === 'password' ? 'bg-accent-green-light text-accent-green' : 'hover:bg-gray-200 text-ink-muted'}`}
                  >
                    {copied === 'password' ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                onClick={() => setShowCredentials(null)}
                className="btn-primary w-full !rounded-2xl !py-3.5 mt-8"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== REMOVE CONFIRMATION DIALOG ===== */}
      {confirmRemove && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden relative border border-white/20">
            <div className="p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-7 h-7 text-red-500" />
              </div>
              <h2 className="text-lg font-serif font-bold text-ink mb-2">Remove Employee?</h2>
              <p className="text-ink-secondary text-sm mb-8">
                Are you sure you want to remove <span className="font-semibold text-ink">{confirmRemove.name}</span>? This will deactivate their account.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmRemove(null)}
                  className="flex-1 py-3 rounded-2xl text-sm font-semibold bg-gray-100 text-ink hover:bg-gray-200 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleRemove(confirmRemove.id)}
                  className="flex-1 py-3 rounded-2xl text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-all duration-200"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
