import ServicesWeOffer from "@/components/sections/servicesweoffer";
import WhyUs from "@/components/sections/whyus";

export default function Home() {
  return (
    <>
      <main>
        <section className="bg-[#efeef1] w-full h-[70vh] flex items-center justify-center">
          <h1 className="font-bold text-[50px] text-center">{`OVKAY.COM :)`}</h1>
        </section>
        <section>
          <ServicesWeOffer />
        </section>
        <section>
          <WhyUs />
        </section>
      </main>
    </>
  )
}

