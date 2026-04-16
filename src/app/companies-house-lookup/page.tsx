import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Companies House lookup — Countersure',
  description:
    'Stamped Companies House verification, paired with VAT and EORI status, in one supplier clearance pack. On the immediate roadmap.',
  alternates: { canonical: '/companies-house-lookup' },
};

export default function CompaniesHousePage() {
  return (
    <article className="bg-clearance-white">
      <section className="bg-customs-green text-clearance-white grain border-b-4 border-stamp-red">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-clearance-white/60 mb-4">
            § COMING SOON — COMPANIES HOUSE
          </p>
          <h1 className="font-heading font-black text-5xl md:text-6xl leading-[0.95] tracking-tight mb-6">
            One stamp.
            <br />
            Three registers.
          </h1>
          <p className="text-2xl text-clearance-white/80 max-w-2xl mb-8">
            VAT, EORI and Companies House in a single clearance pack. The whole picture, stamped and filed.
          </p>
          <Link
            href="/contact?topic=companies-house"
            className="inline-block bg-stamp-red hover:bg-stamp-red/90 text-clearance-white font-mono text-sm tracking-wider px-8 py-4 transition"
          >
            JOIN THE BETA →
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <p className="section-rule mb-6">§ WHY ALL THREE TOGETHER</p>
        <div className="prose prose-lg max-w-none text-slate-ink/85">
          <p>
            VAT confirms tax-active operation. EORI confirms customs eligibility. Companies House confirms legal existence and the people behind it.
          </p>
          <p>
            Each register answers one question. No single one is enough. Today most teams check them across three browser tabs, screenshot each, and hope for the best.
          </p>
          <p>
            Countersure unifies the three into one stamped pack. One verification ID. One date. One filing-ready PDF.
          </p>
        </div>
      </section>

      <section className="bg-sage-paper border-y border-slate-ink/10">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <p className="section-rule mb-6">§ WHAT THE PACK WILL CONTAIN</p>
          <ul className="grid md:grid-cols-3 gap-6">
            <li className="border-l-2 border-customs-green pl-4">
              <p className="font-mono text-xs text-stamp-red mb-2">VAT</p>
              <p className="font-heading text-lg font-bold mb-1">HMRC live</p>
              <p className="text-sm text-slate-mid">Status, name, address.</p>
            </li>
            <li className="border-l-2 border-customs-green pl-4">
              <p className="font-mono text-xs text-stamp-red mb-2">EORI</p>
              <p className="font-heading text-lg font-bold mb-1">HMRC + EU TAXUD</p>
              <p className="text-sm text-slate-mid">Active, deactivated, never issued.</p>
            </li>
            <li className="border-l-2 border-customs-green pl-4">
              <p className="font-mono text-xs text-stamp-red mb-2">CO HOUSE</p>
              <p className="font-heading text-lg font-bold mb-1">CH live</p>
              <p className="text-sm text-slate-mid">Status, officers, accounts state.</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-black text-slate-ink mb-4">
          Stamp the VAT side now.
        </h2>
        <Link
          href="/check-vat-number"
          className="inline-block bg-customs-green hover:bg-customs-green/90 text-clearance-white font-mono text-sm tracking-wider px-8 py-4 mt-4 transition"
        >
          CHECK A VAT NUMBER →
        </Link>
      </section>
    </article>
  );
}
