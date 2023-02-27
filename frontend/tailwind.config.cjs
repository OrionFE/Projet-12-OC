/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'customRed':'#FF0101',
        'primaryBg': '#FBFBFB',
      }
    },
    fontFamily: {
      roboto:['Roboto' , 'sans-serif']
    }
  },
  plugins: [],
}
