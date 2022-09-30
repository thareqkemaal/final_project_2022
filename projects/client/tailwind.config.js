/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    '../../node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily:{
        'Inter':['Inter', 'sans-serif'],
        'Public':['Public Sans', 'sans-serif']
      },
    },
    colors: {
      'main': {
        100: '#7dfff6',
        200: '#31fff0',
        300: '#00f3e1',
        400: '#00c2b4',
        500: '#009b90',
        600: '#007c73',
        700: '#00635c',
        800: '#004f4a',
        900: '#003f3b',
      },

    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
