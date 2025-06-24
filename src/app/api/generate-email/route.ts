import { NextResponse } from "next/server";
import { generateEmail } from "@/lib/openai";

export async function POST(req: Request) {
  const { agentName, address, offer } = await req.json();
  const emails = await generateEmail(agentName, address, offer);
  return NextResponse.json({ emails });
}
