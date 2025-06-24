import { NextResponse } from 'next/server';
import { fetchSheetData } from '@/lib/google';

export async function GET() {
  const data = await fetchSheetData();
  return NextResponse.json({ data });
}