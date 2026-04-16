import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Countersure pricing — free VAT checks, Pro at £19/month for branded PDFs and bulk, Team at £49/month for watchlists, API at £199/month.',
};

const TIERS = [
  {
    name: 'Free',
    price: '£0',
    cadence: 'forever',
    summary: 'Casual checks. No signup.',
    features: ['5 single checks per day', 'Live HMRC verification', 'Result page with Stamp'],
    cta: { label: 'Run a check →', href: '/check-vat-number' },
    accent: false,
  },
  {
    name: 'Pro',
    price: '£19',
    cadence: 'per month',
    summary: 'For accountants and small teams.',
    features: [
      'Unlimited single checks',
      '1,000 bulk checks per month',
      'Branded PDF audit reports',
      'CSV export',
      'Email support',
    ],
    cta: { label: 'Start Pro', href: '/signup?plan=pro' },
    accent: true,
  },
  {
    name: 'Team',
    price: '£49',
    cadence: 'per month',
    summary: 'For procurement and compliance teams.',
    features: [
      '10,000 bulk checks per month',
      '5 user seats',
      'Watchlists + change alerts',
      'Webhook events',
      'Priority support',
    ],
    cta: { label: 'Start Team', href: '/signup?plan=team' },
    accent: false,
  },
  {
    name: 'API',
    price: '£199',
    cadence: 'per month',
    summary: 'For platforms and integrators.',
    features: [
      '100,000 API calls per month',
      'Programmatic access',
      'Webhook events',
      'SLA-backed uptime',
      'Direct integration support',
    ],
    cta: { label: 'Start API', href: '/signup?plan=api' },
    accent: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="bg-customs-green text-clearance-white grain">
        <div className="max-w-[1280px] mx-auto px-6 py-20 relative z-10">
          <div className="font-mono text-xs uppercase tracking-widest text-stamp-red mb-4">
            § PRICING
          </div>
          <h1 className="font-sans font-black text-5xl md:text-7xl tracking-tight leading-[0.95] mb-6 max-w-3xl">
            One stamp. Four ways to use it.
          </h1>
          <p className="font-body text-lg text-clearance-white/85 max-w-2xl">
            Start free. Upgrade when you need bulk, PDFs, watchlists or the API.
          </p>
        </div>
      </section>

      <section className="bg-clearance-white py-20">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-ink/10">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`bg-clearance-white p-8 flex flex-col ${
                tier.accent ? 'border-t-4 border-stamp-red' : ''
              }`}
            >
              <div className="font-mono text-xs uppercase tracking-widest text-stamp-red mb-2">
                {tier.name}
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-sans font-black text-5xl text-slate-ink">{tier.price}</span>
                <span className="font-mono text-sm text-slate-mid">/{tier.cadence}</span>
              </div>
              <p className="font-body text-slate-mid mb-6">{tier.summary}</p>
              <ul className="space-y-2 font-body text-slate-ink mb-8 text-sm">
                {tier.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <Link
                href={tier.cta.href}
                className={`mt-auto block text-center px-5 py-3 font-sans font-bold uppercase tracking-wider text-sm transition-colors ${
                  tier.accent
                    ? 'bg-stamp-red text-clearance-white hover:bg-stamp-red-deep'
                    : 'bg-customs-green text-clearance-white hover:bg-customs-green-deep'
                }`}
              >
                {tier.cta.label}
              </Link>
            </div>
          ))}
        </div>
        <div className="max-w-[1280px] mx-auto px-6 mt-12 text-center font-mono text-xs uppercase tracking-widest text-slate-mid">
          Annual plans = 2 months free · VAT not yet added · Custom enterprise plans available
        </div>
      </section>
    </>
  );
}
