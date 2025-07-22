"use client";

import { useState } from "react";
import { testUsers } from "./data/test";
import { Heart, X, Star } from "lucide-react";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [users] = useState(testUsers);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const currentUser = users[currentIndex];

  const handleAction = (action: "like" | "pass") => {
    console.log(`${action} user:`, currentUser.name);
    if (currentIndex < users.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-300 text-gray-300"
        }`}
      />
    ));

  if (!currentUser) {
    return (
      <div className="min-h-screen pt-24 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
        <p className="text-white text-xl">No more profiles to show!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 bg-gradient-to-br from-twilight-gradient-start via-twilight-gradient-middle to-twilight-gradient-end flex items-center justify-center">
      <div className="relative">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl max-w-lg w-full">
          {/* Image */}
          <div className="relative bg-gray-800/20">
            <img
              src={currentUser.image || "/placeholder.svg"}
              alt={currentUser.name}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Info */}
          <div className="p-6 text-white">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-3xl font-bold">{currentUser.name}</h2>
              <div className="flex items-center gap-1">
                {renderStars(currentUser.rating)}
              </div>
            </div>

            {/* Description with Read More functionality */}
            <div className="mb-5">
              <p className="text-gray-300 text-base leading-relaxed">
                {currentUser.description.length > 120 ? (
                  <>
                    {showFullDescription
                      ? currentUser.description
                      : `${currentUser.description.substring(0, 120)}...`}
                    <button
                      onClick={() =>
                        setShowFullDescription(!showFullDescription)
                      }
                      className="text-pink-400 hover:text-pink-300 ml-2 text-sm font-medium"
                    >
                      {showFullDescription ? "Show less" : "Read more"}
                    </button>
                  </>
                ) : (
                  currentUser.description
                )}
              </p>
            </div>

            <div className="text-base text-gray-400">
              <span className="font-semibold">
                {currentUser.mutualFriends} Mutuals
              </span>
              <span className="mx-2">•</span>
              <span>Friends</span>
            </div>
          </div>
        </div>

        {/* -------------------- Action buttons -------------------- */}
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
