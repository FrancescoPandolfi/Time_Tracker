/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
        colors: {
            'main-background': '#1D1D20',
            'gray-background': '#3D3C3F',
        }
    },
  },
  plugins: [],
}
