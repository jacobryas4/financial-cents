/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      colors: {
          'fc-gray': {
            6: '#374151',
            5: '#6B7280',
            4: '#9CA3AF',
            3: '#D1D5DB',
            2: '#E5E7EB',
            1: '#F3F4F6',
          },
          'fc-red': {
            dark: '#DD1C1A',
            light: '#FEEBEB',
          },
          'fc-green': {
            dark: '#059669',
            medium: '#10B981',
            light: '#ECFDF5',
          },
        },
    },
  },
  plugins: [],
}

