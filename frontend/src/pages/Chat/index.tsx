export default function Chat() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">💬 Chat Page</h1>
      <p className="text-gray-700">
        This is where your chat interface will be implemented. You can integrate
        real-time messaging features here in the future.
      </p>

      {/* Example Chat Messages */}
      <div className="mt-6 space-y-4">
        {["Hello!", "How are you?", "Let's chat!"].map((message, i) => (
          <div
            key={i}
            className="p-4 bg-gray-100 rounded-lg shadow hover:shadow-lg transition"
          >
            <p className="text-sm text-gray-800">{message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
