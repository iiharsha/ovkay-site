export async function refreshAccessToken(refreshToken: string) {
  const clientId = process.env.ZOHO_CLIENT_ID!;
  const clientSecret = process.env.ZOHO_CLIENT_SECRET!;

  const tokenUrl = "https://accounts.zoho.com/oauth/v2/token";

  try {
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "refresh_token",
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to refresh token: ${result.error}`);
    }

    return result.access_token;
  } catch (error) {
    console.error("Token refresh error:", error);
    return null;
  }
}
