/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src//html/*.html",
    "./src/javascript/*.js"
  ],
  theme: {
    extend: {
      fontFamily:{
        'sans': ['Roboto','Helvetica', 'Arial', 'sans-serif'],
        'serif': ['ui-serif', 'Georgia'],
        'mono': ['ui-monospace', 'SFMono-Regular'],
      }
    },
  },
  plugins: [],
}
