import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; 
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login'; // Naya import
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding'; // Naya import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> {/* Nayi line */}
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/onboarding" element={<Onboarding />} /> {/* Onboarding route */}
       
      </Routes>
    </Router>
  );
}

export default App;