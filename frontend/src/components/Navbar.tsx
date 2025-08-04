"use client";

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
import data from "./data/data.json";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileNotificationsOpen, setMobileNotificationsOpen] = useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const mobileNotificationsRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { to: "/home", icon: <Flame size={32} />, label: "Home" },
    { to: "/search", icon: <UserRoundSearch size={32} />, label: "Search" },
    { to: "/chat", icon: <MessagesSquare size={32} />, label: "Chat" },
  ];

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    const minutes = Math.floor(diff / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (diff < 60) return `${diff}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    setProfileOpen(false);
    setMobileProfileOpen(false);
  };

  const handleMobileMenuToggle = () => {
    if (mobileOpen) {
      // Start closing animation
      setIsAnimating(true);
      setTimeout(() => {
        setMobileOpen(false);
        setIsAnimating(false);
      }, 400); // Match the animation duration
    } else {
      // Start opening animation
      setMobileOpen(true);
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 400);
    }
  };

  // Close dropdowns when clicking outside (desktop)
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

  // Close mobile notifications when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        mobileNotificationsRef.current &&
        !mobileNotificationsRef.current.contains(event.target as Node)
      ) {
        setMobileNotificationsOpen(false);
      }
    }

    if (mobileNotificationsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileNotificationsOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  return (
    <>
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

          {/* Desktop Notifications Dropdown */}
          <div className="relative flex justify-center" ref={notificationsRef}>
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setProfileOpen(false);
              }}
              className="text-foreground hover:text-vibelink-gradient-start transition cursor-pointer border-none relative"
            >
              <Bell size={30} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-alert rounded-full"></div>
            </button>

            {notificationsOpen && (
              <div className="absolute top-12 right-0 w-80 bg-slate-800 rounded-lg shadow-lg border border-slate-700 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-2 border-b border-slate-700">
                  <h3 className="text-white font-semibold">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {data.notifications.map((notification) => (
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
                      <p className="text-gray-400 text-sm pr-2">
                        {getTimeAgo(notification.date)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Profile Avatar with Dropdown */}
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
              className="rounded-full w-full h-full object-cover border-2 border-alert"
            />
          </button>

          {profileOpen && (
            <div className="absolute top-14 right-0 w-48 bg-slate-800 rounded-lg shadow-lg border border-slate-700 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
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
                onClick={handleLogout}
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white z-50 relative transition-transform duration-200 hover:scale-110"
          onClick={handleMobileMenuToggle}
          disabled={isAnimating}
        >
          <div className="relative w-7 h-7">
            <Menu
              size={28}
              className={`absolute inset-0 transition-all duration-300 ${
                mobileOpen
                  ? "opacity-0 rotate-180 scale-75"
                  : "opacity-100 rotate-0 scale-100"
              }`}
            />
            <X
              size={28}
              className={`absolute inset-0 transition-all duration-300 ${
                mobileOpen
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 rotate-180 scale-75"
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {(mobileOpen || isAnimating) && (
        <div
          className={`fixed inset-0 bg-black z-40 md:hidden transition-all duration-400 ease-out ${
            mobileOpen && !isAnimating
              ? "bg-opacity-60 backdrop-blur-sm"
              : "bg-opacity-0"
          }`}
          onClick={handleMobileMenuToggle}
        >
          <div
            className={`fixed top-0 left-0 w-80 h-full bg-gradient-to-b from-twilight-gradient-start via-twilight-gradient-middle to-twilight-gradient-end shadow-2xl z-50 transform transition-all duration-400 ease-out ${
              mobileOpen && !isAnimating
                ? "translate-x-0 opacity-100 scale-100"
                : "-translate-x-full opacity-90 scale-95"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Sidebar Header */}
            <div className="flex items-center justify-between p-6 border-b border-purple-700">
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-pink via-accent-red to-accent-salmon">
                VibeLink
              </h2>
              <button
                onClick={handleMobileMenuToggle}
                className="text-white hover:text-gray-300 transition-all duration-200 hover:scale-110 hover:rotate-90"
              >
                <X size={32} />
              </button>
            </div>

            {/* Mobile Profile Section */}
            <div
              className={`p-6 border-b border-purple-700 transition-all duration-500 delay-100 ${
                mobileOpen && !isAnimating
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="./img/aahrach.jpeg"
                  alt="User Avatar"
                  className="w-16 h-16 rounded-full object-cover border-2 border-accent-pink transition-transform duration-300 hover:scale-105"
                />
                <div>
                  <h3 className="text-white font-semibold text-lg">
                    {data.profile.name}
                  </h3>
                  <p className="text-gray-300 text-sm">{data.profile.email}</p>
                </div>
              </div>

              {/* Mobile Profile Actions */}
              <div className="flex gap-2">
                <Link
                  to="/profile"
                  onClick={handleMobileMenuToggle}
                  className="flex-1 bg-purple-700 hover:bg-purple-600 text-white py-2 px-4 rounded-lg text-center text-sm font-medium transition-all duration-200 hover:scale-105"
                >
                  View Profile
                </Link>
                <Link
                  to="/settings"
                  onClick={handleMobileMenuToggle}
                  className="flex-1 bg-purple-700 hover:bg-purple-600 text-white py-2 px-4 rounded-lg text-center text-sm font-medium transition-all duration-200 hover:scale-105"
                >
                  Settings
                </Link>
              </div>
            </div>

            {/* Mobile Navigation Items */}
            <div className="py-4">
              {navItems.map(({ to, icon, label }, index) => (
                <NavLink
                  key={label}
                  to={to}
                  onClick={handleMobileMenuToggle}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-6 py-4 text-white hover:bg-purple-700/30 transition-all duration-300 ${
                      isActive
                        ? "bg-purple-700 border-r-2 border-accent-pink font-semibold"
                        : ""
                    } ${
                      mobileOpen && !isAnimating
                        ? "translate-x-0 opacity-100"
                        : "translate-x-8 opacity-0"
                    }`
                  }
                  style={{
                    transitionDelay: mobileOpen
                      ? `${(index + 1) * 100}ms`
                      : "0ms",
                  }}
                >
                  {icon}
                  <span className="text-lg">{label}</span>
                </NavLink>
              ))}

              {/* Mobile Notifications */}
              <button
                onClick={() => {
                  setMobileNotificationsOpen(true);
                  handleMobileMenuToggle();
                }}
                className={`flex items-center gap-4 px-6 py-4 text-white hover:bg-purple-700/30 transition-all duration-300  w-full text-left ${
                  mobileOpen && !isAnimating
                    ? "translate-x-0 opacity-100"
                    : "translate-x-8 opacity-0"
                }`}
                style={{
                  transitionDelay: mobileOpen
                    ? `${(navItems.length + 1) * 100}ms`
                    : "0ms",
                }}
              >
                <Bell size={32} />
                <span className="text-lg">Notifications</span>
                <div className="ml-auto w-2 h-2 bg-alert rounded-full animate-pulse"></div>
              </button>
            </div>

            {/* Mobile Logout Button */}
            <div
              className={`absolute bottom-6 left-6 right-6 transition-all duration-500 ${
                mobileOpen && !isAnimating
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{
                transitionDelay: mobileOpen ? "300ms" : "0ms",
              }}
            >
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-3 w-full bg-accent-red hover:bg-red-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Notifications Popup */}
      {mobileNotificationsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-10 md:hidden flex items-center justify-center p-4 backdrop-blur-sm">
          <div
            ref={mobileNotificationsRef}
            className="bg-slate-800 rounded-xl shadow-2xl border border-slate-700 w-full max-w-xs max-h-[70vh] overflow-hidden animate-in slide-in-from-bottom-4 duration-300 scale-in-95"
          >
            {/* Popup Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 bg-slate-900">
              <h3 className="text-white font-semibold text-lg">
                Notifications
              </h3>
              <button
                onClick={() => setMobileNotificationsOpen(false)}
                className="text-gray-400 hover:text-white transition-all duration-200 p-1 hover:scale-110"
              >
                <X size={20} />
              </button>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {data.notifications.length > 0 ? (
                data.notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-center gap-3 px-6 py-4 hover:bg-slate-700 cursor-pointer transition-all duration-200 border-b border-slate-700 last:border-b-0 hover:translate-x-1"
                  >
                    <img
                      src={notification.avatar || "/placeholder.svg"}
                      alt={notification.user}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm truncate">
                        {notification.user}
                      </p>
                      <p className="text-red-400 text-sm">
                        {notification.message}
                      </p>
                    </div>
                    <p className="text-gray-400 text-sm pr-2">
                      {getTimeAgo(notification.date)}
                    </p>
                  </div>
                ))
              ) : (
                <div className="px-6 py-8 text-center">
                  <Bell size={48} className="mx-auto text-gray-500 mb-3" />
                  <p className="text-gray-400">No notifications yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
