/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        title:["title","sans-serif"],
        syne:["syne","sans-serif"],     
        exo:["exo","sans-serif"],     
        header:["Fontdiner Swanky","sans-serif"],     
       },

    },
  },
  plugins: [],
}