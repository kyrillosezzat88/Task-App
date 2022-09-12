/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors:{
      primary:'#17223b',
      primary_light:'#263859',
      secondary:'#ff6768',
      grey_dark:"#6b778d",
      grey_light:'#dadada',
      white:'#fff',
      green:'#08ffc8',
      black:'#111',
      orange:"#ffb549",
      
    },
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '992px',
      'lg': '1200px',
      'xl': '1386px',
      "2xl" : "1538px",
    },
    container:{
      center:true,
      padding:{
        xs:"20px",
      }
    },
    extend: {},
  },
  plugins: [],
}
