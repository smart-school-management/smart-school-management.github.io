/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        bangla: ['"Noto Sans Bengali"', '"SolaimanLipi"', 'Poppins', 'Roboto', 'Arial', 'system-ui', 'sans-serif'],
        sans: ['"Noto Sans Bengali"', 'Poppins', 'Roboto', 'Arial', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Ubuntu', 'sans-serif']
      },
      colors: {
        brand: {
          50: '#eef4ff',
          100: '#dbe7fe',
          200: '#bfd3fe',
          300: '#93b4fd',
          400: '#5f8bfa',
          500: '#3b63f5',
          600: '#2542ea',
          700: '#1f33d6',
          800: '#202bad',
          900: '#1f2989',
          950: '#161a52'
        },
        accent: {
          500: '#00c896',
          600: '#00a67d'
        }
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #1f33d6 0%, #3b63f5 45%, #00c896 100%)',
        'section-gradient': 'linear-gradient(180deg, #f5f7ff 0%, #ffffff 100%)',
        'cta-gradient': 'linear-gradient(120deg, #202bad 0%, #3b63f5 50%, #00a67d 100%)'
      },
      boxShadow: {
        soft: '0 10px 40px -10px rgba(31, 51, 214, 0.25)',
        card: '0 4px 25px rgba(15, 23, 42, 0.08)'
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' }
        }
      },
      animation: {
        floaty: 'floaty 4s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
