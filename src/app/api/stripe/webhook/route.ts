import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { eq } from 'drizzle-orm';
import { stripe, planFromPriceLookup } from '@/lib/stripe';
import { db, isDbAvailable } from '@/db';
import { users } from '@/db/schema';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  if (!stripe) return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 });
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: 'No webhook secret' }, { status: 500 });

  const sig = req.headers.get('stripe-signature');
  const body = await req.text();
  if (!sig) return NextResponse.json({ error: 'No signature' }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err) {
    return NextResponse.json(
      { error: `Bad signature: ${(err as Error).message}` },
      { status: 400 }
    );
  }

  if (!isDbAvailable()) {
    // Acknowledge but no-op when DB not yet provisioned.
    return NextResponse.json({ received: true, db: 'unavailable' });
  }

  switch (event.type) {
    case 'checkout.session.completed':
    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const sub =
        event.type === 'checkout.session.completed'
          ? await stripe.subscriptions.retrieve(
              (event.data.object as Stripe.Checkout.Session).subscription as string,
              { expand: ['items.data.price'] }
            )
          : (event.data.object as Stripe.Subscription);
      const item = sub.items.data[0];
      const lookup = item?.price?.lookup_key ?? null;
      const plan = planFromPriceLookup(lookup);
      const customerEmail =
        (event.data.object as { customer_email?: string }).customer_email ??
        sub.metadata?.user_email ??
        null;

      if (customerEmail) {
        await db
          .update(users)
          .set({
            plan,
            stripeCustomerId: typeof sub.customer === 'string' ? sub.customer : sub.customer.id,
            stripeSubscriptionId: sub.id,
          })
          .where(eq(users.email, customerEmail));
      }
      break;
    }
    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription;
      const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer.id;
      await db
        .update(users)
        .set({ plan: 'free', stripeSubscriptionId: null })
        .where(eq(users.stripeCustomerId, customerId));
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
