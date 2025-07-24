import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import WelcomePage from "./pages/Welcome/Welcome";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Signup/Login";
import "./App.css";

import Layout from "./components/Layout";
import Settings from "./pages/Settings";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Routes without layout */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/forgot-password"
          element={<div>Forgot Password - Coming Soon!</div>}
        />
        <Route path="*" element={<Navigate to="/login" replace />} />

        {/* Routes with layout (Profile group) */}
        <Route element={<Layout />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}
