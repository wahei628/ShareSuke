/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{html,erb,rb,js,jsx,ts,tsx}",
    "./config/initializers/**/*.rb",
    "./lib/components/**/*.{rb,erb}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    darkTheme: "none",
  },
};
