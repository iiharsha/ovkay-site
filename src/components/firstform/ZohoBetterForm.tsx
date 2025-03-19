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
import { formSchema } from "@/lib/types";
import QuoteButton from "./QuoteButton";
import { toast } from "sonner";

// Import shadcn components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

// Infer the type from the schema
type FormData = z.infer<typeof formSchema>;

export default function ZohoBetterForm() {
    // Consolidated dialog and related state into a single object
    const [dialogState, setDialogState] = useState({
        isOpen: false,
        showEstimate: false,
        leadCreated: false,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [priceEstimate, setPriceEstimate] = useState<PriceEstimate | null>(null);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isWithinCity, setIsWithinCity] = useState(false);

    // Setup React Hook Form with Zod resolver
    const form = useForm<FormData>({
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
    const fromLocation = form.watch("From");
    const toLocation = form.watch("To");
    const showLocationError = !isWithinCity && fromLocation && toLocation && fromLocation === toLocation;

    const resetForm = () => {
        form.reset();
        setPriceEstimate(null);
        setDialogState({
            isOpen: false,
            showEstimate: false,
            leadCreated: false
        });
        setFormSubmitted(false);
        setIsWithinCity(false);
    };

    const fetchPriceEstimate = async (): Promise<PriceEstimate | null> => {
        const { From, To, Bike_type } = form.getValues();
        try {
            const fromLocation = From;
            const toLocation = isWithinCity ? From : To;

            const priceData = await getPriceEstimate(fromLocation, toLocation, Bike_type);

            if (priceData.error || priceData.price === undefined) {
                throw new Error(priceData.error || "Error getting pricing data");
            }

            return priceData;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to get price estimate";
            toast.error(errorMessage);
            return null;
        }
    };

    const createLead = async (price: number): Promise<boolean> => {
        const formData = form.getValues();
        try {
            const leadData = await createZohoLead({
                ...formData as LeadFormData,
                To: isWithinCity ? formData.From : formData.To,
                Quoted_Price: price
            });

            if (!leadData.success) {
                throw new Error(leadData.error || "Failed to Create Quote. Please Try Again!");
            }

            return true;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to create Quote. Please Try Again";
            toast.error(errorMessage);
            return false;
        }
    };

    const handleDeliveryTypeChange = (value: string) => {
        const withinCity = value === 'within-city';
        setIsWithinCity(withinCity);

        if (withinCity) {
            const currentFrom = form.getValues("From");
            if (currentFrom) {
                form.setValue("To", currentFrom)
            }
        }
    }

    const handleFromChange = (value: string) => {
        form.setValue("From", value);

        if (isWithinCity) {
            form.setValue("To", value);
        }
    };


    // Main function to handle quote generation
    const handleGetQuote = async () => {
        const isValid = await form.trigger();
        if (!isValid) {
            toast.error("Please fill all required fields correctly");
            return;
        }

        setIsSubmitting(true);

        try {
            // Step 1: Get price estimate
            const estimateData = await fetchPriceEstimate();
            if (!estimateData) {
                throw new Error("Failed to get price estimate");
            }

            setPriceEstimate(estimateData);

            // Step 2: Create lead with the price
            const success = await createLead(Number(estimateData.price));
            if (!success) {
                throw new Error("Failed to create lead");
            }

            // Step 3: Update UI state to show success
            setDialogState({
                isOpen: true,
                showEstimate: true,
                leadCreated: true
            });

            toast.success("Quote generated successfully!");
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const onSubmit = async () => {
        if (dialogState.leadCreated) {
            setFormSubmitted(true);
            toast.success("Thank you for your submission!");
            setTimeout(resetForm, 3000);
        } else {
            toast.error("Please get a quote first");
        }
    };

    const handleNewQuote = () => {
        setDialogState(prev => ({
            ...prev,
            showEstimate: false,
            leadCreated: false
        }));
        setPriceEstimate(null);
    };

    const handleDialogChange = (open: boolean) => {
        // Don't allow dialog state to change if form has been submitted
        // and is pending reset
        if (formSubmitted) return;

        setDialogState(prev => ({
            ...prev,
            isOpen: open
        }));
    };


    return (
        <div className="mx-auto mt-10 p-6 bg-[#EFEEF1] rounded-lg font-mallory">
            <div className="flex items-center justify-center m-4">
                <Logo size="sm" />
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Personal Information Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2">
                        <FormField
                            control={form.control}
                            name="Last_Name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter full name"
                                            {...field}
                                            disabled={dialogState.showEstimate}
                                            className="bg-white rounded-xl focus:ring-2 focus:ring-[#0e3a6c]/50"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="Email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Enter email"
                                            {...field}
                                            disabled={dialogState.showEstimate}
                                            className="bg-white rounded-xl focus:ring-2 focus:ring-[#0e3a6c]/50"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2">
                        <FormField
                            control={form.control}
                            name="Mobile"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mobile *</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="tel"
                                            placeholder="Enter 10-digit mobile number"
                                            maxLength={10}
                                            {...field}
                                            disabled={dialogState.showEstimate}
                                            className="bg-white rounded-xl focus:ring-2 focus:ring-[#0e3a6c]/50"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="Expected_Shipment_Date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Expected Shipment Date</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="date"
                                            min={new Date().toISOString().split("T")[0]}
                                            {...field}
                                            disabled={dialogState.showEstimate}
                                            className="bg-white rounded-xl focus:ring-2 focus:ring-[#0e3a6c]/50"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Delivery Type Radio Group */}
                    <div className="col-span-2 mb-2">
                        <div className="font-medium mb-2">Delivery Type *</div>
                        <RadioGroup
                            defaultValue="intercity"
                            className="flex space-x-4"
                            disabled={dialogState.showEstimate}
                            onValueChange={handleDeliveryTypeChange}
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="intercity" id="intercity" className="text-[#0e3a6c] focus:ring-[#0e3a6c]" />
                                <label htmlFor="intercity" className="cursor-pointer">Intercity</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="within-city" id="within-city" className="text-[#0e3a6c] focus:ring-[#0e3a6c]" />
                                <label htmlFor="within-city" className="cursor-pointer">Within City</label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Route Information Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2">
                        <FormField
                            control={form.control}
                            name="From"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{isWithinCity ? "Location *" : "From Location *"}</FormLabel>
                                    <Select
                                        disabled={dialogState.showEstimate}
                                        onValueChange={(value) => handleFromChange(value)}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="bg-white rounded-xl focus:ring-2 focus:ring-[#0e3a6c]/50">
                                                <SelectValue placeholder={isWithinCity ? "Select Location" : "Pick-Up Point"} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {formFields.locations.map((location) => (
                                                <SelectItem key={location} value={location}>
                                                    {location}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {!isWithinCity && (
                            <FormField
                                control={form.control}
                                name="To"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>To Location *</FormLabel>
                                        <Select
                                            disabled={dialogState.showEstimate || isWithinCity}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="bg-white rounded-xl focus:ring-2 focus:ring-[#0e3a6c]/50">
                                                    <SelectValue placeholder="Drop-Off Point" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {formFields.locations.filter(location => location != fromLocation).map((location) => (
                                                    <SelectItem key={location} value={location}>
                                                        {location}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                        {showLocationError && (
                                            <p className="text-amber-600 text-xs mt-1">Pick-up and drop-off locations are the same</p>
                                        )}
                                    </FormItem>
                                )}
                            />
                        )}
                    </div>

                    {/* Bike Type & Lead Source */}
                    <div className="col-span-2">
                        <FormField
                            control={form.control}
                            name="Bike_type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bike Type *</FormLabel>
                                    <Select
                                        disabled={dialogState.showEstimate}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="bg-white rounded-xl focus:ring-2 focus:ring-[#0e3a6c]/50">
                                                <SelectValue placeholder="Select Bike Type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {formFields.bikeTypes.map((type) => (
                                                <SelectItem key={type} value={type}>
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="col-span-2">
                        <FormField
                            control={form.control}
                            name="Lead_Source"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>How did you hear about us? *</FormLabel>
                                    <Select
                                        disabled={dialogState.showEstimate}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="bg-white rounded-xl focus:ring-2 focus:ring-[#0e3a6c]/50">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {formFields.hearingSources.map((source) => (
                                                <SelectItem key={source} value={source}>
                                                    {source}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Hidden field for Lead_Status */}
                    <input type="hidden" {...form.register("Lead_Status")} />

                    {/* Price Estimate Display */}
                    {dialogState.showEstimate && priceEstimate && (
                        <Card className="col-span-2 border-2 border-[#0e3a6c]/30 mb-4 shadow-sm">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg font-bold text-[#0e3a6c]">Estimated Price</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col justify-between items-start">
                                    <div className="text-2xl font-black text-[#0e3a6c]">
                                        ₹{priceEstimate.price?.toLocaleString()}
                                    </div>
                                    <Button
                                        type="button" // Explicitly set type to button to prevent form submission
                                        variant="link"
                                        className="text-sm text-[#0e3a6c] underline cursor-pointer mt-1 hover:text-[#0e3a6c]/70 px-0"
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevent form submission
                                            handleDialogChange(true);
                                        }}
                                    >
                                        See Details
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <PriceEstimateDialog
                        isOpen={dialogState.isOpen}
                        onOpenChange={handleDialogChange}
                        showEstimate={dialogState.showEstimate}
                        priceEstimate={priceEstimate}
                        formData={form.getValues() as LeadFormData}
                    />

                    <QuoteButton
                        showEstimate={dialogState.showEstimate}
                        isValid={form.formState.isValid}
                        isSubmitting={isSubmitting}
                        onGetQuote={handleGetQuote}
                        handleNewQuote={handleNewQuote}
                    />
                </form>
            </Form>
            <FormTerms />
        </div>
    );
}
