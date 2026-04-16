import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { guides } from '@/lib/pseo/guides';

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = guides.find((x) => x.slug === slug);
  if (!g) return {};
  return {
    title: g.title,
    description: g.description,
    alternates: { canonical: `/guide/${g.slug}` },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = guides.find((x) => x.slug === slug);
  if (!g) notFound();

  const related = guides.filter((x) => x.slug !== g.slug && x.category === g.category).slice(0, 4);

  return (
    <article className="bg-clearance-white">
      <section className="bg-sage-paper border-b border-slate-ink/10">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-stamp-red mb-4">
            § {g.category.toUpperCase()} · {g.readingMinutes} MIN READ
          </p>
          <h1 className="font-heading font-black text-4xl md:text-5xl leading-[1.05] tracking-tight text-slate-ink mb-6">
            {g.title}
          </h1>
          <p className="text-xl text-slate-mid leading-snug">{g.description}</p>
          <p className="font-mono text-xs text-slate-mid/70 mt-6">
            Published {g.publishedAt} · Countersure
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16">
        {g.body.map((s, idx) => (
          <section key={idx} className="mb-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-slate-ink mb-4 leading-snug">
              {s.heading}
            </h2>
            {s.paragraphs.map((p, pi) => (
              <p
                key={pi}
                className="text-slate-ink/85 leading-relaxed mb-4 text-lg"
              >
                {p}
              </p>
            ))}
          </section>
        ))}
      </section>

      <section className="bg-customs-green text-clearance-white">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-black mb-4">
            Stamp a real VAT number now.
          </h2>
          <p className="text-clearance-white/80 mb-6">Free for the first ten checks. No card.</p>
          <Link
            href="/check-vat-number"
            className="inline-block bg-stamp-red hover:bg-stamp-red/90 text-clearance-white font-mono text-sm tracking-wider px-8 py-4 transition"
          >
            CHECK A VAT NUMBER →
          </Link>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-sage-paper border-t border-slate-ink/10">
          <div className="max-w-3xl mx-auto px-6 py-12">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-slate-mid mb-6">
              § MORE IN {g.category.toUpperCase()}
            </p>
            <ul className="space-y-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/guide/${r.slug}`}
                    className="font-heading text-xl text-slate-ink hover:text-customs-green transition"
                  >
                    {r.title} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </article>
  );
}
