import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface PriceBreakdownProps {
    totalPrice: number
}

export function PriceBreakdown({ totalPrice }: PriceBreakdownProps) {
    // Calculate GST and insurance
    const gstAmount = totalPrice * 0.18
    const insuranceAmount = totalPrice * 0.03

    // Random costs (not exceeding 500)
    const pickupCost = Math.floor(Math.random() * 300) + 100 // Between 100-400
    const packingCost = Math.floor(Math.random() * 300) + 100 // Between 100-400
    const loadingCost = Math.floor(Math.random() * 200) + 100 // Between 100-300
    const transitCost = Math.floor(Math.random() * 400) + 100 // Between 100-500

    const breakdownItems = [
        { label: "GST (18%)", amount: gstAmount },
        { label: "Insurance (3%)", amount: insuranceAmount },
        { label: "Pickup Cost", amount: pickupCost },
        { label: "Packing & Unpacking", amount: packingCost },
        { label: "Loading & Unloading", amount: loadingCost },
        { label: "Transit & Delivery", amount: transitCost },
    ]

    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="price-breakdown">
                <AccordionTrigger className="text-sm font-medium text-gray-700">View Price Breakdown</AccordionTrigger>
                <AccordionContent>
                    <div className="space-y-2 pt-2">
                        {breakdownItems.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                                <span className="text-black">{item.label}</span>
                                <span className="font-medium">
                                    ₹{item.amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                </span>
                            </div>
                        ))}
                        <div className="pt-2 mt-2 border-t border-gray-200 flex justify-between font-medium">
                            <span>Total</span>
                            <span>₹{totalPrice.toLocaleString()}</span>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}


