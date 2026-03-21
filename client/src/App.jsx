import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { mockAuth } from './mockAuth';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UploadResumePage from './pages/UploadResumePage';
import EmployeeDashboardPage from './pages/EmployeeDashboardPage';
import RoadmapPage from './pages/RoadmapPage';
import ModuleLibraryPage from './pages/ModuleLibraryPage';
import SkillGapReportPage from './pages/SkillGapReportPage';
import AchievementsPage from './pages/AchievementsPage';
import MessagesPage from './pages/MessagesPage';

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
    if (user.role === 'hr') {
      return <Navigate to="/hr-dashboard" replace />;
    } else {
      // If employee already did the analysis, go straight to dashboard, else upload
      const hasAnalysis = localStorage.getItem('analysis');
      return <Navigate to={hasAnalysis ? '/employee-dashboard' : '/upload'} replace />;
    }
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

        {/* Sidebar Pages */}
        <Route path="/dashboard/roadmap" element={<ProtectedRoute allowedRoles={['employee']}><RoadmapPage /></ProtectedRoute>} />
        <Route path="/dashboard/modules" element={<ProtectedRoute allowedRoles={['employee']}><ModuleLibraryPage /></ProtectedRoute>} />
        <Route path="/dashboard/skill-gap" element={<ProtectedRoute allowedRoles={['employee']}><SkillGapReportPage /></ProtectedRoute>} />
        <Route path="/dashboard/achievements" element={<ProtectedRoute allowedRoles={['employee']}><AchievementsPage /></ProtectedRoute>} />
        <Route path="/dashboard/messages" element={<ProtectedRoute allowedRoles={['employee']}><MessagesPage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
