import GetFreeQuote from "@/components/common/GetFreeQuote";

export default function Home() {
  return (
    <main className="min-h-screen max-w-5xl mx-auto p-4">
      <h1 className="font-black text-[50px]">This is Home page for Ovkay.com</h1>
      <GetFreeQuote text="GET FREE QOUTE" />
    </main>
  )
}

