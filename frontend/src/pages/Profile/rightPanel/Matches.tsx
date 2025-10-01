import { MoreHorizontal, Trash, UserX, Flag, Calendar } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { MatchProps } from "../types/rightPanel.types";

function Matches ({matches}: MatchProps) {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);
    const BACKEND_APP_URL = import.meta.env.VITE_BACKEND_APP_URL

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
          ) {
            setOpenDropdown(null);
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);
    
    return (
    <div className="space-y-4">
    {matches.map((match) => (
        <div
        key={match.id}
        className="bg-slate-600/50 rounded-xl relative"
        >
        <div className="flex items-center justify-between pr-4">
            <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-l-xl">
                <img
                src={`${BACKEND_APP_URL}/${match.avatar}` || "/placeholder.svg"}
                alt={`${match.username} avatar`}
                className="w-full h-full object-cover rounded-l-xl"
                />
            </div>
            <div className="p-1">
                <h4 className="text-white font-medium">{match.username}</h4>
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                <Calendar className="w-3 h-3" />
                <span>{new Date(match.date).toISOString().slice(0, 10)}</span>
                </div>
            </div>
            </div>
            <div
            className="flex items-center gap-2 relative"
            ref={dropdownRef}
            >
            <MoreHorizontal
                className="w-5 h-5 text-gray-400 cursor-pointer"
                onClick={() => setOpenDropdown(match.id)
                }
            />
            {openDropdown === match.id && (
                <div className="absolute top-8 right-0 w-36 bg-slate-800 rounded-md shadow-lg z-10">
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-slate-700 w-full text-left border-none">
                    <Trash className="w-4 h-4 text-red-500" /> Remove
                </button>
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-slate-700 w-full text-left border-none">
                    <UserX className="w-4 h-4 text-yellow-500" /> Unmatch
                </button>
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-slate-700 w-full text-left border-none">
                    <Flag className="w-4 h-4 text-blue-500" /> Report
                </button>
                </div>
            )}
            </div>
        </div>
        </div>
    ))}
    </div>
    );
}

export default Matches;