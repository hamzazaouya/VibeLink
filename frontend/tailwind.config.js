/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#2E294E",
        foreground: "#E0E1E9",
        dart: "#111418", // Deep dark background
        muted: "#E0E1E9",
        alert: "#FB6D6C",
        accent: {
          pink: "#FD297B",
          red: "#FF5864",
          salmon: "#FF655B",
        },
        vibelink: {
          gradient: {
            start: "#FD297B", // pink
            middle: "#FF655B", // salmon
            end: "#FF5864", // red
          },
        },
        twilight: {
          gradient: {
            start: "#2E294E", // dark indigo
            middle: "#3d3458", // soft purple
            end: "#2E294E", // same as start
          },
        },
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        secondary: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7c3aed",
          800: "#6b21a8",
          900: "#581c87",
        },
      },
      fontFamily: {
        sans: ["Roboto", "Inter", "system-ui", "sans-serif"],
        display: ["Pacifico", "cursive"],
        roboto: ["Roboto", "sans-serif"],
        pacifico: ["Pacifico", "cursive"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "bounce-subtle": "bounceSubtle 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        bounceSubtle: {
          "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
          "40%": { transform: "translateY(-5px)" },
          "60%": { transform: "translateY(-3px)" },
        },
      },
    },
  },
  plugins: [],
};
