import { NavLink, Link } from "react-router-dom";
import { Bell, Flame, MessagesSquare, UserRoundSearch } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed w-full h-24 shadow px-14 py-6 flex justify-between items-center border-b-[0.1px] border-twilight-gradient-start">
      <div>
        <h1 className="text-[2rem] font-[1000] tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-accent-pink from-30% via-accent-red to-accent-salmon">
          VibeLink
        </h1>
      </div>

      {/* Navigation Links */}
      <div className="flex gap-16 justify-center items-center mr-16">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `${
              isActive ? "text-alert font-semibold" : "text-foreground"
            } hover:text-vibelink-gradient-start transition`
          }
        >
          <Flame size={34} />
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `${
              isActive ? "text-alert font-semibold" : "text-foreground"
            } hover:text-vibelink-gradient-start transition`
          }
        >
          <UserRoundSearch size={34} />
        </NavLink>
        <NavLink
          to="/chat"
          className={({ isActive }) =>
            `${
              isActive ? "text-alert font-semibold" : "text-foreground"
            } hover:text-vibelink-gradient-start transition`
          }
        >
          <MessagesSquare size={34} />
        </NavLink>
        <div className="hover:text-vibelink-gradient-start transition cursor-pointer">
          <Bell size={34} />
        </div>
      </div>

      <Link to="/settings">
        <div className="relative w-12 h-12 cursor-pointer">
          <img
            src="img/girl_2.png"
            alt="User Avatar"
            className="w-12 h-12 rounded-full border border-alert"
          />
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
        </div>
      </Link>
    </nav>
  );
}
