/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        petrol: '#1A3A3A',
        'petrol-light': '#2A5A5A',
        coral: '#F26C4F',
        'coral-light': '#F5896F',
        cream: '#FAFAF8',
        'cream-dark': '#F0EDE8',
      },
      fontFamily: {
        sans: ['Bricolage Grotesque', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
