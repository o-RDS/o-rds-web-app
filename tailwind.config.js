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
      },
      animation: {
        inOut: 'error 1s forwards linear'
      },
      keyframes: {
        error: {
          '0%': { transform: 'translateY(-10vw)' },
          '100%': { transform: 'translateY(0vw)' },
        }
      },
      boxShadow: {
        blur: '0 4px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
      }
    },
  },
  plugins: [require('prettier-plugin-tailwindcss')],
}
