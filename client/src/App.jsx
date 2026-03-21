import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UploadResumePage from './pages/UploadResumePage';
import EmployeeDashboardPage from './pages/EmployeeDashboardPage';

function App() {
  const [session, setSession] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchRole(session.user.id);
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchRole(session.user.id);
      else { setRole(null); setLoading(false); }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchRole = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();
      
      if (!error && data) {
        setRole(data.role);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-surface text-ink-secondary text-sm font-medium">Loading AdaptLearn...</div>;
  }

  // Protected Component Wrapper
  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!session) return <Navigate to="/login" replace />;
    if (allowedRoles && !allowedRoles.includes(role)) {
      // Redirect based on what role they actually have
      return <Navigate to={role === 'hr' ? '/hr-dashboard' : '/employee-dashboard'} replace />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        <Route path="/login" element={session ? <Navigate to={role === 'hr' ? '/hr-dashboard' : '/employee-dashboard'} replace /> : <LoginPage />} />
        
        <Route path="/signup" element={session ? <Navigate to={role === 'hr' ? '/hr-dashboard' : '/employee-dashboard'} replace /> : <SignupPage />} />
        
        {/* HR Route */}
        <Route path="/hr-dashboard" element={
          <ProtectedRoute allowedRoles={['hr']}>
            <EmployeeDashboardPage />
          </ProtectedRoute>
        } />
        
        {/* Employee Route Dashboard */}
        <Route path="/employee-dashboard" element={
          <ProtectedRoute allowedRoles={['employee']}>
            <EmployeeDashboardPage />
          </ProtectedRoute>
        } />

        {/* Employee Document Upload Page */}
        <Route path="/upload" element={
          <ProtectedRoute allowedRoles={['employee']}>
            <UploadResumePage />
          </ProtectedRoute>
        } />
        
        {/* Fallback route mapping */}
        <Route path="/dashboard" element={<Navigate to={role === 'hr' ? '/hr-dashboard' : '/employee-dashboard'} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
