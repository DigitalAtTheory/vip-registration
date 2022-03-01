module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#FFF2BA",
          100: "#FFEEA6",
          200: "#FEE67D",
          300: "#FEDE54",
          400: "#FED72C",
          500: "#FECF03",
          600: "#C8A301",
          700: "#907501",
          800: "#584800",
          900: "#201A00",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
