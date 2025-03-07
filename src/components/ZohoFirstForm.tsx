'use client'
import Logo from "@/components/layout/LogoHeader";
import { useState, type FormEvent, useEffect } from "react"
import { PriceEstimateDialog } from "./ShowEstimate";
import FormTerms from "@/components/common/FormTerms";

interface LeadFormData {
    Last_Name: string;
    Lead_Status: string;
    From: string;
    To: string;
    Bike_type: string;
    Lead_Source: string;
    Email: string;
    Mobile: string;
    Expected_Shipment_Date: string;
    Estimated_Amount?: number;
}

interface PriceEstimate {
    price: number;
    currency: string;
}

export default function ZohoFirstForm() {
    const [formData, setFormData] = useState<LeadFormData>({
        Last_Name: "",
        Lead_Status: "From Website",
        From: "",
        To: "",
        Bike_type: "",
        Lead_Source: "",
        Email: "",
        Mobile: "",
        Expected_Shipment_Date: "",
    })

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [priceEstimate, setPriceEstimate] = useState<PriceEstimate | null>(null)
    const [showEstimate, setShowEstimate] = useState(false)
    const [formComplete, setFormComplete] = useState(false)
    const [leadCreated, setLeadCreated] = useState(false)

    const bikeTypes = ["61- 250CC", "250+CC", "EV Bike", "Premium", "Non Working Bike"]
    const hearingSources = ["Google Search", "Instagram", "Facebook", "Referral", "Public Boards"]
    const locations = ["Hyderabad", "Bengaluru", "Chennai", "Mumbai", "New Delhi",
        "Kolkata", "Pune", "Visakhapatnam", "Vijayawada", "Kakinada", "Rajahmundry", "Guntur"
    ]

    // Check if all required fields are filled
    useEffect(() => {
        const requiredFields = [
            formData.Last_Name,
            formData.From,
            formData.To,
            formData.Bike_type,
            formData.Lead_Source,
            formData.Mobile
        ];

        setFormComplete(requiredFields.every(field => field.trim() !== ""));
    }, [formData]);

    const fetchPriceAndCreateLead = async () => {
        if (!formData.From || !formData.To || !formData.Bike_type) return;

        setIsSubmitting(true);
        setError(null);

        try {
            // Step 1: Fetch price estimate
            const priceResponse = await fetch("/api/zoho/price-estimate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    from: formData.From,
                    to: formData.To,
                    bikeType: formData.Bike_type
                }),
            });

            if (!priceResponse.ok) {
                throw new Error("Failed to fetch price estimate");
            }

            const priceData = await priceResponse.json();
            setPriceEstimate(priceData);
            setShowEstimate(true);
            setIsDialogOpen(true);

            // Step 2: Create lead with the estimated price
            const leadData = {
                ...formData,
                Estimated_Amount: priceData.price
            };

            const leadResponse = await fetch("/api/zoho/leads", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(leadData),
            });

            let responseData;
            try {
                const textData = await leadResponse.text();
                responseData = textData ? JSON.parse(textData) : null;
            } catch (parseError) {
                console.error("Error parsing response:", parseError);
                throw new Error("Invalid response from server");
            }

            if (!leadResponse.ok) {
                throw new Error(responseData?.error || "Failed to create lead");
            }

            setLeadCreated(true);

        } catch (error) {
            console.error("Error:", error);
            setError(error instanceof Error ? error.message : "An unknown error occurred");
            setPriceEstimate(null);
            setShowEstimate(false);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGetQuote = () => {
        if (formComplete) {
            fetchPriceAndCreateLead();
        } else {
            setError("Please fill all required fields to get a quote");
            setTimeout(() => setError(null), 3000);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // If lead is already created, just show success message
        if (leadCreated) {
            setSuccess(true);

            // Reset form after submission
            setTimeout(() => {
                setFormData({
                    Last_Name: "",
                    Lead_Status: "New",
                    From: "",
                    To: "",
                    Bike_type: "",
                    Lead_Source: "",
                    Email: "",
                    Mobile: "",
                    Expected_Shipment_Date: "",
                });
                setPriceEstimate(null);
                setShowEstimate(false);
                setLeadCreated(false);
                setSuccess(false);
            }, 3000);
        } else {
            setError("Please get a quote first");
            setTimeout(() => setError(null), 3000);
        }
    };

    return (
        <div className="mx-auto mt-10 p-6 bg-[#EFEEF1] rounded-lg font-mallory">
            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-xl border border-red-300">{error}</div>}

            {success && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-xl border border-green-300">
                    Thank You for your response! Our Team will contact you right away!
                </div>
            )}

            <div className="flex items-center justify-center m-4">
                <Logo size="sm" />
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2">
                    <div>
                        <label className="block mb-2">Name</label>
                        <input
                            type="text"
                            value={formData.Last_Name}
                            onChange={(e) => setFormData({ ...formData, Last_Name: e.target.value })}
                            className="w-full p-2 border rounded-xl"
                            required
                            placeholder="Enter full name"
                            disabled={showEstimate}
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Email</label>
                        <input
                            type="email"
                            value={formData.Email}
                            onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
                            className="w-full p-2 border rounded-xl"
                            placeholder="Enter email"
                            disabled={showEstimate}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2">
                    <div>
                        <label className="block mb-2">Mobile *</label>
                        <input
                            type="text"
                            value={formData.Mobile}
                            onChange={(e) => setFormData({ ...formData, Mobile: e.target.value })}
                            className="w-full p-2 border rounded-xl"
                            required
                            pattern="[0-9]{10}"
                            title="Please enter a valid 10-digit mobile number"
                            placeholder="Enter Valid Phone Number"
                            disabled={showEstimate}
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Expected Shipment Date</label>
                        <input
                            type="date"
                            value={formData.Expected_Shipment_Date}
                            onChange={(e) => setFormData({ ...formData, Expected_Shipment_Date: e.target.value })}
                            className="w-full p-2 border rounded-xl"
                            min={new Date().toISOString().split("T")[0]}
                            disabled={showEstimate}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2">
                    <div>
                        <label className="block mb-2">From Location</label>
                        <select
                            value={formData.From}
                            onChange={(e) => setFormData({ ...formData, From: e.target.value })}
                            className="w-full p-2 border rounded-xl bg-white"
                            required
                            disabled={showEstimate}
                        >
                            <option value="" disabled>Pick-Up Point</option>
                            {locations.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2">To Location</label>
                        <select
                            value={formData.To}
                            onChange={(e) => setFormData({ ...formData, To: e.target.value })}
                            className="w-full p-2 border rounded-xl bg-white"
                            required
                            disabled={showEstimate}
                        >
                            <option value="">Drop-Off Point</option>
                            {locations.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="col-span-2">
                    <label className="block mb-2 text-primary text-[14px] font-medium">Bike Type</label>
                    <select
                        value={formData.Bike_type}
                        onChange={(e) => setFormData({ ...formData, Bike_type: e.target.value })}
                        className="w-full p-2 border rounded-xl bg-white"
                        required
                        disabled={showEstimate}
                    >
                        <option value="">Select Bike Type</option>
                        {bikeTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-span-2">
                    <label className="block mb-2 text-primary text-[14px] font-medium">How did you hear about us?</label>
                    <select
                        value={formData.Lead_Source}
                        onChange={(e) => setFormData({ ...formData, Lead_Source: e.target.value })}
                        className="w-full p-2 border rounded-xl bg-white"
                        required
                        disabled={showEstimate}
                    >
                        <option value="" className="text-[16px]">
                            Select
                        </option>
                        {hearingSources.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Price Estimate Display */}
                {showEstimate && priceEstimate && (
                    <div className="col-span-2 p-4 bg-white rounded-xl border-2 border-[#0e3a6c]/30 mb-4">
                        <h3 className="text-lg font-bold text-[#0e3a6c] mb-2">Estimated Price</h3>
                        <div className="flex flex-col justify-between items-start">
                            <div className="text-2xl font-black text-[#0e3a6c]">
                                ₹{priceEstimate.price.toLocaleString()}
                            </div>
                            <span className="text-sm underline" onClick={() => setIsDialogOpen(true)}>See Details</span>
                        </div>
                        {leadCreated && (
                            <div className="mt-4 text-green-600 font-bold uppercase text-center">
                                Like what you see? Proceed to Booking!!
                            </div>
                        )}
                    </div>
                )}
                <PriceEstimateDialog
                    isOpen={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    showEstimate={showEstimate}
                    priceEstimate={priceEstimate}
                    formData={formData}
                />

                {/* Single Action Button */}
                <div className="col-span-2">
                    {!showEstimate ? (
                        <button
                            type="button"
                            onClick={handleGetQuote}
                            className={`w-full py-2 px-4 rounded-xl text-white font-black uppercase tracking-normal ${formComplete ? "bg-[#0e3a6c] hover:bg-[#052952]" : "bg-gray-400 cursor-not-allowed"
                                }`}
                            disabled={!formComplete || isSubmitting}
                        >
                            {isSubmitting ? (
                                <div className="w-6 h-6 border-2 border-dark border-t-transparent rounded-full animate-spin mx-auto"></div>
                            ) : (
                                "Get Quote Now"
                            )}
                        </button>
                    ) : (
                        <div className="flex items-center justify-center gap-4">
                            <button
                                type="button"
                                onClick={() => {
                                    // Reset the form to allow a new quote
                                    setShowEstimate(false);
                                    setLeadCreated(false);
                                    setPriceEstimate(null);
                                }}
                                className="w-full py-2 px-4 rounded-xl text-white font-black uppercase tracking-normal bg-[#0e3a6c] hover:bg-[#052952]"
                            >
                                Start New Quote
                            </button>
                            <button
                                onClick={() => window.location.href = "/booking"}
                                className="w-full py-2 px-4 rounded-xl text-white font-black uppercase tracking-normal bg-[#0e3a6c] hover:bg-[#052952]"
                            >
                                Book Now
                            </button>
                        </div>
                    )}
                </div>
            </form>
            <FormTerms />
        </div>
    );
}
