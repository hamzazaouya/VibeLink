import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import WelcomePage from './pages/Welcome/Welcome';
import Signup from './pages/Signup/Signup';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<div>Home Page - Coming Soon!</div>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<div>Forgot Password - Coming Soon!</div>} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
