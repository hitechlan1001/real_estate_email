import { NextResponse } from "next/server";
import { fetchSheetData } from "@/lib/google";

export async function GET() {
  try {
    const data = await fetchSheetData();

    return NextResponse.json({ data }, { status: 200 });
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
