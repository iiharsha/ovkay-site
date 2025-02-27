"use client"
import { useState, type FormEvent } from "react"
import Logo from "./layout/LogoHeader";

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
}

export default function ZohoWebForm() {
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

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const bikeTypes = ["61- 250CC", "250+CC", "EV Bike", "Premium", "Non Working Bike"] // Add more bike types as needed
    const hearingSources = ["Google Search", "Instagram", "Facebook", "Referral", "Public Boards"] // Add more hearing sources as needed

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)
        setSuccess(false)

        try {
            const response = await fetch("/api/zoho/leads", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            let responseData
            try {
                const textData = await response.text()
                responseData = textData ? JSON.parse(textData) : null
            } catch (parseError) {
                console.error("Error parsing response:", parseError)
                throw new Error("Invalid response from server")
            }

            if (!response.ok) {
                throw new Error(responseData?.error || "Failed to create lead")
            }

            setSuccess(true)
            setFormData({
                Last_Name: "",
                Lead_Status: "Website",
                From: "",
                To: "",
                Bike_type: "",
                Lead_Source: "",
                Email: "",
                Mobile: "",
                Expected_Shipment_Date: "",
            })
        } catch (error) {
            console.error("Submission error:", error)
            setError(error instanceof Error ? error.message : "An unknown error occurred")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="mx-auto mt-10 p-6 bg-[#EFEEF1] rounded-lg font-mallory">
            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-xl border border-red-300">{error}</div>}

            {success && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-xl border border-green-300">
                    Thank You for you response Our Team will Contact You Right Away!
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
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2">
                    <div>
                        <label className="block mb-2">From Location</label>
                        <input
                            type="text"
                            value={formData.From}
                            onChange={(e) => setFormData({ ...formData, From: e.target.value })}
                            className="w-full p-2 border rounded-xl"
                            required
                            placeholder="Enter pickup location"
                        />
                    </div>

                    <div>
                        <label className="block mb-2">To Location</label>
                        <input
                            type="text"
                            value={formData.To}
                            onChange={(e) => setFormData({ ...formData, To: e.target.value })}
                            className="w-full p-2 border rounded-xl"
                            required
                            placeholder="Enter drop location"
                        />
                    </div>
                </div>

                <div className="col-span-2">
                    <label className="block mb-2 text-primary text-[14px] font-medium">Bike Type</label>
                    <select
                        value={formData.Bike_type}
                        onChange={(e) => setFormData({ ...formData, Bike_type: e.target.value })}
                        className="w-full p-2 border rounded-xl bg-white"
                        required
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
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`col-span-2 w-full py-2 px-4 rounded-xl text-white font-black uppercase tracking-normal ${isSubmitting ? "bg-[#0e3a6c] cursor-not-allowed" : "bg-[#0e3a6c] hover:bg-[#052952]"
                        }`}
                >
                    {isSubmitting ? (
                        <div className="w-6 h-6 border-2 border-dark border-t-transparent rounded-full animate-spin mx-auto"></div>
                    ) : (
                        "Get A Quote Now"
                    )}
                </button>
            </form>

            <div className="col-span-2">
                <p className="text-gray-600 text-sm mt-4">
                    By submitting this quote request, you agree to allow Ovkay Logistics.
                    <br />
                    to send you text or SMS messages pertaining to your quote request. Ovkay Logistics. will never text/message
                    you anything that does not pertain to your move and your phone number will never be shared or added to
                    marketing campaigns of any kind.
                </p>
            </div>
        </div>
    )
}


