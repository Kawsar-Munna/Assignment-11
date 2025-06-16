/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kindblue: '#01186c',
      },
      backgroundImage: {
        'kind-gradient': 'linear-gradient(135deg, #01186c,rgb(7, 14, 34))',
      },
    },
  },
  plugins: [],
}

