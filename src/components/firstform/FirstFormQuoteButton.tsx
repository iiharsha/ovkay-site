import React from "react";

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
                <button
                    type="button"
                    onClick={onGetQuote}
                    className={`w-full py-3 px-4 rounded-xl text-white font-black uppercase tracking-normal transition-colors ${isValid ? "bg-[#0e3a6c] hover:bg-[#052952]" : "bg-gray-400 cursor-not-allowed"
                        }`}
                    disabled={!isValid || isSubmitting}
                >
                    {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Processing...</span>
                        </div>
                    ) : (
                        "Get Quote Now"
                    )}
                </button>
            ) : (
                <div className="flex items-center justify-center gap-4">
                    <button
                        type="button"
                        onClick={handleNewQuote}
                        className="w-full py-3 px-4 rounded-xl bg-gray-200 text-gray-800 font-bold uppercase tracking-normal hover:bg-gray-300 transition-colors"
                    >
                        Start New Quote
                    </button>
                    <button
                        type="button"
                        onClick={() => window.location.href = "/booking"}
                        className="w-full py-3 px-4 rounded-xl text-white font-black uppercase tracking-normal bg-[#0e3a6c] hover:bg-[#052952] transition-colors"
                    >
                        Book Now
                    </button>
                </div>
            )}
        </div>
    );
}

