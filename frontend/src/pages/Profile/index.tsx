import {
  Star,
  Dumbbell,
  ChefHat,
  Fish,
  TentTree,
  Camera,
  Flame,
  Ban,
  MoreHorizontal,
  Gamepad2,
  User,
} from "lucide-react";
import profileData from "./data/profile-data.json";

// Icon mapping for hobbies
const iconMap = {
  dumbbell: Dumbbell,
  "chef-hat": ChefHat,
  fish: Fish,
  camera: Camera,
  "tent-tree": TentTree,
  "monitor-play": Gamepad2,
};

export default function ProfilePage() {
  const { profile, hobbies, gallery, matches } = profileData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-twilight-gradient-start via-twilight-gradient-middle to-twilight-gradient-end px-8 pt-28">
      {/* <div className="bg-red-600"> */}
      <div className="min-h-[85vh] grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Panel - Profile Info */}
        <div className="lg:col-span-3">
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
                <div className="">
                  <h2 className="text-white text-xl font-semibold flex items-center justify-center gap-1">
                    {profile.name}
                    <User className="w-4 h-4 text-blue-400" />
                  </h2>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-8 h-8 ${
                      i < profile.stars
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/15 max-h-64 overflow-y-scroll bg-blur-lg p-4 rounded-xl text-white text-base leading-relaxed">
              {profile.description}
            </div>

            {/* Interest Tags */}
            <div className="max-h-52 overflow-y-scroll space-y-3 bg-white/15 bg-blur-lg p-4 rounded-xl">
              <div className="flex flex-wrap gap-2">
                {hobbies.slice(0).map((hobby, index) => {
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
        <div className="lg:col-span-6">
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

        {/* Right Panel - Matches */}
        <div className="lg:col-span-3">
          <div className="h-full bg-white/15 backdrop-blur-sm rounded-2xl p-4">
            <h3 className="text-white text-lg font-semibold mb-6">Matches</h3>
            <div className="max-h-[75vh] overflow-y-scroll bg-white/15 p-4 space-y-4 rounded-xl">
              {matches.map((match) => (
                <div key={match.id} className="bg-slate-600/50 rounded-xl">
                  <div className="flex items-center justify-between pr-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-l-xl">
                        <img
                          src={match.avatar || "/placeholder.svg"}
                          alt={`${match.name} avatar`}
                          className="w-full h-full object-cover rounded-l-xl"
                        />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{match.name}</h4>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Flame
                        className={`w-5 h-5 ${
                          match.isLiked ? "text-red-500" : "text-gray-400"
                        }`}
                      />
                      <Ban
                        className={`w-5 h-5 ${
                          match.isBlocked ? "text-red-500" : "text-gray-400"
                        }`}
                      />
                      <MoreHorizontal className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
