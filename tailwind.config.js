/** @type {import('tailwindcss').Config} */
export default {
  content: ['./{pages,public,components}/**/*.{html,js,ts,tsx}'],
  plugins: [require('@tailwindcss/typography')],
  theme: {
    fontFamily: {
      body: ['"Zilla Slab"', 'serif'],
      display: ['"Amatic SC"', 'sans-serif'],
    },
  },
};
