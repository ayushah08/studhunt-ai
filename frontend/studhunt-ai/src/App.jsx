import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; 
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login'; // Naya import
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding'; // Naya import
import Roadmap from './pages/Roadmap';
import AIChatbot from './pages/AIChatbot';
import Community from './pages/Community';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> {/* Nayi line */}
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/onboarding" element={<Onboarding />} /> {/* Onboarding route */}
         <Route path="/roadmap" element={<Roadmap />} />
         <Route path="/chatbot" element={<AIChatbot />} />
         <Route path="/community" element={<Community />} />
      </Routes>
    </Router>
  );
}

export default App;