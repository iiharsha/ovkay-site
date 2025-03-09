//ZohoBetterForm.tsx
'use client'

import Logo from "@/components/layout/LogoHeader";
import { useState } from "react";
import { PriceEstimateDialog } from "./ShowEstimate";
import FormTerms from "@/components/common/FormTerms";
import { LeadFormData, PriceEstimate } from "@/lib/types";
import formFields from "@/data/first-form.json";
import { getPriceEstimate } from "@/app/actions/getPriceEstimate";
import { createZohoLead } from "@/app/actions/createZohoLead";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/lib/types"
import QuoteButton from "./FirstFormQuoteButton";

// Infer the type from the schema
type FormData = z.infer<typeof formSchema>;

export default function ZohoFirstForm() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notification, setNotification] = useState<{ type: 'error' | 'success', message: string } | null>(null);
    const [priceEstimate, setPriceEstimate] = useState<PriceEstimate | null>(null);
    const [showEstimate, setShowEstimate] = useState(false);
    const [leadCreated, setLeadCreated] = useState(false);

    // Setup React Hook Form with Zod resolver
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        getValues,
        reset,
        // setValue,
        watch,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            Last_Name: "",
            Lead_Status: "From Website",
            From: "",
            To: "",
            Bike_type: "",
            Lead_Source: "",
            Email: "",
            Mobile: "",
            Expected_Shipment_Date: "",
        }
    });

    // Watch for location fields to validate they're not the same
    const fromLocation = watch("From");
    const toLocation = watch("To");


    const showNotification = (type: 'error' | 'success', message: string, duration = 5000) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), duration);
    };

    const resetFormData = () => {
        reset();
        setPriceEstimate(null);
        setShowEstimate(false);
        setLeadCreated(false);
    };

    const fetchPriceEstimate = async (): Promise<PriceEstimate | null> => {
        const formData = getValues();
        try {
            const priceData = await getPriceEstimate(formData.From, formData.To, formData.Bike_type);

            if (priceData.error || priceData.price === undefined) {
                throw new Error("Error getting pricing data");
            }

            return priceData;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to get price estimate";
            showNotification('error', errorMessage);
            return null;
        }
    };

    const createLead = async (price: number): Promise<boolean> => {
        const formData = getValues();
        try {
            const leadData = await createZohoLead({
                ...(formData as LeadFormData),
                Quoted_Price: price
            });

            if (leadData.error) {
                throw new Error(leadData.error);
            }

            return true;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to create lead";
            showNotification('error', errorMessage);
            return false;
        }
    };

    const onGetQuote = async () => {
        setIsSubmitting(true);

        try {
            // Step 1: Get price estimate
            const estimateData = await fetchPriceEstimate();
            if (!estimateData) {
                throw new Error("Failed to get price estimate");
            }

            setPriceEstimate(estimateData);
            setShowEstimate(true);
            setIsDialogOpen(true);

            // Step 2: Create lead with the price
            const leadCreated = await createLead(Number(estimateData.price));
            if (!leadCreated) {
                throw new Error("Failed to create lead");
            }

            setLeadCreated(true);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
            showNotification('error', errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const onSubmitForm = handleSubmit(() => {
        if (leadCreated) {
            showNotification('success', "Thank You for your response! Our Team will contact you right away!");
            setTimeout(resetFormData, 3000);
        } else {
            showNotification('error', "Please get a quote first");
        }
    });

    const handleNewQuote = () => {
        setShowEstimate(false);
        setLeadCreated(false);
        setPriceEstimate(null);
    };

    return (
        <div className="mx-auto mt-10 p-6 bg-[#EFEEF1] rounded-lg font-mallory">
            {notification && (
                <div className={`mb-4 p-3 rounded-xl border ${notification.type === 'error'
                    ? 'bg-red-100 text-red-700 border-red-300'
                    : 'bg-green-100 text-green-700 border-green-300'
                    }`}>
                    {notification.message}
                </div>
            )}

            <div className="flex items-center justify-center m-4">
                <Logo size="sm" />
            </div>

            <form onSubmit={onSubmitForm} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Personal Information Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2">
                    <div>
                        <label className="block mb-2 font-medium">Name *</label>
                        <input
                            type="text"
                            className={`w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0e3a6c]/50 ${errors.Last_Name ? 'border-red-500' : ''
                                }`}
                            placeholder="Enter full name"
                            disabled={showEstimate}
                            {...register("Last_Name")}
                        />
                        {errors.Last_Name && (
                            <p className="text-red-500 text-xs mt-1">{errors.Last_Name.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Email</label>
                        <input
                            type="email"
                            className={`w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0e3a6c]/50 ${errors.Email ? 'border-red-500' : ''
                                }`}
                            placeholder="Enter email"
                            disabled={showEstimate}
                            {...register("Email")}
                        />
                        {errors.Email && (
                            <p className="text-red-500 text-xs mt-1">{errors.Email.message}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2">
                    <div>
                        <label className="block mb-2 font-medium">Mobile *</label>
                        <input
                            type="tel"
                            className={`w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0e3a6c]/50 ${errors.Mobile ? 'border-red-500' : ''
                                }`}
                            placeholder="Enter 10-digit mobile number"
                            maxLength={10}
                            disabled={showEstimate}
                            {...register("Mobile")}
                        />
                        {errors.Mobile && (
                            <p className="text-red-500 text-xs mt-1">{errors.Mobile.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Expected Shipment Date</label>
                        <input
                            type="date"
                            className={`w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0e3a6c]/50 ${errors.Expected_Shipment_Date ? 'border-red-500' : ''
                                }`}
                            min={new Date().toISOString().split("T")[0]}
                            disabled={showEstimate}
                            {...register("Expected_Shipment_Date")}
                        />
                        {errors.Expected_Shipment_Date && (
                            <p className="text-red-500 text-xs mt-1">{errors.Expected_Shipment_Date.message}</p>
                        )}
                    </div>
                </div>

                {/* Route Information Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2">
                    <div>
                        <label className="block mb-2 font-medium">From Location *</label>
                        <select
                            className={`w-full p-2 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0e3a6c]/50 ${errors.From ? 'border-red-500' : ''
                                }`}
                            disabled={showEstimate}
                            {...register("From")}
                        >
                            <option value="" disabled>Pick-Up Point</option>
                            {formFields.locations.map((location) => (
                                <option key={location} value={location}>
                                    {location}
                                </option>
                            ))}
                        </select>
                        {errors.From && (
                            <p className="text-red-500 text-xs mt-1">{errors.From.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">To Location *</label>
                        <select
                            className={`w-full p-2 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0e3a6c]/50 ${errors.To ? 'border-red-500' : ''
                                }`}
                            disabled={showEstimate}
                            {...register("To")}
                        >
                            <option value="" disabled>Drop-Off Point</option>
                            {formFields.locations.map((location) => (
                                <option key={location} value={location}>
                                    {location}
                                </option>
                            ))}
                        </select>
                        {errors.To && (
                            <p className="text-red-500 text-xs mt-1">{errors.To.message}</p>
                        )}
                        {fromLocation && toLocation && fromLocation === toLocation && (
                            <p className="text-amber-600 text-xs mt-1">Pick-up and drop-off locations are the same</p>
                        )}
                    </div>
                </div>

                {/* Bike Type & Lead Source */}
                <div className="col-span-2">
                    <label className="block mb-2 font-medium">Bike Type *</label>
                    <select
                        className={`w-full p-2 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0e3a6c]/50 ${errors.Bike_type ? 'border-red-500' : ''
                            }`}
                        disabled={showEstimate}
                        {...register("Bike_type")}
                    >
                        <option value="" disabled>Select Bike Type</option>
                        {formFields.bikeTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                    {errors.Bike_type && (
                        <p className="text-red-500 text-xs mt-1">{errors.Bike_type.message}</p>
                    )}
                </div>

                <div className="col-span-2">
                    <label className="block mb-2 font-medium">How did you hear about us? *</label>
                    <select
                        className={`w-full p-2 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0e3a6c]/50 ${errors.Lead_Source ? 'border-red-500' : ''
                            }`}
                        disabled={showEstimate}
                        {...register("Lead_Source")}
                    >
                        <option value="" disabled>Select</option>
                        {formFields.hearingSources.map((source) => (
                            <option key={source} value={source}>
                                {source}
                            </option>
                        ))}
                    </select>
                    {errors.Lead_Source && (
                        <p className="text-red-500 text-xs mt-1">{errors.Lead_Source.message}</p>
                    )}
                </div>

                {/* Hidden field for Lead_Status */}
                <input type="hidden" {...register("Lead_Status")} />

                {/* Price Estimate Display */}
                {showEstimate && priceEstimate && (
                    <div className="col-span-2 p-4 bg-white rounded-xl border-2 border-[#0e3a6c]/30 mb-4 shadow-sm">
                        <h3 className="text-lg font-bold text-[#0e3a6c] mb-2">Estimated Price</h3>
                        <div className="flex flex-col justify-between items-start">
                            <div className="text-2xl font-black text-[#0e3a6c]">
                                ₹{priceEstimate.price?.toLocaleString()}
                            </div>
                            <button
                                type="button"
                                className="text-sm text-[#0e3a6c] underline cursor-pointer mt-1 hover:text-[#0e3a6c]/70"
                                onClick={() => setIsDialogOpen(true)}
                            >
                                See Details
                            </button>
                        </div>
                        {leadCreated && (
                            <div className="mt-4 text-green-600 font-bold text-center bg-green-50 p-2 rounded-lg border border-green-100">

                            </div>
                        )}
                    </div>
                )}

                <PriceEstimateDialog
                    isOpen={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    showEstimate={showEstimate}
                    priceEstimate={priceEstimate}
                    formData={getValues() as LeadFormData}
                />
                <QuoteButton
                    showEstimate={showEstimate}
                    isValid={isValid}
                    isSubmitting={isSubmitting}
                    onGetQuote={handleSubmit(onGetQuote)}
                    handleNewQuote={handleNewQuote}
                />
            </form>
            <FormTerms />
        </div>
    );
}
