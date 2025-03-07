// /app/api/zoho/price-estimate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "@/lib/zohoAuth"; // Assume you have this utility function

export async function POST(req: NextRequest) {
  try {
    const { from, to, bikeType } = await req.json();

    // Validate required parameters
    if (!from || !to || !bikeType) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 },
      );
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
      return NextResponse.json(
        { error: "No pricing found for the selected route and bike type" },
        { status: 404 },
      );
    }

    // Extract the price from the first matching record
    const price = data.data[0].Price;

    return NextResponse.json({
      price,
      currency: "INR",
    });
  } catch (error) {
    console.error("Price estimate error:", error);
    return NextResponse.json(
      { error: "Failed to fetch price estimate" },
      { status: 500 },
    );
  }
}
