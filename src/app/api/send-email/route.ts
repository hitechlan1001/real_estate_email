import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/google';

export async function POST(req: Request) {
  const { to, subject, text } = await req.json();
  await sendEmail({ to, subject, text });
  return NextResponse.json({ success: true });
}