import React from "react";
import { Button } from "../ui/button";

interface QuoteButtonProps {
    showEstimate: boolean;
    isValid: boolean;
    isSubmitting: boolean;
    onGetQuote: () => void;
    handleNewQuote: () => void;
}

export default function QuoteButton({
    showEstimate,
    isValid,
    isSubmitting,
    onGetQuote,
    handleNewQuote
}: QuoteButtonProps) {
    return (
        <div className="col-span-2">
            {!showEstimate ? (
                <Button
                    type="button"
                    onClick={onGetQuote}
                    className={`w-full py-3 px-4 rounded-xl text-white font-black uppercase tracking-normal transition-colors ${isValid ? "bg-[#0e3a6c] hover:bg-[#052952]" : "bg-gray-400 cursor-not-allowed"
                        }`}
                    disabled={!isValid || isSubmitting}
                >
                    {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Fetching Your Quote...</span>
                        </div>
                    ) : (
                        "Get Quote"
                    )}
                </Button>
            ) : (
                <div className="flex items-center justify-center gap-4">
                    <Button
                        onClick={handleNewQuote}
                        className="w-full py-3 px-4 rounded-xl bg-gray-200 text-gray-800 font-bold uppercase tracking-normal hover:bg-gray-300 transition-colors"
                    >
                        New Quote
                    </Button>
                    <Button
                        onClick={() => window.location.href = "/booking"}
                        className="w-full py-3 px-4 rounded-xl text-white font-black uppercase tracking-normal bg-[#0e3a6c] hover:bg-[#052952] transition-colors"
                    >
                        Book Now
                    </Button>
                </div>
            )}
        </div>
    );
}

