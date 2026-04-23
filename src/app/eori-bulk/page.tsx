import type { Metadata } from 'next';
import Link from 'next/link';
import { EoriBulkClient } from './EoriBulkClient';

export const metadata: Metadata = {
  title: 'Bulk EORI check — CSV upload',
  description: 'Upload a CSV of UK EORI numbers. Get a stamped result CSV in seconds. Up to 100 rows per request.',
  alternates: { canonical: '/eori-bulk' },
};

export default function EoriBulkPage() {
  return (
    <article className="bg-clearance-white">
      <section className="bg-customs-green text-clearance-white grain border-b-4 border-stamp-red">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-clearance-white/60 mb-4">
            § BULK EORI VERIFY
          </p>
          <h1 className="font-heading font-black text-5xl md:text-6xl leading-[0.95] tracking-tight mb-6">
            Hundreds of EORIs,
            <br />
            one upload.
          </h1>
          <p className="text-xl text-clearance-white/80 max-w-2xl">
            Drop in a CSV. Countersure runs each EORI number against the live HMRC customs register,
            returns a stamped result CSV. Up to 100 rows per request;{' '}
            <Link href="/pricing" className="underline">
              upgrade for higher batch limits
            </Link>.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <EoriBulkClient />
      </section>

      <section className="bg-sage-paper border-y border-slate-ink/10">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <p className="section-rule mb-4">§ CSV FORMAT</p>
          <p className="text-slate-ink mb-4">
            Single column. One EORI number per row. Header optional (we accept{' '}
            <code className="font-mono text-stamp-red">eori_number</code>,{' '}
            <code className="font-mono text-stamp-red">eori</code>, or{' '}
            <code className="font-mono text-stamp-red">number</code>).
          </p>
          <pre className="bg-clearance-white border border-slate-ink/10 font-mono text-sm p-4">{`eori_number
GB123456789000
GB987654321000
GB555666777000`}</pre>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-black text-slate-ink mb-4">
          Need to check a single number?
        </h2>
        <Link
          href="/eori-check"
          className="inline-block bg-customs-green hover:bg-customs-green/90 text-clearance-white font-mono text-sm tracking-wider px-8 py-4 transition"
        >
          SINGLE EORI CHECK →
        </Link>
      </section>
    </article>
  );
}
