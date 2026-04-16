import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { stripe, STRIPE_LOOKUPS, type PlanKey } from '@/lib/stripe';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  if (!stripe) return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 });

  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Sign in first' }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as { plan?: PlanKey };
  const lookupKey = body.plan ? STRIPE_LOOKUPS[body.plan] : undefined;
  if (!lookupKey) {
    return NextResponse.json({ error: 'Unknown plan' }, { status: 400 });
  }

  const prices = await stripe.prices.list({ lookup_keys: [lookupKey], limit: 1 });
  const price = prices.data[0];
  if (!price) {
    return NextResponse.json({ error: 'Price not found' }, { status: 500 });
  }

  const origin =
    req.headers.get('origin') ||
    process.env.SITE_URL ||
    'https://countersure.com';

  const checkout = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer_email: session.user.email,
    line_items: [{ price: price.id, quantity: 1 }],
    allow_promotion_codes: true,
    success_url: `${origin}/dashboard?welcome=1`,
    cancel_url: `${origin}/pricing?canceled=1`,
    metadata: {
      plan: body.plan!,
      user_email: session.user.email,
    },
    subscription_data: {
      metadata: {
        plan: body.plan!,
        user_email: session.user.email,
      },
    },
  });

  return NextResponse.json({ url: checkout.url });
}
