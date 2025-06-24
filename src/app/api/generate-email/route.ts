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
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error message:", err.message);

    return NextResponse.json(
      {
        error: err.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}
