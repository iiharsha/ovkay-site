import ContactSection from "@/components/sections/contact/ContactSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact"
}
export default function About() {
  return (
    <main>
      <section className="bg-[#efeef1] w-full h-[70vh] flex items-center justify-center">
        <h1 className="font-black font-mallory text-[36px] sm:text-[48px] md:text-[55px] lg:text-[60px] text-center tracking-tight text-wrap">{`Contact Us`}</h1>
      </section>
      <section>
        <ContactSection />
      </section>
    </main>
  )
}
