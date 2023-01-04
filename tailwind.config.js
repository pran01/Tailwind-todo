/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "bgclr-dark": "#0A2647",
        "bgclr-light": "#144272",
      },
      fontFamily: {
        "josefin-sans": ['"Josefin Sans"', "sans-serif"],
        "passion-conflict": ['"Passions Conflict"', "cursive"],
      },
    },
  },
  plugins: [],
};
