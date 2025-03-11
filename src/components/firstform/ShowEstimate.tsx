// PriceEstimateDialog.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PriceBreakdown } from "./PriceDetails"
import { Button } from "../ui/button"

interface PriceEstimateDialogProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    showEstimate: boolean
    priceEstimate: {
        price?: number
    } | null
    formData: {
        From: string
        To: string
        Bike_type: string
        Email: string
        Mobile: string
        Expected_Shipment_Date: string
    }
}

export function PriceEstimateDialog({
    isOpen,
    onOpenChange,
    showEstimate,
    priceEstimate,
    formData,
}: PriceEstimateDialogProps) {
    const price = priceEstimate?.price

    const formValues = {
        "From Location": formData.From,
        "To Location": formData.To,
        "Bike Type": formData.Bike_type,
        "Mobile": formData.Mobile,
        "Pick-up Date": formData.Expected_Shipment_Date,
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-lg text-[#0e3a6c] font-bold uppercase">Price Details</DialogTitle>
                </DialogHeader>

                {showEstimate && priceEstimate && (
                    <div className="p-6 bg-white rounded-xl border-2 border-[#0e3a6c]/20">
                        {/* Price highlight section */}
                        <div className="">
                            <div className="flex items-center justify-between">
                                <span className="text-secondary font-bold">Estimated Price:</span>
                                <span className="text-2xl font-black text-[#0e3a6c]">₹{price?.toLocaleString()}</span>
                            </div>
                        </div>
                        <PriceBreakdown
                            totalPrice={Number(priceEstimate?.price)}
                        />

                        {/* Details section */}
                        <div className="space-y-3">
                            {Object.entries(formValues).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between mt-2">
                                    <span className="text-secondary font-bold">{key}:</span>
                                    <span className="text-secondary">{value || "N/A"}</span>
                                </div>
                            ))}
                        </div>
                        <Button
                            type="button"
                            onClick={() => window.location.href = "/booking"}
                            className="w-full py-2 px-4 rounded-xl mt-4 text-white font-black uppercase tracking-normal bg-[#0e3a6c] hover:bg-[#052952] transition-colors"
                        >
                            Book Now
                        </Button>

                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}


