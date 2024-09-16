/** @type {import('tailwindcss').Config} */
export default {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'light-gray': '#F5F5F5',
        charcoal: '#333333',
        'soft-gray': '#E0E0E0',
        'off-white': '#FAFAFA',
        'bright-blue': '#007BFF',
        'dark-gray': '#2C2C2C',
        'very-dark-gray': '#2A2A2A',
        'soft-black': '#1E1E1E',
        'medium-gray': '#3A3A3A',
      },
      transitionProperty: {
        width: 'width',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
