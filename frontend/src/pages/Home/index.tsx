"use client";

import { useState } from "react";
import { testUsers } from "./data/test";
import { Heart, X, Star } from "lucide-react";

export default function Reels() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [users, setUsers] = useState(testUsers);

  const currentUser = users[currentIndex];

  const handleAction = (action: "like" | "pass") => {
    console.log(`${action} user:`, currentUser.name);

    // Move to next user
    if (currentIndex < users.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Reset to first user or show "no more profiles" message
      setCurrentIndex(0);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-300 text-gray-300"
        }`}
      />
    ));
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">No more profiles to show!</div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-96px)] bg-gradient-to-br from-twilight-gradient-start via-twilight-gradient-middle to-twilight-gradient-end flex items-center justify-center p-4">
      <div className="relative ">
        {/* Profile Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl max-w-sm w-full">
          {/* Profile Image */}
          <div className="relative h-96 w-full">
            <img
              src={currentUser.image || "/placeholder.svg"}
              alt={currentUser.name}
              // fill
              className="object-cover"
              // priority
            />
          </div>

          {/* Profile Info */}
          <div className="p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold">{currentUser.name}</h2>
              <div className="flex items-center gap-1">
                {renderStars(currentUser.rating)}
              </div>
            </div>

            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              {currentUser.description}
            </p>

            <div className="text-sm text-gray-400">
              <span className="font-semibold">
                {currentUser.mutualFriends} Mutuals
              </span>
              <span className="mx-2">•</span>
              <span>Friends</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-6 mt-8">
          <button
            onClick={() => handleAction("pass")}
            className="bg-gray-600/80 hover:bg-gray-600 backdrop-blur-sm rounded-full p-4 transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <X className="w-8 h-8 text-white" />
          </button>

          <button
            onClick={() => handleAction("like")}
            className="bg-pink-500/80 hover:bg-pink-500 backdrop-blur-sm rounded-full p-4 transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <Heart className="w-8 h-8 text-white fill-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
