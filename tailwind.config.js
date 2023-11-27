/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "430px",
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        openSansFont: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
