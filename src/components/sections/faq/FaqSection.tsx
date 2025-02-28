import faqData from "@/data/faq-data.json"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

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
                                <AccordionTrigger className="text-[24px] font-extrabold uppercase">{faq.question}</AccordionTrigger>
                                <AccordionContent className="text-secondary text-[16px]">{faq.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </main>
    );
}

