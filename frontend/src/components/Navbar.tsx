import { NavLink, Link } from "react-router-dom";
import {
  Bell,
  Flame,
  LogOut,
  Menu,
  MessagesSquare,
  Settings,
  User,
  UserRoundSearch,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { to: "/home", icon: <Flame size={32} />, label: "Home" },
    { to: "/profile", icon: <UserRoundSearch size={32} />, label: "Profile" },
    { to: "/chat", icon: <MessagesSquare size={32} />, label: "Chat" },
  ];

  const Notifications = [
    {
      id: 1,
      user: "hamza azaouya",
      message: "Liked You",
      avatar:
        "https://cdn.intra.42.fr/users/68cf081abe9e9f700d9efd1d27f07231/hazaouya.jpg",
    },
    {
      id: 2,
      user: "zakaria lazrak",
      message: "Liked You",
      avatar:
        "https://cdn.intra.42.fr/users/b145a08af26318cd43d39176d47b64c7/zlazrak.JPG",
    },
    {
      id: 3,
      user: "youssef yahya",
      message: "Liked You",
      avatar:
        "https://cdn.intra.42.fr/users/fecbc74d595c68f963737b256abc7aa8/yoyahya.JPG",
    },
    {
      id: 4,
      user: "hamza azaouya",
      message: "Liked You",
      avatar:
        "https://cdn.intra.42.fr/users/68cf081abe9e9f700d9efd1d27f07231/hazaouya.jpg",
    },
    {
      id: 5,
      user: "zakaria lazrak",
      message: "Liked You",
      avatar:
        "https://cdn.intra.42.fr/users/b145a08af26318cd43d39176d47b64c7/zlazrak.JPG",
    },
    {
      id: 6,
      user: "youssef yahya",
      message: "Liked You",
      avatar:
        "https://cdn.intra.42.fr/users/fecbc74d595c68f963737b256abc7aa8/yoyahya.JPG",
    },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setNotificationsOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed w-full md:h-[5.5rem] h-16 px-6 md:px-14 bg-background py-4 shadow border-b border-twilight-gradient-start flex justify-between items-center z-50">
      {/* Logo */}
      <h1 className="text-2xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-accent-pink via-accent-red to-accent-salmon">
        VibeLink
      </h1>

      {/* Desktop Nav */}
      <div className="hidden md:flex gap-10 items-center mr-14">
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
        {/* Notifications Dropdown */}
        <div className="relative flex justify-center" ref={notificationsRef}>
          <button
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setProfileOpen(false);
            }}
            className="text-foreground hover:text-vibelink-gradient-start transition cursor-pointer border-none"
          >
            <Bell size={30} />
          </button>
          {notificationsOpen && (
            <div className="absolute top-12 right-0 w-80 bg-slate-800 rounded-lg shadow-lg border border-slate-700 py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-700">
                <h3 className="text-white font-semibold">Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {Notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-slate-700 cursor-pointer transition"
                  >
                    <img
                      src={notification.avatar || "/placeholder.svg"}
                      alt={notification.user}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-white font-medium">
                        {notification.user}
                      </p>
                      <p className="text-red-400 text-sm">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="absolute top-0 right-0 w-2 h-2 bg-alert rounded-full"></div>
        </div>
      </div>

      {/* Avatar */}
      {/* <Link
        to="/settings"
        className="hidden md:block relative w-12 h-12 shrink-0"
      >
        <img
          src="img/girl_2.png"
          alt="User Avatar"
          className="rounded-full w-full h-full object-cover border border-alert"
        />
      </Link> */}
      {/* Profile Avatar with Dropdown */}
      <div className="hidden md:block relative" ref={profileRef}>
        <button
          onClick={() => {
            setProfileOpen(!profileOpen);
            setNotificationsOpen(false);
          }}
          className="relative w-12 h-12 shrink-0 border-none cursor-pointer flex items-center justify-center"
        >
          <img
            src="./img/aahrach.jpeg"
            alt="User Avatar"
            className="rounded-full w-full h-full object-cover border border-alert"
          />
        </button>

        {profileOpen && (
          <div className="absolute top-14 right-0 w-48 bg-slate-800 rounded-lg shadow-lg border border-slate-700 py-2 z-50">
            <Link
              to="/profile"
              className="flex items-center gap-3 px-4 py-3 text-white hover:bg-slate-700 transition"
              onClick={() => setProfileOpen(false)}
            >
              <User size={18} />
              Profile
            </Link>
            <Link
              to="/settings"
              className="flex items-center gap-3 px-4 py-3 text-white hover:bg-slate-700 transition"
              onClick={() => setProfileOpen(false)}
            >
              <Settings size={18} />
              Settings
            </Link>
            <button
              className="flex items-center gap-3 px-4 py-3 text-white hover:bg-slate-700 transition w-full text-left"
              onClick={() => {
                setProfileOpen(false);
                // Add logout logic here
                console.log("Logout clicked");
              }}
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </div>

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
