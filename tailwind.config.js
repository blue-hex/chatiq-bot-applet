/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'redhat': ['"Red Hat Display"', 'sans-serif']
      },
      height: {
        'fill-available': '-webkit-fill-available',
      },
      width: {
        'fill-available': '-webkit-fill-available',
      },
    },
  },
  plugins: [],
}
