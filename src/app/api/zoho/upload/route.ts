import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/zohoAuth";

export async function POST(request: Request) {
  try {
    // Check if the request has a body
    if (!request.body) {
      return NextResponse.json(
        { error: "No request body provided" },
        { status: 400 },
      );
    }

    // Get the form data from the request
    const formData = await request.formData();

    // Get the file from the form data
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Get other parameters
    const entityId = formData.get("entityId") as string;
    const crmModule = formData.get("module") as string; // Renamed `module` to `crmModule`

    // Validate required fields
    if (!entityId || !crmModule) {
      return NextResponse.json(
        { error: "Missing required fields (entityId or module)" },
        { status: 400 },
      );
    }

    // Get access token
    const access_token = await getAccessToken();

    // Create a new FormData to send to Zoho
    const zohoFormData = new FormData();
    zohoFormData.append("file", file);

    // Zoho API endpoint for file upload
    const uploadUrl = `https://www.zohoapis.com/crm/v2/${crmModule}/${entityId}/Attachments`;

    const response = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      body: zohoFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Zoho API error:", errorText);
      return NextResponse.json(
        { error: "Failed to upload file" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Network Error" }, { status: 500 });
  }
}
