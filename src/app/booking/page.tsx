import BookingPage from "@/components/sections/booking"

export default function Booking() {
  return (
    <main>
      <section className="relative w-full sm:h-[500px] flex flex-col items-center overflow-hidden">
        {/* Moving Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#166bac] via-[#5D3FD3]/50 to-[#166bac]
        animate-gradient-move opacity-50" />

        {/* Content */}
        <h1 className="relative z-10 ml-4 uppercase font-black font-mallory text-[36px] sm:text-[48px] md:text-[55px] lg:text-[60px] text-center tracking-tight text-wrap text-black">
          Book Your Order
        </h1>
        <BookingPage />
      </section>

      {/* Added padding-top to account for the overlapping BookingPage */}
      <section className="pt-32 sm:pt-36 md:pt-40">
        <div className="w-full h-[630px]">form</div>
      </section>
    </main>
  )
}


