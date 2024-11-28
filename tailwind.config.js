/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#1677ff",
          dark: "#1668dc",
        },
        background: {
          light: "#f5f5f5",
          dark: "#1f1f1f",
        },
        dark: "#ffffff",
      },
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.1)",
      },
      spacing: {
        18: "4.5rem",
      },
      minWidth: {
        card: "280px",
      },
      maxWidth: {
        container: "1200px",
      },
      height: {
        card: "160px",
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
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
      },
    },
  },
};
