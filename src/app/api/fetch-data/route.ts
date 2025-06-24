import { NextResponse } from 'next/server';
import { fetchSheetData } from '@/lib/google';

export async function GET() {
  try {
    const data = await fetchSheetData();

    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching sheet data:', error);

    return NextResponse.json(
      {
        error: error?.message || 'Failed to fetch Google Sheet data',
        details: error,
      },
      { status: 500 }
    );
  }
}
