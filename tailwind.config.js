/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        peach: {
          400: "#FFA07A", // Vibrant peach
          500: "#FF7F50", // Coral peach
          600: "#FF6347", // Deep coral peach
        },
      },
    },
  },
  plugins: [],
};
