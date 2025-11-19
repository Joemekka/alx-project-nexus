/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Gilroy', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        primaryColor: '#fff',
        secondaryColor: '#E58411',
      },
    },
  },
  plugins: [],
};
