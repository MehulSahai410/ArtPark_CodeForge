import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

const MockDashboard = () => (
  <div className="min-h-screen flex items-center justify-center bg-surface">
    <h1 className="text-2xl font-bold text-ink">HR Dashboard Placeholder</h1>
  </div>
)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<MockDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
