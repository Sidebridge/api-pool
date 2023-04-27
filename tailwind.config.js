/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Aeonik", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#D1F225",
        },
        body: "#0B0B0B",
        dark: {
          DEFAULT: "#151515",
          matte: {
            DEFAULT: "#181818",
            new: "#ODODOD",
          },
        },
        light: {
          DEFAULT: "#E2E2E2",
          new: "#EEEEEE",
        },
        accent: {
          DEFAULT: "#F2B925",
        },
        grey: {
          DEFAULT: "#CECECE",
          legacy: "#6A6A6A",
          light: "#222222",
          lighter: "#A1A1A1",
          faint: "#2C2C2C",
          border: "#201F1F",
          label: "#727272",
        },
      },
      keyframes: {
        fill: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        unfill: {
          "0%": { width: "100%" },
          "100%": { width: "0%" },
        },
        spin3d: {
          "0%": {
            transform: "rotateY(0deg)",
          },
          "50%": {
            transform: "rotateY(180deg)",
          },
          "100%": {
            transform: "rotateY(360deg)",
          },
        },
      },
      animation: {
        "ping-slow": "ping 6s cubic-bezier(0, 0, 0.2, 1) alternate",
        fill: "fill 0.3s ease-in-out",
        unfill: "unfill 0.3s ease-in-out",
        spin3d: "spin3d 2s linear infinite",
      },
      transitionProperty: {
        height: "height",
      },
    },
  },
  variants: {
    transitionProperty: ["responsive", "hover", "focus"],
  },
  plugins: [],
};
