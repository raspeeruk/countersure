import type { Metadata } from 'next';
import Link from 'next/link';
import { SearchBar } from '@/components/SearchBar';

export const metadata: Metadata = {
  title: 'EORI number check — Countersure',
  description:
    'Verify any UK EORI number against the live HMRC register. Instant result, stamped PDF artefact, no signup required.',
  alternates: { canonical: '/eori-check' },
};

export default function EoriCheckPage() {
  return (
    <article className="bg-clearance-white">
      <section className="bg-customs-green text-clearance-white grain border-b-4 border-stamp-red">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-clearance-white/60 mb-4">
            § EORI VERIFICATION
          </p>
          <h1 className="font-heading font-black text-5xl md:text-6xl leading-[0.95] tracking-tight mb-6">
            EORI verification, stamped.
          </h1>
          <p className="text-2xl text-clearance-white/80 max-w-2xl mb-10">
            Check any UK EORI number against the live HMRC customs register.
            No signup, no sandbox — production data, right now.
          </p>
          <SearchBar
            placeholder="GB123456789000"
            action="/eori"
            label="EORI №"
          />
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <p className="section-rule mb-6">§ WHAT IS AN EORI NUMBER?</p>
        <div className="prose prose-lg max-w-none text-slate-ink/85">
          <p>
            An <strong>Economic Operators Registration and Identification (EORI)</strong> number
            is required for any business moving goods into or out of the UK. Without a valid EORI,
            customs declarations are rejected and goods sit in the warehouse.
          </p>
          <p>
            UK EORI numbers follow the format <code className="font-mono text-stamp-red">GB</code> followed
            by 12 digits (typically your 9-digit VAT number plus <code className="font-mono text-stamp-red">000</code>).
            HMRC issues them automatically to VAT-registered businesses, but they can be revoked, and
            non-VAT-registered traders must apply separately.
          </p>
          <p>
            Countersure checks EORI numbers against HMRC&apos;s live production register — not a sandbox,
            not a cache. Every check produces a stamped audit artefact you can retain for compliance.
          </p>
        </div>
      </section>

      <section className="bg-sage-paper border-y border-slate-ink/10">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <p className="section-rule mb-6">§ WHY CHECK EORI NUMBERS?</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-heading font-black text-xl text-slate-ink mb-3">
                Customs clearance
              </h3>
              <p className="text-slate-ink/70">
                An invalid EORI on a customs declaration triggers holds, delays, and storage charges.
                Check before you ship.
              </p>
            </div>
            <div>
              <h3 className="font-heading font-black text-xl text-slate-ink mb-3">
                Supplier onboarding
              </h3>
              <p className="text-slate-ink/70">
                Verify new suppliers&apos; EORI numbers at setup. A stamped PDF in the supplier file
                satisfies procurement audits.
              </p>
            </div>
            <div>
              <h3 className="font-heading font-black text-xl text-slate-ink mb-3">
                Ongoing compliance
              </h3>
              <p className="text-slate-ink/70">
                EORI numbers can be revoked. Re-check quarterly to catch deactivated registrations
                before they cause problems.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sage-paper border-b border-slate-ink/10">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <p className="section-rule mb-6">§ ON THE ROADMAP</p>
          <ul className="space-y-4 text-slate-ink/85 leading-relaxed">
            <li className="grid grid-cols-[80px_1fr] gap-4 items-start">
              <span className="font-mono text-xs text-customs-green font-bold">LIVE</span>
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
          Need to check hundreds?
        </h2>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/eori-bulk"
            className="inline-block bg-customs-green hover:bg-customs-green/90 text-clearance-white font-mono text-sm tracking-wider px-8 py-4 transition"
          >
            BULK EORI CHECK →
          </Link>
          <Link
            href="/check-vat-number"
            className="inline-block border border-slate-ink/20 text-slate-ink font-mono text-sm tracking-wider px-8 py-4 transition hover:bg-sage-paper"
          >
            CHECK A VAT NUMBER →
          </Link>
        </div>
      </section>
    </article>
  );
}
