/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#161622',
        secondary: {
          DEFAULT: '#FF9C01',
          100: '#FF9001',
          200: '#FF8E01',
        },
        black: {
          DEFAULT: '#000',
          100: '#1E1E2D',
          200: '#232533',
        },
        gray: {
          100: '#CDCDE0',
        },
      },
      fontFamily: {
        exo: ['Exo-Regular', 'sans-serif'],
        exoBlack: ['Exo-Black', 'sans-serif'],
        exoBold: ['Exo-Bold', 'sans-serif'],
        exoExtraBold: ['Exo-ExtraBold', 'sans-serif'],
        exoExtraLight: ['Exo-ExtraLight', 'sans-serif'],
        exoLight: ['Exo-Light', 'sans-serif'],
        exoMedium: ['Exo-Medium', 'sans-serif'],
        exoRegular: ['Exo-Regular', 'sans-serif'],
        exoSemiBold: ['Exo-SemiBold', 'sans-serif'],
        exoThin: ['Exo-Thin', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
