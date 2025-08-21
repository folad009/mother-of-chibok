import localFont from "next/font/local";

export const afolkalips = localFont({
    src: "../public/assets/fonts/Afolkalips.ttf",
    variable: "--font-afolkalips",
    display: "swap",
    weight: "400",
    style: "normal",
})

export const hahmlet = localFont({
    src: "../public/assets/fonts/Hahmlet-VariableFont_wght.ttf",
    variable: "--font-hahmlet",
    display: "swap",
    weight: "100 900",
    style: "normal",
})

export const productsFont = localFont({
  src: [
    {
      path: "../public/assets/fonts/Product-Sans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/Product-Sans-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/assets/fonts/Product-Sans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-productsFont",
  display: "swap",
})