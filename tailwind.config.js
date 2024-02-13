/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      flexBasis:{
        '58': "14.1869rem",
        "38": "9.1rem"
      }
    },
  },
  plugins: [],
}