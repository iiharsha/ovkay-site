import AboutOurCompany from "@/components/sections/about/AboutOurCompany";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About"
}

export default function About() {
  return (
    <main>
      <section className="bg-[#efeef1] w-full h-[70vh] flex items-center justify-center">
        <h1 className="font-black font-mallory text-[36px] sm:text-[48px] md:text-[55px] lg:text-[60px] text-center tracking-tight text-wrap">{`ABOUT OVKAY COMPANY`}</h1>
      </section>
      <section>
        <AboutOurCompany />
      </section>
    </main>
  )
}
