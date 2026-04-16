import type { Metadata } from 'next';
import Link from 'next/link';
import { useCases } from '@/lib/pseo/use-cases';

export const metadata: Metadata = {
  title: 'Countersure use cases',
  description:
    'Onboarding, audit trail, periodic review, vendor due diligence, fraud prevention, MTD, supplier scoring.',
  alternates: { canonical: '/use-cases' },
};

export default function UseCasesHub() {
  return (
    <article className="bg-clearance-white">
      <section className="bg-customs-green text-clearance-white grain border-b-4 border-stamp-red">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-clearance-white/60 mb-4">
            § USE CASES
          </p>
          <h1 className="font-heading font-black text-5xl md:text-6xl leading-[0.95] tracking-tight">
            What people stamp with Countersure.
          </h1>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <ul className="space-y-px">
          {useCases.map((u) => (
            <li key={u.slug}>
              <Link
                href={`/use-cases/${u.slug}`}
                className="block p-8 border border-slate-ink/10 hover:border-customs-green hover:bg-sage-paper transition group"
              >
                <p className="font-mono text-xs text-stamp-red mb-2">
                  /use-cases/{u.slug}
                </p>
                <h2 className="font-heading text-2xl font-bold text-slate-ink group-hover:text-customs-green mb-2">
                  {u.title}
                </h2>
                <p className="text-slate-mid leading-snug">{u.oneLiner}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
