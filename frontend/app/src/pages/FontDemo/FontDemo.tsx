import React from "react";

const FontDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-pacifico text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text mb-4">
            VibeLink
          </h1>
          <p className="text-xl font-roboto text-gray-600">
            Showcasing our beautiful font combination
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Pacifico Font Examples */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-roboto font-bold text-gray-800 mb-6">
              Pacifico Font (Display)
            </h2>
            <div className="space-y-4">
              <h3 className="text-4xl font-pacifico text-pink-500">
                Connect & Share
              </h3>
              <h3 className="text-3xl font-pacifico text-purple-500">
                Your Story Matters
              </h3>
              <h3 className="text-2xl font-pacifico text-orange-500">
                Join the Community
              </h3>
              <p className="text-sm font-roboto text-gray-500 mt-4">
                Perfect for: Headlines, logos, and decorative text
              </p>
            </div>
          </div>

          {/* Roboto Font Examples */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-roboto font-bold text-gray-800 mb-6">
              Roboto Font (Body Text)
            </h2>
            <div className="space-y-4">
              <h3 className="text-xl font-roboto font-bold text-gray-700">
                Roboto Bold - Headings
              </h3>
              <h4 className="text-lg font-roboto font-medium text-gray-600">
                Roboto Medium - Subheadings
              </h4>
              <p className="text-base font-roboto font-normal text-gray-600">
                Roboto Regular - This is perfect for body text, forms, and
                general content. It's highly readable and works great for longer
                paragraphs.
              </p>
              <p className="text-sm font-roboto font-light text-gray-500">
                Roboto Light - Great for captions and smaller text elements.
              </p>
              <p className="text-sm font-roboto text-gray-500 mt-4">
                Perfect for: Body text, forms, buttons, and UI elements
              </p>
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-roboto font-bold text-gray-800 mb-6">
            How to Use These Fonts
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-roboto font-semibold text-gray-700 mb-3">
                Tailwind CSS Classes
              </h3>
              <div className="bg-gray-100 rounded-lg p-4 text-sm font-mono">
                <p className="text-gray-600">• font-pacifico - Pacifico font</p>
                <p className="text-gray-600">• font-roboto - Roboto font</p>
                <p className="text-gray-600">• font-sans - Default (Roboto)</p>
                <p className="text-gray-600">
                  • font-display - Display (Pacifico)
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-roboto font-semibold text-gray-700 mb-3">
                Best Practices
              </h3>
              <ul className="space-y-2 text-sm font-roboto text-gray-600">
                <li>• Use Pacifico for brand names and special headings</li>
                <li>• Use Roboto for all body text and UI elements</li>
                <li>• Combine both fonts for visual hierarchy</li>
                <li>• Keep Pacifico usage minimal for impact</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FontDemo;
