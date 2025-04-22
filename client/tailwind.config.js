/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8a4af3',
        cement: '#8c8c8c',
      },
    },
  },
  plugins: [],
}
