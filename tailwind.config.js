/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Base colors from your current theme
        'body-light': '#f5f5f5',
        'container-light': '#ffffff',
        'title-light': '#333333',
        'text-light': '#555555',
        'primary-light': '#0078d7',
        'hover-light': '#005a9e',
        'button-light': '#0078d7',
        'button-text-light': '#ffffff',
        'tag-bg-light': '#e6e6e6',
        
        // Dark theme colors
        'body-dark': '#1e1e1e',
        'container-dark': '#2e2e2e',
        'title-dark': '#ffffff',
        'text-dark': '#d1d1d1',
        'primary-dark': '#f7e02a',
        'hover-dark': '#985eff',
        'button-dark': '#bb86fc',
        'button-text-dark': '#1e1e1e',
        'tag-bg-dark': '#515151',
        
        // Status colors
        'success': '#4caf50',
        'error': '#f44336',
        'warning': '#ff9800',
        'info': '#2196f3',
        
        // Border colors
        'border-light': 'rgba(0, 0, 0, 0.1)',
        'border-dark': 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'big': '2.5rem',
        'h1': '2.25rem',
        'h2': '1.5rem',
        'h3': '1.25rem',
        'normal': '1rem',
        'small': '0.875rem',
        'smaller': '0.813rem',
        'tiny': '0.625rem',
      },
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'semi-bold': '600',
      },
      spacing: {
        'header': '3rem',
      },
      maxWidth: {
        'container': '968px',
      },
      screens: {
        'sm': '350px',
        'md': '576px',
        'lg': '768px',
        'xl': '992px',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateY(0)' },
          '30%': { transform: 'translateY(3.75rem)' },
        }
      },
      animation: {
        scroll: 'scroll 2s ease infinite',
      }
    },
  },
  plugins: [],
}