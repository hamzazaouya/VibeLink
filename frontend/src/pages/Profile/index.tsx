import {
  Star,
  Dumbbell,
  ChefHat,
  Fish,
  TentTree,
  Camera,
  MoreHorizontal,
  Gamepad2,
  Mars,
  Venus,
  Trash,
  UserX,
  Flag,
  Clock,
  Eye,
  Calendar,
  MapPin,
  Users,
} from "lucide-react";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import profileData from "./data/profile-data.json";
import {ProfileInfo, galleryImage} from "./types/profile.types"
import GalleryImage from "./galleryImage/GalleryImage";
import Hobbie from "./hobbies/Hobbies";


// Icon mapping for hobbies
const iconMap = {
  dumbbell: Dumbbell,
  "chef-hat": ChefHat,
  fish: Fish,
  camera: Camera,
  "tent-tree": TentTree,
  "monitor-play": Gamepad2,
};

type TabType = "matches" | "views" | "meetings";



export default function ProfilePage() {
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>({user_name: '', gender: '', bio: '', rating: 0, hobbies: [], avatar: ''});
  const [profileImages, setProfileImages] = useState<galleryImage[]>([]);
  const { profile, hobbies, gallery, matches, profileViews, meetingHistory } =
    profileData;
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("matches");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const BACKEND_APP_URL = import.meta.env.VITE_BACKEND_APP_URL


  useEffect(()=> {
    async function getUserData () {
      try {
        const response = await axios.get("http://localhost:3000/profile/me", {
                withCredentials: true,
        });
        const data = response.data;
        console.log("========> profile_images ", data.profile_images)
        setProfileInfo(data.profile_info);
        setProfileImages(data.profile_images);
      } catch(error: any) {
        console.log(error);
      }
    }
    getUserData();
  }, [])

  // Close dropdown when clicking outside
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

  const renderTabContent = () => {
    switch (activeTab) {
      case "matches":
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
                        src={match.avatar || "/placeholder.svg"}
                        alt={`${match.name} avatar`}
                        className="w-full h-full object-cover rounded-l-xl"
                      />
                    </div>
                    <div className="p-1">
                      <h4 className="text-white font-medium">{match.name}</h4>
                      <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                        <Calendar className="w-3 h-3" />
                        <span>{match.date}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-2 relative"
                    ref={dropdownRef}
                  >
                    <MoreHorizontal
                      className="w-5 h-5 text-gray-400 cursor-pointer"
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === match.id ? null : match.id
                        )
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

      case "views":
        return (
          <div className="space-y-4">
            {profileViews.map((view) => (
              <div key={view.id} className="bg-slate-600/50 rounded-xl  pr-4">
                <div className="flex items-center gap-3 rounded-l-xl">
                  <div className="w-14 h-14 ">
                    <img
                      src={view.avatar || "/placeholder.svg"}
                      alt={`${view.name} avatar`}
                      className="w-full h-full object-cover rounded-l-xl"
                    />
                  </div>
                  <div className="flex-1 p-1">
                    <h4 className="text-white font-medium">{view.name}</h4>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Clock className="w-3 h-3" />
                      <span>{view.viewedAt}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-blue-400">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">{view.viewCount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "meetings":
        return (
          <div className="space-y-4">
            {meetingHistory.map((meeting) => (
              <div key={meeting.id} className="bg-slate-600/50 rounded-xl p-2">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-full">
                    <img
                      src={meeting.avatar || "/placeholder.svg"}
                      alt={`${meeting.name} avatar`}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{meeting.name}</h4>
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                      <Calendar className="w-3 h-3" />
                      <span>{meeting.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                      <MapPin className="w-3 h-3" />
                      <span>{meeting.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          meeting.status === "completed"
                            ? "bg-green-500"
                            : meeting.status === "upcoming"
                            ? "bg-blue-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                      <span className="text-xs text-gray-400 capitalize">
                        {meeting.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-twilight-gradient-start via-twilight-gradient-middle to-twilight-gradient-end px-8 pt-28">
      <div className="min-h-[85vh] grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3">
          <div className="h-full bg-white/10 backdrop-blur-lg rounded-2xl p-6 space-y-6">
            <div className="space-y-6">
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-r from-vibelink-gradient-start to-vibelink-gradient-end p-[0.15rem]">
                    <img
                      src={`${BACKEND_APP_URL}/${profileInfo.avatar}` || "./img/placeholder.jpg"}
                      alt={`${profile.name} profile`}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  {profile.isOnline && (
                    <div className="absolute bottom-4 right-4 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="mt-2">
                  <h2 className="text-white text-xl font-semibold flex items-center justify-center gap-1">
                    {profileInfo.user_name}
                    {profileInfo.gender === "female" ? (
                      <Venus className="w-6 h-6 text-blue-400 ml-1" />
                    ) : (
                      <Mars className="w-6 h-6 text-blue-400 ml-1" />
                    )}
                  </h2>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-8 h-8 ${
                      i < profileInfo.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/15 max-h-64 overflow-y-scroll bg-blur-lg p-4 rounded-xl text-white text-base leading-relaxed">
              {profileInfo.bio}
            </div>

            {/* Interest Tags */}
            <div className="max-h-52 overflow-y-scroll space-y-3 bg-white/15 bg-blur-lg p-4 rounded-xl">
              <div className="flex flex-wrap gap-2">
                {
                  profileInfo.hobbies.map((e) => {
                    return <Hobbie hobbieTitle={e}/>
                  })
                }
              </div>
            </div>
          </div>
        </div>

        {/* Center Panel - Photo Gallery */}
        <div className="lg:col-span-6">
          <div className="h-full overflow-y-scroll bg-slate-700/50 backdrop-blur-sm rounded-2xl p-6 border-2 border-blue-500/50">
            <div className="max-h-[75vh] grid grid-cols-3 gap-4">
                {
                  profileImages.map((image) => {
                    return <GalleryImage picture_path={image.picture_path} slot_number={image.slot_number} />
                  })
                }
            </div>
          </div>
        </div>

        {/* Right Panel - Enhanced Matches with Tabs */}
        <div className="lg:col-span-3">
          <div className="h-full bg-white/15 backdrop-blur-sm rounded-2xl p-4">
            {/* Tab Navigation */}
            <div className="flex mb-6 bg-white/10 rounded-lg p-1">
              <button
                onClick={() => setActiveTab("matches")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "matches"
                    ? "bg-blue-500 text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <Users className="w-4 h-4" />
                <p className="block lg:hidden xl:block">Matches</p>
              </button>
              <button
                onClick={() => setActiveTab("views")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "views"
                    ? "bg-blue-500 text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <Eye className="w-4 h-4" />
                <p className="block lg:hidden xl:block">Views</p>
              </button>
              <button
                onClick={() => setActiveTab("meetings")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "meetings"
                    ? "bg-blue-500 text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <Calendar className="w-4 h-4" />
                <p className="block lg:hidden xl:block">Meets</p>
              </button>
            </div>

            {/* Tab Content */}
            <div className="max-h-[75vh] overflow-y-scroll bg-white/15 p-4 rounded-xl">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
