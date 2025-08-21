/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        afolkalips: ["var(--font-afolkalips)", "sans-serif"],
        hahmlet: ["var(--font-hahmlet)", "sans-serif"],
        productsFont: ["var(--font-productsFont)", "sans-serif"],
      },
      fontWeight: {
        thin: 100,
        extralight: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      },
      letterSpacing: {
        tight3: "-0.03em",
        tight4: "-0.015em",
        tight8: "-0.08em",
      },
      lineHeight: {
        0: "0px",
      },
      spacing: {
        34: "8.5rem", // 34 * 0.25rem = 8.5rem = 136px
      },
    },
  },
  plugins: [],
};
