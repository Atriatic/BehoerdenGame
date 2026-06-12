/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        petrol: '#1A3A3A',
        'petrol-light': '#2A5A5A',
        'petrol-dark': '#0F2424',
        coral: '#F26C4F',
        'coral-light': '#F5896F',
        'coral-dark': '#D94F34',
        cream: '#FAFAF8',
        'cream-dark': '#F0EDE8',
        'cream-darker': '#E5E0D8',
      },
      fontFamily: {
        sans: ['Bricolage Grotesque', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'stamp-in': 'stampIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-3deg)' },
          '50%': { transform: 'translateY(-12px) rotate(3deg)' },
        },
        stampIn: {
          '0%': { transform: 'scale(2) rotate(-20deg)', opacity: '0' },
          '100%': { transform: 'scale(1) rotate(-15deg)', opacity: '0.9' },
        },
      },
    },
  },
  plugins: [],
};
