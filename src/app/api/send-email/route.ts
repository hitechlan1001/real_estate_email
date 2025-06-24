import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/google";

export async function POST(req: Request) {
  try {
    const { to, subject, text } = await req.json();

    if (!to || !subject || !text) {
      return NextResponse.json(
        { error: "Missing required fields: to, subject, or text" },
        { status: 400 }
      );
    }

    await sendEmail({ to, subject, text });

    return NextResponse.json({ success: true }, { status: 200 });
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
