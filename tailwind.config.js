/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        grey: {
          1: '#616366',
          2: '#e0e0e0',
          3: '#f1f1f1',
        },
        blue: {
          1: '#15417a',
          2: '#286ac7',
          3: '#aac7f0',
          4: '#e9edf2',
          5: '#0f417a',
        },
        white: {
          1: '#f7f7f7',
        },
        yellow: {
          1: '#facb21',
        },
      },
      fontSize: {
        base: '16px',
        xxxl: '28pt',
        xxl: '24pt',
        xl: '18pt',
        l: '15pt',
        m: '13.5pt',
        s: '12pt',
        xs: '10pt',
        xxs: '8pt',
      },
    },
  },
  plugins: [],
};
