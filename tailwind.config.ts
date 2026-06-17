import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#faf8f7',
          100: '#f4f1ed',
          200: '#e8e2db',
          300: '#ddd3c9',
          400: '#c9b5a1',
          500: '#b5977a',
          600: '#8b6f47',
          700: '#6b5635',
          800: '#4a3d28',
          900: '#3d311f',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
