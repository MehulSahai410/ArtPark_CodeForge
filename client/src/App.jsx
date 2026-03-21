import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { mockAuth } from './mockAuth';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UploadResumePage from './pages/UploadResumePage';
import EmployeeDashboardPage from './pages/EmployeeDashboardPage';
import HRDashboardPage from './pages/HRDashboardPage';
import ManageEmployeesPage from './pages/ManageEmployeesPage';
import EmployeeProgressPage from './pages/EmployeeProgressPage';
import RoadmapPage from './pages/RoadmapPage';
import ModuleLibraryPage from './pages/ModuleLibraryPage';
import SkillGapReportPage from './pages/SkillGapReportPage';
import AchievementsPage from './pages/AchievementsPage';
import MessagesPage from './pages/MessagesPage';

// Footer Pages
import EnterprisePage from './pages/footer/EnterprisePage';
import DocumentationPage from './pages/footer/DocumentationPage';
import APIReferencePage from './pages/footer/APIReferencePage';
import BlogPage from './pages/footer/BlogPage';
import CaseStudiesPage from './pages/footer/CaseStudiesPage';
import AboutUsPage from './pages/footer/AboutUsPage';
import CareersPage from './pages/footer/CareersPage';
import ContactPage from './pages/footer/ContactPage';
import PartnersPage from './pages/footer/PartnersPage';
import PrivacyPolicyPage from './pages/footer/PrivacyPolicyPage';
import TermsOfServicePage from './pages/footer/TermsOfServicePage';
import CookiePolicyPage from './pages/footer/CookiePolicyPage';
import SecurityPage from './pages/footer/SecurityPage';

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
            <HRDashboardPage />
          </ProtectedRoute>
        } />

        <Route path="/hr/manage-employees" element={
          <ProtectedRoute allowedRoles={['hr']}>
            <ManageEmployeesPage />
          </ProtectedRoute>
        } />

        <Route path="/hr/employee-progress" element={
          <ProtectedRoute allowedRoles={['hr']}>
            <EmployeeProgressPage />
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

        {/* Footer Routes */}
        <Route path="/enterprise" element={<EnterprisePage />} />
        <Route path="/documentation" element={<DocumentationPage />} />
        <Route path="/api-reference" element={<APIReferencePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="/cookies" element={<CookiePolicyPage />} />
        <Route path="/security" element={<SecurityPage />} />
      </Routes>
    </Router>
  );
}

export default App;

