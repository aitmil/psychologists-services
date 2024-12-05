import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

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
        'light-color': '#8a8a89',
        'orange-transparent': 'rgba(252, 131, 44, 0.2)',
        'orange-light': '#fc832c',
        'orange-dark': '#f37113',
        yellow: '#ffc531',
        'yellow-icon': '#fbc75e',
        green: '#38cd3e',
        'green-icon': '#54be96',
      },
    },
  },
  plugins: [daisyui],
} satisfies Config;
