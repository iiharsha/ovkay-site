export async function getAccessToken() {
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
      throw new Error("Failed Access");
    }

    const data = await tokenResponse.json();
    if (!data.access_token) {
      throw new Error("No Access");
    }

    return data.access_token;
  } catch (error) {
    console.error("Error getting access token:", error);
    throw new Error("Failed Access");
  }
}
