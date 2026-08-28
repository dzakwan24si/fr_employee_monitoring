/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fr-dark-teal': '#0a4239', // Approximate Dark Teal
        'fr-leaf-green': '#2c8f42', // Approximate Leaf Green
        'fr-bg-light': '#f5f7fa',
      },
    },
  },
  plugins: [],
}
