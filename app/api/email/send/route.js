import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(request) {
  try {
    const { to, subject, body } = await request.json();

    if (!to || !subject || !body) {
      return NextResponse.json(
        { error: 'Recipient email, subject, and body are required.' },
        { status: 400 }
      );
    }

    await transporter.sendMail({
      from: `"Inbox Pilot" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      text: body,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Gmail send failed:', error);
    return NextResponse.json(
      { error: 'Failed to send email via Gmail.' },
      { status: 500 }
    );
  }
}

