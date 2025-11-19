import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json(
        { error: 'You must be signed in to send email.' },
        { status: 401 }
      );
    }

    const { to, subject, body } = await request.json();

    if (!to || !subject || !body) {
      return NextResponse.json(
        { error: 'Recipient email, subject, and body are required.' },
        { status: 400 }
      );
    }

    const account = await prisma.account.findFirst({
      where: {
        userId: session.user.id,
        provider: 'google',
      },
      select: {
        refresh_token: true,
      },
    });

    if (!account?.refresh_token) {
      return NextResponse.json(
        { error: 'Reconnect Google with mail access to send emails.' },
        { status: 403 }
      );
    }

    oauth2Client.setCredentials({ refresh_token: account.refresh_token });

    const accessTokenResponse = await oauth2Client.getAccessToken();
    const accessToken = accessTokenResponse?.token;

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Unable to fetch Gmail access token.' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: session.user.email,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: account.refresh_token,
        accessToken,
      },
    });

    await transporter.sendMail({
      from: `"${session.user.name || 'Inbox Pilot'}" <${session.user.email}>`,
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
