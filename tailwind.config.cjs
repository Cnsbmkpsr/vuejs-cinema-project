/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        transparent: {
          full: 'transparent',
          dark: {
            50: 'rgba(0, 0, 0, 0.05)',
            100: 'rgba(0, 0, 0, 0.1)',
            200: 'rgba(0, 0, 0, 0.2)',
            300: 'rgba(0, 0, 0, 0.3)',
            400: 'rgba(0, 0, 0, 0.4)',
            500: 'rgba(0, 0, 0, 0.5)',
            600: 'rgba(0, 0, 0, 0.6)',
            700: 'rgba(0, 0, 0, 0.7)',
            800: 'rgba(0, 0, 0, 0.8)',
            900: 'rgba(0, 0, 0, 0.9)'
          },
          light: {
            50: 'rgba(255, 255, 255, 0.05)',
            100: 'rgba(255, 255, 255, 0.1)',
            200: 'rgba(255, 255, 255, 0.2)',
            300: 'rgba(255, 255, 255, 0.3)',
            400: 'rgba(255, 255, 255, 0.4)',
            500: 'rgba(255, 255, 255, 0.5)',
            600: 'rgba(255, 255, 255, 0.6)',
            700: 'rgba(255, 255, 255, 0.7)',
            800: 'rgba(255, 255, 255, 0.8)',
            900: 'rgba(255, 255, 255, 0.9)'
          }
        }
      }
    }
  },
  plugins: []
}
