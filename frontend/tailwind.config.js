/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
        },
        danger: {
          50: '#fef2f2',
          500: '#ef4444',
        }
      }
    },
  },
  plugins: [],
}
