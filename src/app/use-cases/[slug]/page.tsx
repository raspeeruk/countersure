import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useCases } from '@/lib/pseo/use-cases';
import { SearchBar } from '@/components/SearchBar';

export function generateStaticParams() {
  return useCases.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const u = useCases.find((x) => x.slug === slug);
  if (!u) return {};
  return {
    title: u.title,
    description: u.oneLiner,
    alternates: { canonical: `/use-cases/${u.slug}` },
  };
}

export default async function UseCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const u = useCases.find((x) => x.slug === slug);
  if (!u) notFound();

  return (
    <article className="bg-clearance-white">
      <section className="bg-customs-green text-clearance-white grain border-b-4 border-stamp-red">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-clearance-white/60 mb-4">
            § USE CASE
          </p>
          <h1 className="font-heading font-black text-5xl md:text-6xl leading-[0.95] tracking-tight mb-6">
            {u.title}
          </h1>
          <p className="text-2xl text-clearance-white/80 max-w-2xl mb-10">{u.oneLiner}</p>
          <SearchBar variant="hero" />
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-stamp-red mb-4">
            § THE PROBLEM
          </p>
          <p className="font-heading text-xl leading-snug text-slate-ink">{u.problem}</p>
        </div>
        <div>
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-customs-green mb-4">
            § THE FIX
          </p>
          <p className="font-heading text-xl leading-snug text-slate-ink">{u.solution}</p>
        </div>
      </section>

      <section className="bg-sage-paper border-y border-slate-ink/10">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <p className="section-rule mb-8">§ HOW IT RUNS</p>
          <ol className="space-y-6">
            {u.steps.map((s, idx) => (
              <li key={idx} className="grid grid-cols-[60px_1fr] gap-6 items-start">
                <span className="font-mono text-3xl text-stamp-red leading-none">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="font-heading text-xl font-bold text-slate-ink mb-1">{s.label}</p>
                  <p className="text-slate-mid">{s.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-slate-mid mb-4">
          § WHO USES THIS
        </p>
        <ul className="grid md:grid-cols-3 gap-4 mb-12">
          {u.whoFor.map((w) => (
            <li
              key={w}
              className="border-l-2 border-customs-green pl-4 font-heading text-lg text-slate-ink"
            >
              {w}
            </li>
          ))}
        </ul>
        <blockquote className="border-l-4 border-stamp-red pl-6 italic text-xl text-slate-ink">
          {u.proof}
        </blockquote>
      </section>

      <section className="bg-customs-green text-clearance-white">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-black mb-4">
            Try it on a real supplier.
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
            § OTHER USE CASES
          </p>
          <div className="flex flex-wrap gap-3">
            {useCases
              .filter((x) => x.slug !== u.slug)
              .map((x) => (
                <Link
                  key={x.slug}
                  href={`/use-cases/${x.slug}`}
                  className="font-mono text-xs px-3 py-2 border border-slate-ink/20 hover:border-customs-green hover:text-customs-green transition"
                >
                  {x.title}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </article>
  );
}
