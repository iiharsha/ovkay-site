import { z } from "zod";

export interface LeadFormData {
  Last_Name: string;
  Lead_Status: string;
  From: string;
  To: string;
  Bike_type: string;
  Lead_Source: string;
  Email: string;
  Mobile: string;
  Expected_Shipment_Date: string;
  Quoted_Price?: number;
}

export interface PriceEstimate {
  price?: number;
  currency?: string;
  error?: string;
}

export const formSchema = z.object({
  Last_Name: z.string().min(1, { message: "Name is required" }),
  Lead_Status: z.string().default("From Website"),
  From: z.string().min(1, { message: "Pickup location is required" }),
  To: z.string().min(1, { message: "Drop-off location is required" }),
  Bike_type: z.string().min(1, { message: "Bike type is required" }),
  Lead_Source: z
    .string()
    .min(1, { message: "Please select how you heard about us" }),
  Email: z
    .string()
    .email({ message: "Invalid email address" })
    .optional()
    .or(z.literal("")),
  Mobile: z
    .string()
    .regex(/^[0-9]{10}$/, { message: "Mobile number must be 10 digits" }),
  Expected_Shipment_Date: z.string().optional().or(z.literal("")),
});
