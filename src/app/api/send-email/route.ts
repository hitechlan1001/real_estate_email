import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/google';

export async function POST(req: Request) {
  try {
    const { to, subject, text } = await req.json();

    if (!to || !subject || !text) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject, or text' },
        { status: 400 }
      );
    }

    await sendEmail({ to, subject, text });

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error: any) {
    console.error('Error sending email:', error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Internal Server Error',
        details: error,
      },
      { status: 500 }
    );
  }
}
