import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-blue-600">
        AchrafManager
      </Link>

      {/* Navigation Links */}
      <div className="space-x-6">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "text-gray-600"
          }
        >
          Profile
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "text-gray-600"
          }
        >
          Settings
        </NavLink>
        <NavLink
          to="/reels"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "text-gray-600"
          }
        >
          Reels
        </NavLink>
      </div>

      {/* User Avatar */}
      <img
        src="https://api.dicebear.com/7.x/bottts/svg?seed=Achraf"
        alt="User Avatar"
        className="w-8 h-8 rounded-full border border-gray-300"
      />
    </nav>
  );
}
