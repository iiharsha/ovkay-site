import GetFreeQuote from "@/components/common/GetFreeQuote";
import WhyCard from "@/components/sections/whyus/WhyCard";

export default function Home() {
  const description = 'We train our team to leverage best practices to pack and deliver your belongings safely and proficiently. Equipped with the best tools, our movers apply their knowledge and experience to every scenario to deliver the best results for your move.'
  return (
    <main className="min-h-screen max-w-5xl mx-auto p-4">
      <h1 className="font-black text-[50px]">This is Home page for Ovkay.com</h1>
      <GetFreeQuote text="GET FREE QUOTE" />
      <WhyCard path="/svg/pro-movers.svg" altText="pro" heading="professional movers" description={description} />
    </main>
  )
}

