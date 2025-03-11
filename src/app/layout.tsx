import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { cn } from "@/lib/utils";
import { mallory } from "@/assets/fonts";
import { Suspense } from "react";
import Loading from "@/components/common/Loading";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: {
    default: "Bike Transport & Shipping Services | Ovkay",
    template: "%s | Reliable Bike Services | Ovkay"
  },
  description: "Ship Your Bike Anywhere Across India.",
  twitter: {
    card: "summary_large_image"
  }
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
          <main>
            {children}
          </main>
          <Toaster position="top-center" richColors />
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}

