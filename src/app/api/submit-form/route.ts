import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const zohoResponse = await fetch("https://crm.zoho.com/crm/WebToLeadForm", {
      method: "POST",
      body: formData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    if (!zohoResponse.ok) throw new Error("Failed to submit form");

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully!",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Submission failed",
      error,
    });
  }
}
