import BookingSectionCard from "./BookingSectionCard"
import bookingpage from "@/data/booking-page.json"

export default function BookingPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="sr-only">Why people love our services</h2>
            <div className="px-2">
                <div className="flex flex-col items-center justify-center gap-2 sm:gap-6 sm:mt-[40px] lg:mt-[18px]">
                    {bookingpage.map((item, index) => (
                        <BookingSectionCard
                            key={index}
                            path={item.path}
                            altText={item.altText}
                            heading={item.heading}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

