import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { mallory } from "@/assets/fonts";

export const metadata: Metadata = {
  title: "Bike Transport Services | Fast Bike Shifting | Ovkay",
  description: "Reliable bike transportation services across India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn('antialiased', mallory.variable)}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

