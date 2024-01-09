/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.jsx",
    "./src/**/*.css",
    "./src/*.jsx",
    "./src/*.css",
    //"./src/components/*.jsx", // Include component files explicitly
    //"./src/components/*.css",
  ]
  ,
  theme: {
    extend: {},
  },
  plugins: [],
}

// module.exports = {
//   mode: 'jit',
//   purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
//   darkMode: false, // or 'media' or 'class'
//   theme: {
//     extend: {},
//   },
//   variants: {
//     extend: {},
//   },
//   plugins: [],
// }
