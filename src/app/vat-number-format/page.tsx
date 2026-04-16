import type { Metadata } from 'next';
import Link from 'next/link';
import { countries } from '@/lib/pseo/countries';

export const metadata: Metadata = {
  title: 'VAT number formats by country',
  description:
    'UK, Ireland, France, Germany, Netherlands, Spain, Italy, Belgium, Poland, Sweden — VAT number structure for each.',
  alternates: { canonical: '/vat-number-format' },
};

export default function CountriesHub() {
  return (
    <article className="bg-clearance-white">
      <section className="bg-customs-green text-clearance-white grain border-b-4 border-stamp-red">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-clearance-white/60 mb-4">
            § FORMATS
          </p>
          <h1 className="font-heading font-black text-5xl md:text-6xl leading-[0.95] tracking-tight">
            VAT number formats, by country.
          </h1>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <ul className="grid md:grid-cols-2 gap-px bg-slate-ink/10 border border-slate-ink/10">
          {countries.map((c) => (
            <li key={c.slug} className="bg-clearance-white">
              <Link
                href={`/vat-number-format/${c.slug}`}
                className="block p-6 hover:bg-sage-paper transition group flex items-start gap-4"
              >
                <span className="font-mono text-2xl font-bold text-stamp-red bg-sage-paper border border-stamp-red/20 px-3 py-1 group-hover:bg-stamp-red group-hover:text-clearance-white transition">
                  {c.vatPrefix}
                </span>
                <div>
                  <h2 className="font-heading text-xl font-bold text-slate-ink group-hover:text-customs-green mb-1">
                    {c.country}
                  </h2>
                  <p className="text-sm text-slate-mid">{c.pattern}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
