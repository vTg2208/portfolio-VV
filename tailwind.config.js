// tailwind.config.js
/**  @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './public/**/*.{js,ts,jsx,tsx,html}',
    './src/**/*.{js,ts,jsx,tsx}',
    'index.html'
  ],
  darkMode: false,
  important: true,
  theme: {
    extend: {
      colors: {
        purple: {
          50: '#faf5ff',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
        pink: {
          500: '#ec4899',
          600: '#db2777',
        },
        blue: {
          500: '#3b82f6',
          600: '#2563eb',
        },
        gray: {
          50: '#f9fafb',
          400: '#9ca3af',
          600: '#4b5563',
          900: '#111827',
        },
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [],
}