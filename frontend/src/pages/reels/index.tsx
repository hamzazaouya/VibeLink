export default function Reels() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🎬 Reels Page</h1>
      <p className="text-gray-700">
        This is where your video reels or short media content will be displayed.
        You can fetch and list dynamic reels here in the future.
      </p>

      {/* Example Reel Cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {["Reel 1", "Reel 2", "Reel 3"].map((reel, i) => (
          <div
            key={i}
            className="p-4 border rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold">{reel}</h2>
            <p className="text-sm text-gray-500">Short description of {reel}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
