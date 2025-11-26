/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4846FF',
        'primary-variant': '#3A38E6',
        'blue-accent': '#6EC8FF',
        'background-light': '#F0F4F8',
        'background-dark': '#121212',
        'surface-light': '#FFFFFF',
        'surface-dark': '#1E1E1E',
        'text-primary-light': '#FFFFFF',
        'text-primary-dark': '#111827',
        'text-secondary-light': '#9CA3AF',
        'text-secondary-dark': '#6B7280',
        'text-field-hint': '#858699',
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6',
        'stock-green': '#45B369',
        'stock-red': '#EF4770',
        'stock-red-light': '#F77272',
        yellow: '#FFD364',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'orbitron': ['Orbitron', 'sans-serif'],
        'satoshi': ['Satoshi', 'sans-serif'],
      },
    },
  },
  plugins: [],
}




