import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { cn } from "@/lib/utils";
import { mallory } from "@/assets/fonts";
import { Suspense } from "react";
import Loading from "@/components/common/Loading";

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
        <Suspense fallback={<Loading />} >
          <Header />
          {children}
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}

