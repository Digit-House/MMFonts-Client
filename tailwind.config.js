/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%': { transform: 'translate(2px, 1px) rotate(0deg)' },
          '20%': { transform: 'translate(-3px, 0px) rotate(3deg)' },
          '10%': { transform: 'translate(-1px, -2px) rotate(-2deg)' },
          '30%': { transform: 'translate(0px, 2px) rotate(0deg)' },
          '40%': { transform: 'translate(1px, -1px) rotate(1deg)' },
          '50%': { transform: 'translate(-1px, 2px) rotate(-1deg)' },
          '60%': { transform: 'translate(-3px, 1px) rotate(0deg)' },
          '70%': { transform: 'translate(2px, 1px) rotate(-2deg)' },
          '80%': { transform: 'translate(-1px, -1px) rotate(4deg)' },
          '90%': { transform: 'translate(2px, 2px) rotate(0deg)' },
          '100%': { transform: 'translate(1px, -2px) rotate(-1deg)' },
        },
        moveLetter: {
          '0%': { transform: 'translateX(-15vw)', opacity: '0' },
          '33.3%': { transform: 'translateX(0) ', opacity: '1' },
          '66%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(15vw) ', opacity: '0' },
        },
        movingLine: {
          '0%': {
            opacity: '0',
            width: '0',
          },
          '33.3%': {
            opacity: '0.8',
            width: '100%',
          },
          '66%': {
            opacity: '0.8',
            width: '100%',
          },
          '85%': {
            width: '0',
            left: 'initial',
            right: '0',
            opacity: '1',
          },
          '100%': {
            opacity: '0',
            width: '0',
          },
        },
      },
      animation: {
        shake: 'wiggle 0.8s linear infinite',
        moveLetters: 'moveLetter 2.4s infinite ease-in-out',
        moveLine: 'movingLine 2.4s infinite ease-in-out',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        acre: ['var(--font-acre)'],
      },
    },
    colors: {
      white: '#fff',
      primary: '#E4D1AC',
      secondary: '#EDB92B',
      darkblue: '#292D53',
      lightblue: '#365880',
      softblue: '#4d6c91',
      softgold: '#e2c38a',
      secondaryText: '#4e4f51',
      darkSecondaryText: '#f5f3ea',
      red: '#ff0000',
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
    },
  ],
};
