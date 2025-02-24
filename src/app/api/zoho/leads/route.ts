// types/zoho.ts
// app/api/zoho/leads/route.ts
import { NextResponse } from "next/server";

async function getAccessToken() {
  try {
    const tokenResponse = await fetch(
      "https://accounts.zoho.com/oauth/v2/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          refresh_token: process.env.ZOHO_REFRESH_TOKEN!,
          client_id: process.env.ZOHO_CLIENT_ID!,
          client_secret: process.env.ZOHO_CLIENT_SECRET!,
          grant_type: "refresh_token",
        }),
      },
    );

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("Token response error:", errorText);
      throw new Error("Failed to get access token");
    }

    const data = await tokenResponse.json();
    if (!data.access_token) {
      throw new Error("No access token received");
    }

    return data.access_token;
  } catch (error) {
    console.error("Error getting access token:", error);
    throw new Error("Failed to get access token");
  }
}

export async function POST(request: Request) {
  try {
    if (!request.body) {
      return NextResponse.json(
        { error: "No request body provided" },
        { status: 400 },
      );
    }

    const leadData = await request.json();

    // Validate required fields
    if (!leadData.Last_Name || !leadData.Mobile) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const access_token = await getAccessToken();

    const response = await fetch("https://www.zohoapis.com/crm/v2/Leads", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [leadData],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Zoho API error:", errorText);
      return NextResponse.json(
        { error: "Failed to create lead in Zoho" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
