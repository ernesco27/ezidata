/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        slide: "slide 0.8s forwards",
        slideUp: "slideUp 0.5s ease-out forwards",
      },
      keyframes: {
        slide: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(5)" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      screens: {
        xs: "475px",
        ...defaultTheme.screens,
      },
    },
    plugins: [require("@tailwindcss/forms")],
  },
};
