"use client";

import type React from "react";

import { useState } from "react";
import { testUsers } from "./data/test";
import { Heart, X, Star } from "lucide-react";

type SwipeDirection = "left" | "right" | null;

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [users] = useState(testUsers);
  const currentUser = users[currentIndex];
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<SwipeDirection>(null);
  const [dragOffset, setDragOffset] = useState(0);

  const handleAction = (action: "like" | "pass") => {
    if (isAnimating) return;

    console.log(`${action} user:`, currentUser.name);
    setIsAnimating(true);
    setSwipeDirection(action === "like" ? "right" : "left");

    // Wait for animation to complete before changing card
    setTimeout(() => {
      if (currentIndex < users.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
      setIsAnimating(false);
      setSwipeDirection(null);
      setDragOffset(0);
    }, 300);
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

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isAnimating) return;
    setTouchStart(e.touches[0].clientX);
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isAnimating || !touchStart) return;
    const currentTouch = e.touches[0].clientX;
    setTouchEnd(currentTouch);

    // Calculate drag offset for real-time feedback
    const offset = currentTouch - touchStart;
    setDragOffset(Math.max(-150, Math.min(150, offset)));
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || isAnimating) return;

    const swipeDistance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        handleAction("pass");
      } else {
        handleAction("like");
      }
    } else {
      // Reset position if swipe wasn't far enough
      setDragOffset(0);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Calculate transform based on current state
  const getCardTransform = () => {
    if (isAnimating && swipeDirection) {
      const translateX = swipeDirection === "right" ? "100vw" : "-100vw";
      const rotate = swipeDirection === "right" ? "50deg" : "-50deg";
      return `translateX(${translateX}) rotate(${rotate})`;
    } else if (dragOffset !== 0) {
      const rotate = dragOffset * 0.1; // Subtle rotation during drag
      return `translateX(${dragOffset}px) rotate(${rotate}deg)`;
    }
    return "translateX(0) rotate(0deg)";
  };

  // Calculate opacity based on drag
  const getCardOpacity = () => {
    if (isAnimating) return 0;
    if (Math.abs(dragOffset) > 0) {
      return Math.max(0.5, 1 - Math.abs(dragOffset) / 200);
    }
    return 1;
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen w-screen pt-24 bg-gradient-to-br from-twilight-gradient-start via-twilight-gradient-middle to-twilight-gradient-end flex items-center justify-center">
        <p className="text-white text-xl">No more profiles to show!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 bg-gradient-to-br from-twilight-gradient-start via-twilight-gradient-middle to-twilight-gradient-end flex sm:items-center justify-center overflow-hidden">
      <div className="relative">
        <div
          className=" bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl sm:max-w-md max-w-[22rem] md:max-h-[70vh] transition-all duration-300 ease-out"
          style={{
            transform: getCardTransform(),
            opacity: getCardOpacity(),
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Image */}
          <div className="relative bg-gray-800/20">
            <img
              src={currentUser.image || "/placeholder.svg"}
              alt={currentUser.name}
              className="w-full h-full object-contain"
            />

            {/* Swipe indicators */}
            {dragOffset > 30 && (
              <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                <div className="bg-green-500 text-white px-4 py-2 rounded-full font-bold text-lg transform rotate-12">
                  LIKE
                </div>
              </div>
            )}
            {dragOffset < -30 && (
              <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg transform -rotate-12">
                  PASS
                </div>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-6 text-white h-full">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-3xl font-bold">{currentUser.name}</h2>
              <div className="flex items-center gap-1">
                {renderStars(currentUser.rating)}
              </div>
            </div>

            {/* Description */}
            <div className="mb-5 h-16 text-start">
              <p className="text-gray-300 text-base leading-relaxed">
                {currentUser.description.length > 100 ? (
                  <>{`${currentUser.description.substring(0, 100)}...`}</>
                ) : (
                  currentUser.description
                )}
              </p>
            </div>

            <div className="text-base text-gray-400 flex">
              <span className="font-semibold">
                {currentUser.mutualFriends} Mutuals
              </span>
              <span className="mx-2">•</span>
              <span>Friends</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="hidden md:flex justify-center gap-6 mt-8">
          <button
            onClick={() => handleAction("pass")}
            disabled={isAnimating}
            className="bg-gray-600/80 hover:bg-gray-600 backdrop-blur-sm rounded-full p-4 transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-8 h-8 text-white" />
          </button>
          <button
            onClick={() => handleAction("like")}
            disabled={isAnimating}
            className="bg-pink-500/80 hover:bg-pink-500 backdrop-blur-sm rounded-full p-4 transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Heart className="w-8 h-8 text-white fill-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
