import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const TO = process.env.CONTACT_TO_EMAIL || 'andrew@twocores.com';

export async function POST(req: Request) {
  const form = await req.formData();
  const name = String(form.get('name') ?? '').trim();
  const email = String(form.get('email') ?? '').trim();
  const company = String(form.get('company') ?? '').trim();
  const message = String(form.get('message') ?? '').trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  if (!resend) {
    console.warn('Contact form submitted but RESEND_API_KEY is not configured');
    return NextResponse.redirect(new URL('/contact/thanks', req.url), 303);
  }

  await resend.emails.send({
    from: 'Countersure <noreply@siftforms.com>',
    to: TO,
    replyTo: email,
    subject: `[Countersure] ${name}${company ? ` (${company})` : ''}`,
    text: `From: ${name} <${email}>\nCompany: ${company || '—'}\n\n${message}`,
  });

  return NextResponse.redirect(new URL('/contact/thanks', req.url), 303);
}
