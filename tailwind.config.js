/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        rdsOrange: '#EB5601',
        rdsBlue: '#159987',
        rsdDark1: '#121212',
        rdsDark2: "#32353b",
        rdsDark3: "#282C34",
        rdsDarkAccent: "#525760",
        rdsDarkAccent2: "#464b53",
        rdsDarkAccent3: "#3b3f45"
      }
    },
  },
  plugins: [require('prettier-plugin-tailwindcss')],
}
