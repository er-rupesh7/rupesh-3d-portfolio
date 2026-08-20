import { NextResponse } from 'next/server';
import {
  checkRateLimit,
  recordTransmission,
  extractClientIP,
  RATE_LIMIT_DAYS,
} from '@/lib/rateLimit';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, name, email, subject, message } = body;
    const clientIp = extractClientIP(req);

    // 1. Pre-flight Rate Limit Check
    if (action === 'check') {
      if (!email) {
        return NextResponse.json({ success: false, message: 'Email required' }, { status: 400 });
      }
      const rateCheck = checkRateLimit(email, clientIp);
      if (rateCheck.isLimited) {
        return NextResponse.json(
          {
            allowed: false,
            isRateLimited: true,
            remainingTime: rateCheck.remainingTimeFormatted,
            message: `Rate limit active: You can send only one message every ${RATE_LIMIT_DAYS} days. Next transmission available in ${rateCheck.remainingTimeFormatted}.`,
          },
          { status: 429 }
        );
      }
      return NextResponse.json({ allowed: true });
    }

    // 2. Post-transmission Record Logger
    if (action === 'record') {
      if (!email || !name) {
        return NextResponse.json({ success: false, message: 'Email and name required' }, { status: 400 });
      }
      const record = recordTransmission(email, clientIp, name);
      return NextResponse.json({
        success: true,
        recorded: true,
        expiresAt: record.expiresAt,
      });
    }

    // 3. Fallback direct server-side submission
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Please provide name, email, and message.' },
        { status: 400 }
      );
    }

    const rateCheck = checkRateLimit(email, clientIp);
    if (rateCheck.isLimited) {
      return NextResponse.json(
        {
          success: false,
          isRateLimited: true,
          remainingTime: rateCheck.remainingTimeFormatted,
          message: `Rate limit active: You can send only one message every ${RATE_LIMIT_DAYS} days. Next transmission available in ${rateCheck.remainingTimeFormatted}.`,
        },
        { status: 429 }
      );
    }

    const accessKey =
      process.env.WEB3FORMS_ACCESS_KEY ||
      process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
      'b09c40d2-bfa0-4b81-ac04-5476576be605';

    const formPayload = new FormData();
    formPayload.append('access_key', accessKey);
    formPayload.append('name', name.trim());
    formPayload.append('email', email.trim());
    formPayload.append('subject', subject?.trim() || `Portfolio Inquiry from ${name.trim()}`);
    formPayload.append('message', `[Sender IP: ${clientIp}]\n\n${message.trim()}`);
    formPayload.append('from_name', 'Rupesh Kumar 3D Portfolio');
    formPayload.append('botcheck', '');

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formPayload,
    });

    const responseText = await response.text();
    let result: any = null;
    try {
      result = JSON.parse(responseText);
    } catch {
      result = {
        success: false,
        message: 'External email service challenge. Please use Direct WhatsApp or try again.',
      };
    }

    if (result && result.success) {
      const record = recordTransmission(email, clientIp, name);
      return NextResponse.json({
        success: true,
        message: 'Message delivered successfully to Rupesh!',
        expiresAt: record.expiresAt,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: result?.message || 'Failed to dispatch transmission payload.',
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal transmission failure. Please try WhatsApp directly.',
      },
      { status: 500 }
    );
  }
}




