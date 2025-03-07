// /app/api/zoho/leads/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "@/lib/zohoAuth"; // Assume you have this utility function

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();

    // Get Zoho access token
    const token = await getAccessToken();

    // Prepare the lead data with the estimated amount
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
          // Include the estimated amount field (you may need to create this custom field in Zoho)
          Estimated_Amount: formData.Estimated_Amount,
        },
      ],
    };

    // Create lead in Zoho CRM
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
      return NextResponse.json(
        { error: responseData.message || "Failed to create lead" },
        { status: response.status },
      );
    }

    return NextResponse.json({ success: true, data: responseData });
  } catch (error) {
    console.error("Lead creation error:", error);
    return NextResponse.json(
      { error: "Failed to create lead" },
      { status: 500 },
    );
  }
}
