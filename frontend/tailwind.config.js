/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff5fb",
          100: "#dce9f6",
          200: "#b8d3ee",
          300: "#8bb6e2",
          400: "#5e98d4",
          500: "#3b78c3",
          600: "#2f5fa0",
          700: "#24477a",
          800: "#1a3154",
          900: "#122035"
        },
        ink: {
          50: "#f7f8fb",
          100: "#eef1f6",
          200: "#d6dde9",
          300: "#b3c0d4",
          400: "#8798b8",
          500: "#61749a",
          600: "#4b5c7d",
          700: "#394562",
          800: "#273149",
          900: "#1a2233"
        }
      },
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
        display: ["Playfair Display", "serif"]
      },
      boxShadow: {
        soft: "0 12px 30px rgba(15, 45, 80, 0.12)",
        "soft-sm": "0 6px 18px rgba(15, 45, 80, 0.1)"
      },
      borderRadius: {
        xl2: "1.25rem"
      }
    }
  },
  plugins: []
};
