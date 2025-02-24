import { NextRequest, NextResponse } from "next/server";
import { ZohoTokenResponse } from "@/types/zoho";

export async function refreshAccessToken(
  request: NextRequest,
): Promise<string | null> {
  try {
    const refreshToken = request.cookies.get("zohoRefreshToken")?.value;

    if (!refreshToken) {
      return null;
    }

    const response = await fetch("https://accounts.zoho.com/oauth/v2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        refresh_token: refreshToken,
        client_id: process.env.ZOHO_CLIENT_ID,
        client_secret: process.env.ZOHO_CLIENT_SECRET,
        grant_type: process.env.ZOHO_REFRESH_TOKEN,
      }),
    });

    const data: ZohoTokenResponse = await response.json();

    // Update the access token cookie
    const cookies = request.cookies;
    cookies.set("zohoAccessToken", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600, // 1 hour
    });

    return data.access_token;
  } catch (error) {
    return null;
  }
}
