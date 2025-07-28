import { NavLink, Link } from "react-router-dom";
import {
  Bell,
  Flame,
  Menu,
  MessagesSquare,
  UserRoundSearch,
  X,
} from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { to: "/home", icon: <Flame size={32} />, label: "Home" },
    { to: "/profile", icon: <UserRoundSearch size={32} />, label: "Profile" },
    { to: "/chat", icon: <MessagesSquare size={32} />, label: "Chat" },
  ];

  return (
    <nav className="fixed w-full md:h-[5.5rem] h-16 px-6 md:px-14 bg-background py-4 shadow border-b border-twilight-gradient-start flex justify-between items-center z-50">
      {/* Logo */}
      <h1 className="text-2xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-accent-pink via-accent-red to-accent-salmon">
        VibeLink
      </h1>

      {/* Desktop Nav */}
      <div className="hidden md:flex gap-10 items-center">
        {navItems.map(({ to, icon, label }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `${
                isActive ? "text-alert font-semibold" : "text-foreground"
              } hover:text-vibelink-gradient-start transition`
            }
          >
            {icon}
          </NavLink>
        ))}
        <div className="hover:text-vibelink-gradient-start cursor-pointer">
          <Bell size={30} />
        </div>
      </div>

      {/* Avatar */}
      <Link
        to="/settings"
        className="hidden md:block relative w-11 h-11 shrink-0"
      >
        <img
          src="img/girl_2.png"
          alt="User Avatar"
          className="rounded-full w-full h-full object-cover border border-alert"
        />
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
      </Link>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-16 left-1/2 w-full bg-twilight-gradient-start border-b-[0.5px] px-5 py-4 flex flex-col gap-4 md:hidden z-40 shadow-md">
          {navItems.map(({ to, icon, label }) => (
            <NavLink
              key={label}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `${
                  isActive ? "text-alert font-semibold" : "text-foreground"
                } flex items-center gap-5 hover:text-vibelink-gradient-start transition`
              }
            >
              {icon} {label}
            </NavLink>
          ))}
          <div className="flex items-center gap-5 text-foreground hover:text-vibelink-gradient-start cursor-pointer">
            <Bell size={32} />
            Notifications
          </div>
        </div>
      )}
    </nav>
  );
}
