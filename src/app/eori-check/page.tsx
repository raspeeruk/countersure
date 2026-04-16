import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'EORI number check — Countersure',
  description:
    'EORI verification by Countersure. Validate UK and EU EORI numbers, with a stamped audit artefact for every check. On the immediate roadmap.',
  alternates: { canonical: '/eori-check' },
};

export default function EoriCheckPage() {
  return (
    <article className="bg-clearance-white">
      <section className="bg-customs-green text-clearance-white grain border-b-4 border-stamp-red">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-clearance-white/60 mb-4">
            § COMING SOON — EORI
          </p>
          <h1 className="font-heading font-black text-5xl md:text-6xl leading-[0.95] tracking-tight mb-6">
            EORI verification, stamped.
          </h1>
          <p className="text-2xl text-clearance-white/80 max-w-2xl mb-8">
            The Countersure stamp, applied to UK and EU customs identifiers. No more clearance holds because of a bad EORI.
          </p>
          <Link
            href="/contact?topic=eori"
            className="inline-block bg-stamp-red hover:bg-stamp-red/90 text-clearance-white font-mono text-sm tracking-wider px-8 py-4 transition"
          >
            JOIN THE EORI BETA →
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <p className="section-rule mb-6">§ WHY EORI BELONGS HERE</p>
        <div className="prose prose-lg max-w-none text-slate-ink/85">
          <p>
            A UK EORI number is the customs counterpart to the VAT number. Without it, goods do not move across the border. With an invalid one, they sit in the warehouse waiting for a query that costs days, not hours.
          </p>
          <p>
            Most operators check the EORI once, at supplier setup, and never again. EORIs deactivate. Customers change suppliers. Freight forwarders inherit stale records.
          </p>
          <p>
            Countersure will treat EORI verification with the same discipline as VAT — a stamped record per check, retained, re-checkable, and tamper-evident.
          </p>
        </div>
      </section>

      <section className="bg-sage-paper border-y border-slate-ink/10">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <p className="section-rule mb-6">§ ON THE ROADMAP</p>
          <ul className="space-y-4 text-slate-ink/85 leading-relaxed">
            <li className="grid grid-cols-[80px_1fr] gap-4 items-start">
              <span className="font-mono text-xs text-stamp-red">PHASE 1</span>
              <span>UK EORI lookup against HMRC. Stamped PDF artefact. Free for occasional, paid for bulk.</span>
            </li>
            <li className="grid grid-cols-[80px_1fr] gap-4 items-start">
              <span className="font-mono text-xs text-stamp-red">PHASE 2</span>
              <span>EU EORI lookup against the EC Taxation and Customs Union database.</span>
            </li>
            <li className="grid grid-cols-[80px_1fr] gap-4 items-start">
              <span className="font-mono text-xs text-stamp-red">PHASE 3</span>
              <span>Combined VAT + EORI clearance pack. One stamp per supplier per quarter.</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-black text-slate-ink mb-4">
          Today, start with the VAT check.
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
