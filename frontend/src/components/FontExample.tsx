import React from "react";

const FontExample: React.FC = () => {
  return (
    <div className="p-8 space-y-6 bg-gradient-to-br from-background to-dart min-h-screen">
      {/* Pacifico Font Examples */}
      <div className="space-y-4">
        <h1 className="text-4xl font-pacifico text-accent-pink">VibeLink</h1>
        <h2 className="text-2xl brand-title text-accent-salmon">
          Connect & Share Your Vibes
        </h2>
      </div>

      {/* Roboto Font Examples */}
      <div className="space-y-4">
        <h3 className="text-xl roboto-bold text-foreground">
          Roboto Font Weights
        </h3>

        <div className="space-y-2">
          <p className="roboto-thin text-foreground">
            Roboto Thin (100) - Elegant and minimal
          </p>
          <p className="roboto-light text-foreground">
            Roboto Light (300) - Clean and readable
          </p>
          <p className="roboto-regular text-foreground">
            Roboto Regular (400) - Perfect for body text
          </p>
          <p className="roboto-medium text-foreground">
            Roboto Medium (500) - Slightly emphasized
          </p>
          <p className="roboto-bold text-foreground">
            Roboto Bold (700) - Strong and impactful
          </p>
          <p className="roboto-black text-foreground">
            Roboto Black (900) - Maximum impact
          </p>
        </div>
      </div>

      {/* Practical Usage Examples */}
      <div className="space-y-4">
        <h3 className="text-xl roboto-bold text-foreground">Practical Usage</h3>

        <div className="bg-background/50 p-6 rounded-lg border border-foreground/10">
          <h4 className="text-lg font-pacifico text-accent-pink mb-2">
            Welcome to VibeLink
          </h4>
          <p className="body-text text-foreground/80 mb-4">
            This is an example of how to use Roboto for body text. It's clean,
            readable, and works well for longer paragraphs.
          </p>
          <button className="px-4 py-2 bg-accent-pink text-white roboto-medium rounded-lg hover:bg-accent-red transition-colors">
            Get Started
          </button>
        </div>

        <div className="bg-background/50 p-6 rounded-lg border border-foreground/10">
          <h4 className="text-lg roboto-bold text-foreground mb-2">
            Using Tailwind Classes
          </h4>
          <p className="font-roboto text-foreground/80 mb-2">
            You can also use Tailwind's font utilities:
          </p>
          <ul className="font-sans text-foreground/70 space-y-1 ml-4">
            <li>
              •{" "}
              <code className="bg-foreground/10 px-2 py-1 rounded">
                font-sans
              </code>{" "}
              - Uses Roboto as primary
            </li>
            <li>
              •{" "}
              <code className="bg-foreground/10 px-2 py-1 rounded">
                font-display
              </code>{" "}
              - Uses Pacifico
            </li>
            <li>
              •{" "}
              <code className="bg-foreground/10 px-2 py-1 rounded">
                font-roboto
              </code>{" "}
              - Explicit Roboto
            </li>
            <li>
              •{" "}
              <code className="bg-foreground/10 px-2 py-1 rounded">
                font-pacifico
              </code>{" "}
              - Explicit Pacifico
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FontExample;
