import type { Metadata } from 'next';
import Link from 'next/link';
import { industries } from '@/lib/pseo/industries';

export const metadata: Metadata = {
  title: 'Countersure for your industry',
  description:
    'How Countersure fits accountants, importers, construction, manufacturing, ecommerce, freight, fintech, and the public sector.',
  alternates: { canonical: '/for' },
};

export default function IndustriesHub() {
  return (
    <article className="bg-clearance-white">
      <section className="bg-customs-green text-clearance-white grain border-b-4 border-stamp-red">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-clearance-white/60 mb-4">
            § INDUSTRIES
          </p>
          <h1 className="font-heading font-black text-5xl md:text-6xl leading-[0.95] tracking-tight">
            Built for the teams who carry the risk.
          </h1>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <ul className="grid md:grid-cols-2 gap-px bg-slate-ink/10 border border-slate-ink/10">
          {industries.map((i) => (
            <li key={i.slug} className="bg-clearance-white">
              <Link
                href={`/for/${i.slug}`}
                className="block p-8 hover:bg-sage-paper transition group"
              >
                <p className="font-mono text-xs text-stamp-red mb-2">
                  /for/{i.slug}
                </p>
                <h2 className="font-heading text-2xl font-bold text-slate-ink group-hover:text-customs-green mb-2">
                  {i.name}
                </h2>
                <p className="text-slate-mid leading-snug">{i.hook}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
