import type { Metadata } from 'next';
import Link from 'next/link';
import { guides } from '@/lib/pseo/guides';

export const metadata: Metadata = {
  title: 'The Countersure Guide — UK supplier verification',
  description: 'Long-form guides on VAT verification, EU validation, MTD, fraud prevention, and audit evidence.',
  alternates: { canonical: '/guide' },
};

export default function GuideHub() {
  const categories = Array.from(new Set(guides.map((g) => g.category)));

  return (
    <article className="bg-clearance-white">
      <section className="bg-customs-green text-clearance-white grain border-b-4 border-stamp-red">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-clearance-white/60 mb-4">
            § THE GUIDE
          </p>
          <h1 className="font-heading font-black text-5xl md:text-6xl leading-[0.95] tracking-tight">
            The verification handbook.
          </h1>
          <p className="text-xl text-clearance-white/80 max-w-2xl mt-6">
            Everything we know about UK supplier verification — written for the people who do it.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        {categories.map((cat) => {
          const items = guides.filter((g) => g.category === cat);
          return (
            <section key={cat} className="mb-16">
              <p className="section-rule mb-6">§ {cat.toUpperCase()}</p>
              <ul className="grid md:grid-cols-2 gap-px bg-slate-ink/10 border border-slate-ink/10">
                {items.map((g) => (
                  <li key={g.slug} className="bg-clearance-white">
                    <Link
                      href={`/guide/${g.slug}`}
                      className="block p-6 hover:bg-sage-paper transition group h-full"
                    >
                      <p className="font-mono text-xs text-stamp-red mb-2">
                        {g.readingMinutes} min · {g.publishedAt}
                      </p>
                      <h2 className="font-heading text-xl font-bold text-slate-ink group-hover:text-customs-green mb-2 leading-snug">
                        {g.title}
                      </h2>
                      <p className="text-sm text-slate-mid leading-snug">{g.description}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </section>
    </article>
  );
}
