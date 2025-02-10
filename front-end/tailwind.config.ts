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
        background: "var(--background)",
        foreground: "var(--foreground)",
        "red-primary": "#A91D3A",
        "red-secondary": "#780000",
        "red-tertiary": "#c1121f",
        "vanilla-primary": "#fdf0d5",
        "blue-primary": "#003049",
        "blue-secondary": "#669bbc",
        "gray-primary": "#EEEEEE",
      },
    },
  },
  plugins: [],
} satisfies Config;
