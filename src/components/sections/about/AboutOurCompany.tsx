import { Truck, MapPin, PenToolIcon as Tool, Shield, Award, Home } from "lucide-react"


export default function AboutOurCompany() {
    return (
        <div className="bg-gradient-to-b from-white to-gray-50 py-16 font-mallory">
            {/* Hero Section */}
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-secondary mb-6 uppercase">About OVKAY</h1>
                    <div className="w-24 h-1 bg-[#052952] mx-auto mb-8"></div>
                    <p className="leading-relaxed text-lg md:text-xl max-w-3xl mx-auto">
                        {`Transforming two-wheeler transportation and servicing across India with reliability, innovation, and
                        customer-focused solutions.`}
                    </p>
                </div>

                {/* Mission Section */}
                <div className="mb-20">
                    <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
                        <h2 className="text-2xl md:text-3xl font-extrabold mb-6 uppercase">Our Mission</h2>
                        <p className="text-secondary text-lg leading-relaxed mb-6">
                            {`At OVKAY, we are on a mission to streamline and transform the traditionally unorganized two-wheeler
                            transportation and servicing sector. Our goal is to provide a seamless, efficient, and trustworthy
                            solution for bike pick-up and drop services across India's metro cities. Whether you need to send your
                            bike to a service center or transport it across cities, OVKAY ensures every step of the process is
                            hassle-free and reliable.`}
                        </p>
                        <p className="text-secondary text-lg leading-relaxed">
                            {`Recognizing the gaps in the market, we have developed a comprehensive network of partnerships to bridge
                            these challenges effectively. Our collaborations with train services, courier companies, packers & movers,
                            truck carriers, and buses enable us to offer fast, safe, and secure transportation. Whether it's within
                            the city or across the country, your bike is in good hands with OVKAY`}
                        </p>
                    </div>
                </div>

                {/* Services Section */}
                <div className="mb-20">
                    <h2 className="text-2xl md:text-3xl font-extrabold mb-8 text-center uppercase">Our Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Service 1 */}
                        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-8 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#166bac]/10 text-blue-600 mb-6">
                                <Truck size={32} className="text-[#052952]" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Bike Shipping Between Cities</h3>
                            <p>Simplifying intercity bike transport with reliable solutions.</p>
                        </div>

                        {/* Service 2 */}
                        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-8 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#166bac]/10 text-blue-600 mb-6">
                                <MapPin size={32} className="text-[#052952]" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Bike Shipping Within the City</h3>
                            <p>
                                Offering convenient bike pick-up and drop services for maintenance and personal needs.
                            </p>
                        </div>

                        {/* Service 3 */}
                        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-8 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#166bac]/10 text-blue-600 mb-6">
                                <Tool size={32} className="text-[#052952]" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">In-City Bike Maintenance Services</h3>
                            <p className="text-gray-600">Ensuring your two-wheeler is serviced and returned to your doorstep.</p>
                        </div>
                    </div>
                </div>

                {/* Why Choose Us Section */}
                <div className="mb-20">
                    <h2 className="text-2xl md:text-3xl font-extrabold uppercase mb-8 text-center">Why Choose OVKAY</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#052952] text-white mb-4">
                                <Shield size={24} />
                            </div>
                            <h3 className="text-lg uppercase font-semibold mb-2">Safety & Security</h3>
                            <p className="text-center">
                                Insured shipping options and professional handling of your vehicle.
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#052952] text-white mb-4">
                                <Home size={24} />
                            </div>
                            <h3 className="text-lg uppercase font-semibold mb-2">Door To Door Convenience</h3>
                            <p className="text-center">Hassle-free pickup and delivery right at your doorstep.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#052952] text-white mb-4">
                                <Award size={24} />
                            </div>
                            <h3 className="text-lg uppercase font-semibold mb-2">Trusted Network</h3>
                            <p className="text-center">
                                Comprehensive partnerships with transportation services across India.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Closing Statement */}
                <div className="bg-[#166bac] text-white rounded-3xl p-8 md:p-12 text-center">
                    <h2 className="text-2xl md:text-3xl font-extrabold uppercase mb-6">Your Bike Deserves The Best</h2>
                    <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
                        {`We are passionate about customer satisfaction and aim to set new benchmarks in the industry. Our commitment
to innovation, safety, and convenience makes us the preferred choice for thousands of customers across
India.`}
                    </p>
                    <p className="text-xl font-bold">Choose OVKAY for Bike Shipping and Servicing you can count on.</p>
                </div>
            </div>
        </div>
    );
}
