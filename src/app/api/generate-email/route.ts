import { NextResponse } from "next/server";
import { generateEmail } from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const { agentName, address, offer } = await req.json();

    if (!agentName || !address || !offer) {
      return NextResponse.json(
        { error: "Missing required fields: agentName, address, or offer" },
        { status: 400 }
      );
    }

    const emails = await generateEmail(agentName, address, offer);

    return NextResponse.json({ emails }, { status: 200 });

  } catch (error: any) {
    console.error("Error generating emails:", error);

    return NextResponse.json(
      {
        error: error?.message || "Internal Server Error",
        details: error,
      },
      { status: 500 }
    );
  }
}
