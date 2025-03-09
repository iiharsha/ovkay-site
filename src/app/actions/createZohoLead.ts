//actions/createZohoLead.ts
"use server";

import { getAccessToken } from "@/lib/zohoAuth";

export async function createZohoLead(formData: {
  Last_Name: string;
  Email: string;
  Mobile: string;
  Lead_Status?: string;
  Lead_Source: string;
  From: string;
  To: string;
  Bike_type: string;
  Expected_Shipment_Date: string;
  Quoted_Price: number;
  error?: Error;
}) {
  try {
    // Get Zoho access token
    const token = await getAccessToken();

    // Prepare lead data
    const leadData = {
      data: [
        {
          Last_Name: formData.Last_Name,
          Email: formData.Email,
          Mobile: formData.Mobile,
          Lead_Status: formData.Lead_Status || "From Website",
          Lead_Source: formData.Lead_Source,
          From: formData.From,
          To: formData.To,
          Bike_type: formData.Bike_type,
          Expected_Shipment_Date: formData.Expected_Shipment_Date,
          Quoted_Price: formData.Quoted_Price,
        },
      ],
    };

    // Send request to Zoho CRM
    const response = await fetch("https://www.zohoapis.com/crm/v3/Leads", {
      method: "POST",
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leadData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Server Error");
    }

    return { success: true, data: responseData };
  } catch (error) {
    throw new Error(
      `Server Error: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}
