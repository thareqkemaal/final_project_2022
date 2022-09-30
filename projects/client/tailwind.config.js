/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
    colors: {
      "btn-500": "#009B90", //secondary color (clicked) or btn bg color
      "btn-600": "#008076", //hover color
      "txt-500": "#213360" //main color
    }
    // ,
    // screens:{
    //   "xs":"375px"
    // }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
