/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        slide: "slide 0.8s forwards",
      },
      keyframes: {
        slide: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(5)" },
        },
      },
    },
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
