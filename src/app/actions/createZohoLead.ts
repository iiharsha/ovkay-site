//actions/createZohoLead.ts
"use server";

import { getAccessToken } from "@/lib/zohoAuth";

// Define types for the Zoho API response structure
interface ZohoApiSuccessResponse {
  data: {
    code: string;
    details: {
      id: string;
      created_time: string;
      Modified_Time?: string;
      [key: string]: unknown;
    }[];
    message: string;
    status: string;
  }[];
}

interface ZohoApiErrorResponse {
  code: string;
  details?: Record<string, unknown>;
  message: string;
  status: string;
}

type ZohoLeadResponse = {
  success: boolean;
  data?: ZohoApiSuccessResponse;
  error?: string;
};

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
}): Promise<ZohoLeadResponse> {
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

    const responseData = (await response.json()) as
      | ZohoApiSuccessResponse
      | ZohoApiErrorResponse;

    if (!response.ok || "code" in responseData) {
      return {
        success: false,
        error:
          "message" in responseData
            ? responseData.message
            : "Unknown error occurred",
      };
    }

    return {
      success: true,
      data: responseData as ZohoApiSuccessResponse,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}
