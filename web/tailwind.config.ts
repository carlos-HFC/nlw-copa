import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        gray: {
          950: '#09090A',
          900: '#121214',
          800: '#202024',
          600: '#323238',
          300: '#8D8D99',
          200: '#C4C4CC',
          100: '#E1E1E6'
        },
        green: {
          500: '#047C3F'
        },
        yellow: {
          700: '#E5CD3D',
          600: '#BBA317',
          500: '#F7DD43',
        },
        red: {
          500: '#DB4437',
        },
      },
      backgroundImage: {
        app: "url(/app-bg.png)"
      }
    },
  },
  plugins: [],
  corePlugins: {
    ringOpacity: false,
    textOpacity: false,
    backgroundOpacity: false,
    borderOpacity: false,
    divideOpacity: false,
    backdropOpacity: false,
    placeholderOpacity: false
  }
};
export default config;
