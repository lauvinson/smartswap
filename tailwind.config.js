import { nextui } from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
      width: {
        'super-wide': '150%', // 超过父容器宽度的宽度
      },
    },
  },
  darkMode: 'class',
  plugins: [
    require('tailwind-scrollbar'),
    nextui({
      themes: {
        light: {
          colors: {
            default: {
              // 100: '#ffffff',
            },
          },
        },
        // dark: {
        //   colors: {
        //     primary: '#FFD34E',
        //     secondary: '#EE457E',
        //     background: '#E1CA9E',
        //   },
        // },
      },
    }),
  ],
}
