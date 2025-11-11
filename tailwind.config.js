/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // New Color Palette
        'ffb-black': {
          DEFAULT: '#000000',
          light: '#2d2d2d',
          dark: '#000000',
        },
        'ffb-gold': {
          DEFAULT: '#C9A961',
          light: '#C2956E',
          dark: '#9B7653',
          shine: '#C19A6B',
          metallic: '#C9A961',
        },
        'ffb-brown': {
          DEFAULT: '#9B7653',
          light: '#C19A6B',
          dark: '#5C4033',
        },
        'ffb-gray': {
          50: '#FFFFFF',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#BEBEBE',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#000000',
        },
        'ffb-green': {
          DEFAULT: '#4A5D4A',
          light: '#5C6F5C',
          dark: '#3A4D3A',
        },
        // Legacy colors (untuk backward compatibility)
        navy: {
          DEFAULT: '#1A237E',
          light: '#3949AB',
        },
        gold: {
          DEFAULT: '#C9A961',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Poppins', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      animation: {
        'gradient': 'gradient 3s ease infinite',
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-in': 'slideIn 0.4s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'shine': 'shine 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateX(-20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        shine: {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(201, 169, 97, 0.5), 0 0 10px rgba(201, 169, 97, 0.3), inset 0 0 10px rgba(201, 169, 97, 0.2)' 
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(201, 169, 97, 0.8), 0 0 40px rgba(201, 169, 97, 0.5), inset 0 0 20px rgba(201, 169, 97, 0.4)' 
          },
        },
        glow: {
          '0%, 100%': { 
            filter: 'brightness(1) drop-shadow(0 0 2px rgba(201, 169, 97, 0.5))' 
          },
          '50%': { 
            filter: 'brightness(1.2) drop-shadow(0 0 10px rgba(201, 169, 97, 0.8))' 
          },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.5)' },
        },
      },
      backgroundSize: {
        '200': '200% 200%',
        '300': '300% 300%',
      },
      boxShadow: {
        'gold': '0 4px 14px 0 rgba(201, 169, 97, 0.39)',
        'gold-lg': '0 10px 40px rgba(201, 169, 97, 0.5)',
        'gold-xl': '0 20px 60px rgba(201, 169, 97, 0.6)',
        'gold-2xl': '0 25px 80px rgba(201, 169, 97, 0.7)',
        'black': '0 4px 14px 0 rgba(0, 0, 0, 0.39)',
        'black-lg': '0 10px 40px rgba(0, 0, 0, 0.5)',
        'inner-gold': 'inset 0 2px 4px 0 rgba(201, 169, 97, 0.3)',
      },
    },
  },
  plugins: [],
};
