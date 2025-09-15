// export default function Search() {
//   return (
//     <div className="min-h-screen w-screen pt-24 bg-gradient-to-br from-twilight-gradient-start via-twilight-gradient-middle to-twilight-gradient-end flex items-center justify-center">
//       <h1 className="text-2xl font-bold mb-4">🔍 Search Page</h1>
//     </div>
//   );
// }

import type React from "react";
import { useState } from "react";
interface Tag {
  id: string;
  name: string;
  color: string;
}

const SearchPage: React.FC = () => {
  const [ageMin, setAgeMin] = useState("");
  const [ageMax, setAgeMax] = useState("");
  const [fameMin, setFameMin] = useState("");
  const [fameMax, setFameMax] = useState("");
  const [newTag, setNewTag] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([
    { id: "1", name: "Quran", color: "green" },
    { id: "2", name: "Workout", color: "pink" },
    { id: "3", name: "Soccer", color: "gray" },
    { id: "4", name: "Photography", color: "brown" },
    { id: "5", name: "Netflix", color: "dark" },
    { id: "6", name: "Cooking", color: "pink" },
    { id: "7", name: "Music", color: "blue" },
    { id: "8", name: "DJ", color: "gray" },
    { id: "9", name: "Podcasting", color: "purple" },
  ]);

  const addTag = () => {
    if (
      newTag.trim() &&
      !selectedTags.find(
        (tag) => tag.name.toLowerCase() === newTag.toLowerCase()
      )
    ) {
      const colors = ["green", "pink", "blue", "purple", "brown", "gray"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      setSelectedTags([
        ...selectedTags,
        {
          id: Date.now().toString(),
          name: newTag.trim(),
          color: randomColor,
        },
      ]);
      setNewTag("");
    }
  };

  const removeTag = (tagId: string) => {
    setSelectedTags(selectedTags.filter((tag) => tag.id !== tagId));
  };

  const handleSubmit = () => {
    const searchData = {
      age: { min: ageMin, max: ageMax },
      fameRating: { min: fameMin, max: fameMax },
      tags: selectedTags.map((tag) => tag.name),
    };
    console.log("Search data:", searchData);
    // Handle search submission here
  };

  return (
    <div className="min-h-screen w-screen pt-22 bg-gradient-to-br from-twilight-gradient-start via-twilight-gradient-middle to-twilight-gradient-end flex items-center justify-center">
      <div className="max-w-6xl mx-auto bg-background/80 backdrop-blur-lg rounded-3xl p-10 grid grid-cols-1 lg:grid-cols-3 gap-10 shadow-2xl">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold drop-shadow-lg">
              Age :
            </h3>
            <div className="flex gap-4">
              <select
                value={ageMax}
                onChange={(e) => setAgeMax(e.target.value)}
                className="flex-1 p-3 bg-white/20 backdrop-blur-sm border-0 rounded-xl text-white placeholder-white/70 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <option value="" className="bg-gray-800 text-white">
                  Max
                </option>
                {Array.from({ length: 63 }, (_, i) => i + 18).map((age) => (
                  <option
                    key={age}
                    value={age}
                    className="bg-gray-800 text-white"
                  >
                    {age}
                  </option>
                ))}
              </select>
              <select
                value={ageMin}
                onChange={(e) => setAgeMin(e.target.value)}
                className="flex-1 p-3 bg-white/20 backdrop-blur-sm border-0 rounded-xl text-white placeholder-white/70 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <option value="" className="bg-gray-800 text-white">
                  Min
                </option>
                {Array.from({ length: 63 }, (_, i) => i + 18).map((age) => (
                  <option
                    key={age}
                    value={age}
                    className="bg-gray-800 text-white"
                  >
                    {age}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold drop-shadow-lg">
              Fame rating :
            </h3>
            <div className="flex gap-4">
              <select
                value={fameMax}
                onChange={(e) => setFameMax(e.target.value)}
                className="flex-1 p-3 bg-white/20 backdrop-blur-sm border-0 rounded-xl text-white placeholder-white/70 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <option value="" className="bg-gray-800 text-white">
                  Max
                </option>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((rating) => (
                  <option
                    key={rating}
                    value={rating}
                    className="bg-gray-800 text-white"
                  >
                    {rating}
                  </option>
                ))}
              </select>
              <select
                value={fameMin}
                onChange={(e) => setFameMin(e.target.value)}
                className="flex-1 p-3 bg-white/20 backdrop-blur-sm border-0 rounded-xl text-white placeholder-white/70 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <option value="" className="bg-gray-800 text-white">
                  Min
                </option>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((rating) => (
                  <option
                    key={rating}
                    value={rating}
                    className="bg-gray-800 text-white"
                  >
                    {rating}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold drop-shadow-lg">
              Tags :
            </h3>
            <div className="space-y-5">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTag()}
                placeholder="Add tags"
                className="w-full p-3 bg-white/20 backdrop-blur-sm border-0 rounded-xl text-white placeholder-white/70 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <div className="flex flex-wrap gap-3">
                {selectedTags.map((tag) => (
                  <span
                    key={tag.id}
                    className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                      tag.color === "green"
                        ? "bg-green-500 text-white"
                        : tag.color === "pink"
                        ? "bg-pink-500 text-white"
                        : tag.color === "gray"
                        ? "bg-gray-500 text-white"
                        : tag.color === "brown"
                        ? "bg-amber-700 text-white"
                        : tag.color === "dark"
                        ? "bg-gray-800 text-white"
                        : tag.color === "blue"
                        ? "bg-blue-500 text-white"
                        : tag.color === "purple"
                        ? "bg-purple-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                    onClick={() => removeTag(tag.id)}
                  >
                    {tag.name === "Quran" && "📖 "}
                    {tag.name === "Workout" && "💪 "}
                    {tag.name === "Soccer" && "⚽ "}
                    {tag.name === "Photography" && "📷 "}
                    {tag.name === "Netflix" && "🎬 "}
                    {tag.name === "Cooking" && "👩‍🍳 "}
                    {tag.name === "Music" && "🎵 "}
                    {tag.name === "DJ" && "🎧 "}
                    {tag.name === "Podcasting" && "🎙️ "}
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-white text-lg font-semibold drop-shadow-lg">
            Location :
          </h3>
          <div className="h-96 rounded-xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52901.38654799949!2d-80.87259484863281!3d35.22709820000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88541fc4fc381a81%3A0x884650e6bf43d164!2sCharlotte%2C%20NC!5e0!3m2!1sen!2sus!4v1694789234567!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <button
        className="fixed bottom-10 right-10 bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-200 hover:shadow-pink-500/25"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default SearchPage;
