import CallUsButton from "@/components/common/CallUsButton";

export default function ContactSection() {
    return (
        <main className="font-mallory bg-white">
            <div className="container mx-auto px-4 max-w-9xl flex flex-col items-start justify-center gap-4">
                <h1 className="w-full leading-8 sm:leading-none tracking-tight text-[26px] sm:text-[36px] font-bold uppercase pb-4 pt-4">
                    HAVE ANY QUESTIONS?<br />CALL US.
                </h1>
                <div className="font-mallory mb-4 flex flex-col items-start justify-center gap-4">
                    <div className="">
                        <CallUsButton text="080 47103622" className="border border-black/40 shadow-md px-[25px] w-[250px] h-[50px]" />
                    </div>
                    <a
                        href="mailto:support@ovkay.com"
                        className="ml-2 relative text-[20px] text-secondary font-semibold uppercase
        before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full
        before:bg-current before:transition-all before:duration-300 hover:before:w-0"
                    >
                        support@ovkay.com
                    </a>

                    {/* Address Section */}
                    <div className="flex items-start gap-x-2">
                        <svg
                            className="w-6 h-6 text-gray-600 flex-shrink-0 mt-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fillRule="evenodd"
                                d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <p className="text-[16px] leading-[20px] text-secondary">
                            3rd-Floor, T-Hub 2.0, Madhapur <br /> Hyderabad, Telangana 500081
                        </p>
                    </div>

                    {/* Working Hours Section */}
                    <div className="flex items-start gap-x-2">
                        <svg
                            className="w-6 h-6 text-gray-600 flex-shrink-0 mb-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                        <p className="text-[16px] sm:text-[18px] text-secondary">
                            Mon–Sat: 9am – 6pm <br />
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}
