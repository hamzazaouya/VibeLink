import {
  Star,
  Dumbbell,
  ChefHat,
  Fish,
  TentTree,
  Camera,
  Gamepad2,
  Mars,
  Venus,
  UserX,
  Flag,
  Trash,
  Save,
  Check,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
const profileData = {
  profile: {
    name: "Achraf Ahrach",
    avatar: "./img/aahrach.jpeg",
    gender: "male",
    stars: 3,
    isOnline: true,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  hobbies: [
    {
      name: "Workout",
      icon: "dumbbell",
      gradient: "from-orange-500 to-pink-500",
    },
    {
      name: "Cooking",
      icon: "chef-hat",
      gradient: "from-green-500 to-teal-500",
    },
    {
      name: "Fishing",
      icon: "fish",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      name: "Camping",
      icon: "tent-tree",
      gradient: "from-yellow-500 to-amber-500",
    },
    {
      name: "Gaming",
      icon: "monitor-play",
      gradient: "from-red-500 to-pink-500",
    },
    {
      name: "Photography",
      icon: "camera",
      gradient: "from-purple-500 to-indigo-500",
    },
  ],
  gallery: [
    {
      id: 1,
      url: "./img/man_1.png",
      alt: "Traditional outfit",
    },
    {
      id: 2,
      url: "./img/man_2.png",
      alt: "Casual style",
    },
    {
      id: 3,
      url: "./img/man_3.png",
      alt: "Traditional outfit",
    },
    {
      id: 4,
      url: "./img/man_4.png",
      alt: "Casual style",
    },
    {
      id: 5,
      url: "./img/man_5.png",
      alt: "Traditional outfit",
    },
  ],
};

// Icon mapping for hobbies
const iconMap = {
  dumbbell: Dumbbell,
  "chef-hat": ChefHat,
  fish: Fish,
  camera: Camera,
  "tent-tree": TentTree,
  "monitor-play": Gamepad2,
};

export default function UserProfile() {
  const { profile, hobbies, gallery } = profileData;
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState(0);
  const [originalRating] = useState(profile.stars);
  const [isRatingSaved, setIsRatingSaved] = useState(true);
  const [userRating, setUserRating] = useState(profile.stars);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const handleRating = (rating: number) => {
    setUserRating(rating);
    setIsRatingSaved(rating === originalRating);
    setShowSaveSuccess(false);
    console.log(`Rated ${rating} stars`);
  };

  const handleSaveRating = () => {
    setIsRatingSaved(true);
    setShowSaveSuccess(true);
    console.log(`Saved rating: ${userRating} stars`);

    setTimeout(() => {
      setShowSaveSuccess(false);
    }, 2000);
  };

  const handleRemove = () => {
    console.log("Remove user");
    // Add your remove logic here
  };

  const handleUnmatch = () => {
    console.log("Unmatch user");
    // Add your unmatch logic here
  };

  const handleReport = () => {
    console.log("Report user");
    // Add your report logic here
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-twilight-gradient-start via-twilight-gradient-middle to-twilight-gradient-end px-8 pt-28">
      <div className="min-h-[85vh] grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Panel - Profile Info */}
        <div className="lg:col-span-5">
          <div className="h-full bg-white/10 backdrop-blur-lg rounded-2xl p-6 space-y-6">
            <div className="space-y-6">
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-r from-vibelink-gradient-start to-vibelink-gradient-end p-[0.15rem]">
                    <img
                      src={profile.avatar || "./img/placeholder.jpg"}
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
                    {profile.name}
                    {profile.gender === "female" ? (
                      <Venus className="w-6 h-6 text-blue-400 ml-1" />
                    ) : (
                      <Mars className="w-6 h-6 text-blue-400 ml-1" />
                    )}
                  </h2>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex justify-center space-x-1">
                {[...Array(5)].map((_, i) => {
                  const starNumber = i + 1;
                  const isActive = starNumber <= (hoverRating || userRating);
                  return (
                    <button
                      key={i}
                      onClick={() => handleRating(starNumber)}
                      onMouseEnter={() => setHoverRating(starNumber)}
                      // onMouseLeave={() => setHoverRating(0)}
                      className="transition-all duration-200 hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors duration-200 ${
                          isActive
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-600 text-gray-600 hover:fill-yellow-300 hover:text-yellow-300"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center">
              {!isRatingSaved && (
                <button
                  onClick={handleSaveRating}
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-all duration-200 text-sm font-medium"
                >
                  <Save className="w-4 h-4" />
                  Save Rating
                </button>
              )}

              {showSaveSuccess && (
                <div className="flex items-center justify-center gap-2 bg-green-500 text-white py-2 px-4 rounded-lg text-sm font-medium animate-pulse">
                  <Check className="w-4 h-4" />
                  Rating Saved!
                </div>
              )}
            </div>

            <div className="flex justify-center gap-2 pb-6">
              <button
                onClick={handleRemove}
                className="flex items-center justify-center gap-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg transition-colors duration-200 text-sm"
              >
                <Trash className="w-4 h-4" />
                Remove
              </button>
              <button
                onClick={handleUnmatch}
                className="flex items-center justify-center gap-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-3 rounded-lg transition-colors duration-200 text-sm"
              >
                <UserX className="w-4 h-4" />
                Unmatch
              </button>
              <button
                onClick={handleReport}
                className="flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg transition-colors duration-200 text-sm"
              >
                <Flag className="w-4 h-4" />
                Report
              </button>
            </div>

            {/* Description */}
            <div className="bg-white/15 max-h-64 overflow-y-scroll bg-blur-lg p-4 rounded-xl text-white text-base leading-relaxed">
              {profile.description}
            </div>

            {/* Interest Tags */}
            <div className="max-h-52 overflow-y-scroll space-y-3 bg-white/15 bg-blur-lg p-4 rounded-xl">
              <div className="flex flex-wrap gap-2">
                {hobbies.map((hobby, index) => {
                  const IconComponent =
                    iconMap[hobby.icon as keyof typeof iconMap];
                  return (
                    <div
                      key={index}
                      className={`flex items-center gap-2 bg-gradient-to-r ${hobby.gradient} rounded-full px-4 py-2 text-white text-sm`}
                    >
                      <IconComponent className="w-4 h-4" />
                      {hobby.name}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Center Panel - Photo Gallery */}
        <div className="lg:col-span-7">
          <div className="h-full overflow-y-scroll bg-slate-700/50 backdrop-blur-sm rounded-2xl p-6 border-2 border-blue-500/50">
            <div className="max-h-[75vh] grid grid-cols-3 gap-4">
              {gallery.map((image) => (
                <div
                  key={image.id}
                  className="aspect-[3/4] rounded-xl overflow-hidden pb-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
