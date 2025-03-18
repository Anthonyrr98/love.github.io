/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#99cdca',  // 荣力颜色
        secondary: '#f5a592', // 雅楠颜色
        accent: '#E75480',    // 装饰元素颜色
      },
      fontFamily: {
        'bubblegum': ['"Bubblegum Sans"', '"Comic Sans MS"', 'cursive'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
} 