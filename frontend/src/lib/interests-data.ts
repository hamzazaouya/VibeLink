export interface Interest {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

export const INTERESTS: Interest[] = [
  { id: "quran", name: "Quran", emoji: "📗", color: "bg-green-500" },
  { id: "workout", name: "Workout", emoji: "💪", color: "bg-pink-500" },
  { id: "soccer", name: "Soccer", emoji: "⚽", color: "bg-gray-600" },
  {
    id: "photography",
    name: "Photography",
    emoji: "📷",
    color: "bg-orange-600",
  },
  { id: "netflix", name: "Netflix", emoji: "🎬", color: "bg-gray-800" },
  { id: "cooking", name: "Cooking", emoji: "🧑‍🍳", color: "bg-pink-400" },
  { id: "music", name: "Music", emoji: "🎵", color: "bg-blue-500" },
  { id: "dj", name: "DJ", emoji: "🎧", color: "bg-gray-700" },
  { id: "podcasting", name: "Podcasting", emoji: "🎙️", color: "bg-purple-500" },
  { id: "basketball", name: "Basketball", emoji: "🏀", color: "bg-orange-500" },
  { id: "swimming", name: "Swimming", emoji: "🏊‍♂️", color: "bg-blue-400" },
  { id: "chess", name: "Chess", emoji: "♟️", color: "bg-gray-900" },
  { id: "fishing", name: "Fishing", emoji: "🎣", color: "bg-blue-600" },
  { id: "coffee", name: "Coffee", emoji: "☕", color: "bg-amber-700" },
  { id: "investing", name: "Investing", emoji: "📈", color: "bg-green-600" },
  { id: "coding", name: "Coding", emoji: "💻", color: "bg-slate-700" },
  { id: "cycling", name: "Cycling", emoji: "🚴‍♂️", color: "bg-yellow-500" },
  { id: "hiking", name: "Hiking", emoji: "🥾", color: "bg-green-700" },
  { id: "camping", name: "Camping", emoji: "⛺", color: "bg-green-800" },
  { id: "blogging", name: "Blogging", emoji: "✍️", color: "bg-indigo-500" },
  { id: "gaming", name: "Gaming", emoji: "🕹️", color: "bg-purple-600" },
  { id: "drawing", name: "Drawing", emoji: "🎨", color: "bg-pink-600" },
  { id: "reading", name: "Reading", emoji: "📚", color: "bg-blue-700" },
  { id: "baking", name: "Baking", emoji: "🧁", color: "bg-pink-300" },
  { id: "surfing", name: "Surfing", emoji: "🏄‍♂️", color: "bg-cyan-500" },
  { id: "knitting", name: "Knitting", emoji: "🧶", color: "bg-rose-400" },
  { id: "running", name: "Running", emoji: "🏃‍♂️", color: "bg-red-500" },
  { id: "traveling", name: "Traveling", emoji: "✈️", color: "bg-sky-500" },
  { id: "gardening", name: "Gardening", emoji: "🌱", color: "bg-lime-500" },
  {
    id: "volunteering",
    name: "Volunteering",
    emoji: "🤝",
    color: "bg-emerald-500",
  },
];
