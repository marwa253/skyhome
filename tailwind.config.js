/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: { gold: { DEFAULT: '#b8935a', soft: '#d9bf94' } },
      keyframes: {
        shimmer: { from: { backgroundPosition: '200% 0' }, to: { backgroundPosition: '-200% 0' } },
        ring: { to: { transform: 'scale(1.8)', opacity: '0' } },
      },
      animation: { shimmer: 'shimmer 1.4s linear infinite', ring: 'ring 1.8s ease-out infinite' },
    },
  },
  plugins: [],
}
