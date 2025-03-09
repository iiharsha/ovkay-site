//app/actions/getPriceEstimate.ts
"use server";

import { PriceEstimate } from "@/lib/types";
import { getAccessToken } from "@/lib/zohoAuth";

export async function getPriceEstimate(
  from: string,
  to: string,
  bikeType: string,
): Promise<PriceEstimate> {
  try {
    // Validate required parameters
    if (!from || !to || !bikeType) {
      throw new Error("Missing required parameters");
    }

    // Get Zoho access token
    const token = await getAccessToken();

    // Query the Route Pricing module in Zoho
    const searchCriteria = `(From_Location:equals:${from})and(To_Location:equals:${to})and(Bike_Type:equals:${bikeType})`;

    const response = await fetch(
      `https://www.zohoapis.com/crm/v7/PricingRoutes/search?criteria=${encodeURIComponent(searchCriteria)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();

    // Check if we found pricing data
    if (!data.data || data.data.length === 0) {
      return {
        error: "No pricing found for the selected route and bike type",
      };
    }

    // Extract the price from the first matching record
    return {
      price: data.data[0].Price,
      currency: "INR",
    };
  } catch (error) {
    throw new Error(
      `Server Error: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}
