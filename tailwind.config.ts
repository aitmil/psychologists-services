import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'add-color': 'rgba(25, 26, 21, 0.3)',
        'border-color': 'rgba(25, 26, 21, 0.1)',
        overlay: 'rgba(25, 26, 21, 0.6)',
        'semi-text': 'rgba(25, 26, 21, 0.5)',
        white: '#fbfbfb',
        'main-background': '#fbfbfb',
        'secondary-background': '#ffffff',
        black: '#191a15',
        'light-color': '#8a8a89',
        'orange-transparent': 'rgba(252, 131, 44, 0.2)',
        'orange-light': '#fc832c',
        'orange-dark': '#f37113',
        yellow: '#ffc531',
        'yellow-icon': '#fbc75e',
        green: '#38cd3e',
        'green-icon': '#54be96',
        light: 'rgba(251, 251, 251, 0.5)',
      },
      rotate: {
        '15': '15deg',
        '345': '345deg',
      },
    },
  },
  plugins: [],
} satisfies Config;
