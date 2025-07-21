// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";
// import Signup from "./pages/Signup";
import WelcomePage from "./pages/Welcome/Welcome";
// import FontDemo from "./pages/FontDemo";

import Profile from "./pages/Profile";
// import Settings from "./pages/Settings";

import Layout from "./components/Layout";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Routes without layout */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/font-demo" element={<FontDemo />} /> */}

        {/* Routes with layout (Profile group) */}
        <Route element={<Layout />}>
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/settings" element={<Settings />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}
