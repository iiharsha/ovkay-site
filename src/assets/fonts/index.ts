import localFont from "next/font/local";

export const mallory = localFont({
  src: [
    {
      path: "./Mallory-Book.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Mallory-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Mallory-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Mallory-Black.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./Mallory-Ultra.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-mallory",
});
