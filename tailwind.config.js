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
      },
      animation: {
        shake: 'wiggle 0.8s linear infinite',
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
    },
  },
  plugins: [],
};
