import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#1669aa",
          dark: "#53a8e9",
        },
        primary: {
          DEFAULT: "#0e3a6c",
          dark: "#93bff1",
        },
        secondary: {
          DEFAULT: "#052952",
          dark: "#add1fa",
        },
        accent: {
          DEFAULT: "#FFC107",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
