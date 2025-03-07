// PriceEstimateDialog.tsx
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface PriceEstimateDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    showEstimate: boolean;
    priceEstimate: {
        price: number;
    } | null;
    formData: {
        From: string;
        To: string;
        Bike_type: string;
    };
}

export function PriceEstimateDialog({
    isOpen,
    onOpenChange,
    showEstimate,
    priceEstimate,
    formData,
}: PriceEstimateDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold text-[#0e3a6c]">Estimated Price</DialogTitle>
                </DialogHeader>

                {showEstimate && priceEstimate && (
                    <div className="p-4 bg-white rounded-xl border-2 border-[#0e3a6c]/30">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">From: {formData.From}</p>
                                <p className="font-medium">To: {formData.To}</p>
                                <p className="font-medium">Bike Type: {formData.Bike_type}</p>
                            </div>
                            <div className="text-2xl font-black text-[#0e3a6c]">
                                ₹{priceEstimate.price.toLocaleString()}
                            </div>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
