import GetFreeQuote from "@/components/common/GetFreeQuote";
import ServicesWeOffer from "@/components/sections/servicesweoffer";
import WhyUs from "@/components/sections/whyus";
import WhyCard from "@/components/sections/whyus/WhyCard";

export default function Home() {
  const description = 'We train our team to leverage best practices to pack and deliver your belongings safely and proficiently. Equipped with the best tools, our movers apply their knowledge and experience to every scenario to deliver the best results for your move.'
  return (
    <>
      <main>
        <section className="bg-[#efeef1] w-full">
          <h1 className="font-black text-[50px] text-center">This is Home page for Ovkay.com</h1>
          <GetFreeQuote text="GET FREE QUOTE" />
        </section>
        <section>
          <WhyUs />
        </section>
        <section>
          <ServicesWeOffer />
        </section>
      </main>
    </>
  )
}

