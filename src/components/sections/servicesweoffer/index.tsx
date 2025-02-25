
import services from "@/data/service-we-offer.json"
import ServiceCard from "./ServiceCard"

export default function ServicesWeOffer() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="section-header text-center">Services We Offer</h2>
            <h2 className="sr-only">Why people love our services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:mt-[40px] lg:mt-[48px]">
                {services.map((item, index) => (
                    <ServiceCard
                        key={index}
                        path={item.path}
                        altText={item.altText}
                        heading={item.heading}
                        description={item.description}
                    />
                ))}
            </div>
        </div>
    )
}


