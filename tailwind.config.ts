import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#371ECF',
          600: '#321BBA',
          700: '#29179B',
        }
      },
      width: {
        '640': '40rem',
      },
      height: {
        '640': '40rem',
      },
      blur: {
        '5xl': '128px',
      },
      screens: {
        'cell': '320px',
      },
    },
  },
  plugins: [],
}
export default config