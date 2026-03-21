import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { mockAuth } from './mockAuth';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UploadResumePage from './pages/UploadResumePage';
import EmployeeDashboardPage from './pages/EmployeeDashboardPage';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = mockAuth.getUser();
  const role = user?.role;
  
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={role === 'hr' ? '/hr-dashboard' : '/employee-dashboard'} replace />;
  }
  return children;
};

const PublicRoute = ({ children }) => {
  const user = mockAuth.getUser();
  if (user) {
    // If an employee is logged in and tries to hit /login, send them to upload flow
    // If HR, send them to hr-dashboard
    return <Navigate to={user.role === 'hr' ? '/hr-dashboard' : '/upload'} replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />

        <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />

        <Route path="/hr-dashboard" element={
          <ProtectedRoute allowedRoles={['hr']}>
            <EmployeeDashboardPage />
          </ProtectedRoute>
        } />

        <Route path="/employee-dashboard" element={
          <ProtectedRoute allowedRoles={['employee']}>
            <EmployeeDashboardPage />
          </ProtectedRoute>
        } />

        <Route path="/upload" element={
          <ProtectedRoute allowedRoles={['employee']}>
            <UploadResumePage />
          </ProtectedRoute>
        } />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Navigate to={mockAuth.getUser()?.role === 'hr' ? '/hr-dashboard' : '/employee-dashboard'} replace />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
