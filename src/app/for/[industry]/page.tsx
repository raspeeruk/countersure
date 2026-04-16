import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { industries } from '@/lib/pseo/industries';
import { SearchBar } from '@/components/SearchBar';
import { Stamp } from '@/components/Stamp';

export function generateStaticParams() {
  return industries.map((i) => ({ industry: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}): Promise<Metadata> {
  const { industry } = await params;
  const i = industries.find((x) => x.slug === industry);
  if (!i) return {};
  return {
    title: `Countersure for ${i.name}`,
    description: i.hook,
    alternates: { canonical: `/for/${i.slug}` },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry } = await params;
  const i = industries.find((x) => x.slug === industry);
  if (!i) notFound();

  const today = new Date().toISOString().slice(0, 10);

  return (
    <article>
      {/* Hero */}
      <section className="bg-customs-green text-clearance-white grain border-b-4 border-stamp-red">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-[1.4fr_1fr] gap-12 items-center">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-clearance-white/60 mb-4">
              § FOR — {i.name.toUpperCase()}
            </p>
            <h1 className="font-heading font-black text-5xl md:text-6xl leading-[0.95] tracking-tight mb-6">
              {i.hook}
            </h1>
            <p className="text-xl text-clearance-white/80 mb-8 max-w-xl">{i.pain}</p>
            <SearchBar variant="hero" />
            <p className="font-mono text-xs text-clearance-white/50 mt-3">
              For: {i.audience}
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <Stamp countryCode="GB" number={i.slug.slice(0, 9).toUpperCase()} date={today} animate />
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="bg-clearance-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <p className="section-rule mb-8">§ 02 — THE FLOW</p>
          <div className="grid md:grid-cols-4 gap-px bg-slate-ink/10 border border-slate-ink/10">
            {i.workflow.map((step, idx) => (
              <div key={idx} className="bg-clearance-white p-8">
                <div className="font-mono text-xs text-stamp-red mb-3">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <p className="font-heading text-lg leading-snug">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Risk note */}
      <section className="bg-sage-paper border-y border-slate-ink/10">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-stamp-red mb-4">
            § RISK NOTE
          </p>
          <p className="font-heading text-2xl md:text-3xl leading-snug text-slate-ink">
            {i.riskNote}
          </p>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-clearance-white">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <p className="font-heading text-3xl md:text-4xl leading-snug text-slate-ink italic mb-4">
            &ldquo;{i.caseQuote}&rdquo;
          </p>
          <p className="font-mono text-xs text-slate-mid">— {i.name}, anonymised</p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-customs-green text-clearance-white">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-black mb-4">
            Stamp your first supplier free.
          </h2>
          <p className="text-clearance-white/80 mb-6">No card. No signup. Verified by HMRC.</p>
          <Link
            href="/check-vat-number"
            className="inline-block bg-stamp-red hover:bg-stamp-red/90 text-clearance-white font-mono text-sm tracking-wider px-8 py-4 transition"
          >
            CHECK A VAT NUMBER →
          </Link>
        </div>
      </section>

      {/* Cross-links */}
      <section className="bg-sage-paper border-t border-slate-ink/10">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-slate-mid mb-4">
            § OTHER INDUSTRIES
          </p>
          <div className="flex flex-wrap gap-3">
            {industries
              .filter((x) => x.slug !== i.slug)
              .map((x) => (
                <Link
                  key={x.slug}
                  href={`/for/${x.slug}`}
                  className="font-mono text-xs px-3 py-2 border border-slate-ink/20 hover:border-customs-green hover:text-customs-green transition"
                >
                  {x.name}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </article>
  );
}
