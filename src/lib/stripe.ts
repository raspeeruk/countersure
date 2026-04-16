import Stripe from 'stripe';

const KEY = process.env.STRIPE_SECRET_KEY;

// Use SDK default apiVersion (matches the version pinned by the installed @stripe/stripe-node).
export const stripe = KEY ? new Stripe(KEY) : null;

export const STRIPE_LOOKUPS = {
  cs_pro: 'cs_pro_monthly',
  cs_team: 'cs_team_monthly',
  cs_api: 'cs_api_monthly',
} as const;

export type PlanKey = keyof typeof STRIPE_LOOKUPS;

export function planFromPriceLookup(lookup?: string | null): PlanKey | 'free' {
  switch (lookup) {
    case 'cs_pro_monthly':
      return 'cs_pro';
    case 'cs_team_monthly':
      return 'cs_team';
    case 'cs_api_monthly':
      return 'cs_api';
    default:
      return 'free';
  }
}
