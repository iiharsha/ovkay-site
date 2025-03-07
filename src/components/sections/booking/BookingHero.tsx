import BookingPage from ".";

export default function BookingHero() {
    return (
        <div>
            <section className="bg-[#efeef1] w-full h-[630px] flex flex-col items-center justify-center">
                <h1 className="font-black font-mallory text-[36px] sm:text-[48px] md:text-[55px] lg:text-[60px] text-center tracking-tight text-wrap">{`Book Your Order`}</h1>
                <BookingPage />
            </section >
        </div>
    )
}
