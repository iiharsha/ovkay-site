import faqData from "@/data/faq-data.json"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import CallUsButton from "@/components/common/CallUsButton";

export default function Faq() {
    return (
        <main className="font-mallory bg-[#efeef1]">
            <div className="container mx-auto px-4 max-w-9xl flex flex-col lg:flex-row items-center justify-center">
                <div className="w-full flex flex-col items-start justify-center space-x-2">
                    <h1 className="w-[226px] sm:w-[257px] md:w-[300px] leading-8 sm:leading-none tracking-tight text-[36px] sm:text-[40px] md:text-[47px] font-black uppercase">
                        have questions?
                    </h1>
                    <p className="w-[226px] sm:w-[257px] md:w-[300px] text-[22px] leading-[25px] sm:text-[24px] text-[#166bac] font-extrabold mt-[12px]">
                        FREQUENTLY ASKED QUESTIONS
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="mt-6 w-full bg-white p-4 rounded-xl shadow-md mb-12">
                    <Accordion type="multiple">
                        {faqData.map((faq, index) => (
                            <AccordionItem key={index} value={`faq-${index}`} className="border-b">
                                <AccordionTrigger className="text-[18px] sm:text-[24px] font-extrabold uppercase">{faq.question}</AccordionTrigger>
                                <AccordionContent className="text-secondary text-[16px]">{faq.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
            <div className="w-full h-[50px] mx-auto max-w-9xl flex flex-col items-start justify-center px-4 container pb-12 lg:pb-14">
                <p className="leading-[25px] text-[20px] text-secondary font-medium px-4">
                    Have More Questions?
                </p>
                <CallUsButton className="lg:mb-[150px] mt-2 w-[250px] border border-black/30 shadow-md" text="080 47103622" />
            </div>
        </main>
    );
}

