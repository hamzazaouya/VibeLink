import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import WelcomePage from './pages/Welcome/Welcome';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route redirects to login */}
          <Route path="/" element={<WelcomePage />} />
          
          {/* Login page */}
          <Route path="/login" element={<Login />} />
          
          {/* Placeholder for other routes */}
          <Route path="/home" element={<div>Home Page - Coming Soon!</div>} />
          <Route path="/signup" element={<div>Signup Page - Coming Soon!</div>} />
          <Route path="/forgot-password" element={<div>Forgot Password - Coming Soon!</div>} />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
