/** @type {import('tailwindcss').Config} */
export default {
  content: ["./{pages,public,templates}/**/*.{html,js,ts,tsx}"],
  plugins: [],
  theme: {
    fontFamily: {
      body: ['"Zilla Slab"', "serif"],
      display: ['"Amatic SC"', "sans-serif"],
    },
  },
};
