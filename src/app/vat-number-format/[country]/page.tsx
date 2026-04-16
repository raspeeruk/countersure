import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { countries } from '@/lib/pseo/countries';

export function generateStaticParams() {
  return countries.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country } = await params;
  const c = countries.find((x) => x.slug === country);
  if (!c) return {};
  return {
    title: `${c.country} VAT number format (${c.vatPrefix})`,
    description: `${c.country} VAT number structure: ${c.pattern}. Validation source: ${c.validatorSource}.`,
    alternates: { canonical: `/vat-number-format/${c.slug}` },
  };
}

export default async function CountryFormatPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;
  const c = countries.find((x) => x.slug === country);
  if (!c) notFound();

  return (
    <article className="bg-clearance-white">
      <section className="bg-customs-green text-clearance-white grain border-b-4 border-stamp-red">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-clearance-white/60 mb-4">
            § VAT FORMAT — {c.countryCode}
          </p>
          <h1 className="font-heading font-black text-5xl md:text-6xl leading-[0.95] tracking-tight mb-6">
            {c.country} VAT number format
          </h1>
          <p className="text-xl text-clearance-white/80 max-w-2xl">
            Prefix <span className="font-mono text-stamp-red bg-clearance-white/10 px-2 py-1">{c.vatPrefix}</span>{' '}
            · {c.pattern}
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-stamp-red mb-3">
              § PATTERN
            </p>
            <p className="font-heading text-xl text-slate-ink leading-snug mb-6">{c.pattern}</p>
            <code className="font-mono text-xs bg-slate-ink/5 border border-slate-ink/10 p-4 block break-all">
              {c.regex}
            </code>
          </div>
          <div>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-customs-green mb-3">
              § EXAMPLES
            </p>
            <ul className="space-y-3">
              {c.examples.map((e) => (
                <li
                  key={e}
                  className="font-mono text-lg border-l-2 border-customs-green pl-4 text-slate-ink"
                >
                  {e}
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-mid mt-3 italic">
              Synthetic examples — do not represent real registered businesses.
            </p>
          </div>
        </div>

        <p className="section-rule mb-6">§ NOTES</p>
        <ul className="space-y-3 mb-16">
          {c.notes.map((n, idx) => (
            <li key={idx} className="grid grid-cols-[40px_1fr] gap-4 items-start">
              <span className="font-mono text-xs text-stamp-red mt-1">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <p className="text-slate-ink leading-relaxed">{n}</p>
            </li>
          ))}
        </ul>

        <div className="bg-sage-paper border-l-4 border-customs-green p-6">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-customs-green mb-2">
            § VALIDATION SOURCE
          </p>
          <p className="font-heading text-2xl text-slate-ink mb-2">{c.validatorSource}</p>
          <p className="text-slate-mid">
            {c.validatorSource === 'HMRC'
              ? 'UK numbers are validated live against HMRC. Countersure is wired directly to the HMRC Check VAT Number API.'
              : 'EU numbers are validated against the European Commission VIES service. Countersure VIES integration is on the immediate roadmap.'}
          </p>
        </div>
      </section>

      <section className="bg-customs-green text-clearance-white">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-black mb-4">
            Verify a {c.country} VAT number now.
          </h2>
          <Link
            href="/check-vat-number"
            className="inline-block bg-stamp-red hover:bg-stamp-red/90 text-clearance-white font-mono text-sm tracking-wider px-8 py-4 mt-4 transition"
          >
            CHECK A VAT NUMBER →
          </Link>
        </div>
      </section>

      <section className="bg-sage-paper border-t border-slate-ink/10">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-slate-mid mb-4">
            § OTHER COUNTRIES
          </p>
          <div className="flex flex-wrap gap-3">
            {countries
              .filter((x) => x.slug !== c.slug)
              .map((x) => (
                <Link
                  key={x.slug}
                  href={`/vat-number-format/${x.slug}`}
                  className="font-mono text-xs px-3 py-2 border border-slate-ink/20 hover:border-customs-green hover:text-customs-green transition"
                >
                  {x.vatPrefix} · {x.country}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </article>
  );
}
