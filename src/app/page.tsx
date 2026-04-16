import { SearchBar } from '@/components/SearchBar';
import { Stamp } from '@/components/Stamp';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      {/* HERO — customs hall green band, search left, demo stamp right */}
      <section className="bg-customs-green text-clearance-white grain">
        <div className="max-w-[1280px] mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7">
            <div className="font-mono text-xs uppercase tracking-widest text-stamp-red mb-6">
              § 01 — UK SUPPLIER CLEARANCE
            </div>
            <h1 className="font-sans font-black text-5xl md:text-7xl leading-[0.95] tracking-tight mb-6">
              Know who you<br />trade with.
            </h1>
            <p className="font-body text-lg md:text-xl text-clearance-white/85 mb-10 max-w-xl">
              Verify any UK VAT or EORI number against HMRC in one second.
              Get an audit-ready PDF stamped with the date, the source, and a Countersure verification ID.
            </p>
            <SearchBar />
            <div className="mt-6 font-mono text-xs uppercase tracking-widest text-clearance-white/60">
              Free · No signup · 5 checks per day
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <Stamp countryCode="GB" number="123456789" date="2026-04-14" size={220} animate={false} />
          </div>
        </div>
      </section>

      {/* PROOF STRIP — what's verified */}
      <section className="bg-clearance-white border-y border-slate-ink/10">
        <div className="max-w-[1280px] mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 font-mono text-xs uppercase tracking-widest text-slate-mid">
          <div>
            <div className="text-3xl font-sans font-black text-customs-green normal-case tracking-tight">2.2M</div>
            UK VAT-registered businesses
          </div>
          <div>
            <div className="text-3xl font-sans font-black text-customs-green normal-case tracking-tight">1 sec</div>
            Direct from HMRC
          </div>
          <div>
            <div className="text-3xl font-sans font-black text-customs-green normal-case tracking-tight">PDF</div>
            Audit-ready every time
          </div>
          <div>
            <div className="text-3xl font-sans font-black text-customs-green normal-case tracking-tight">API</div>
            Integrate in minutes
          </div>
        </div>
      </section>

      {/* WHY — three declaration-style rows */}
      <section className="bg-clearance-white py-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="font-mono text-xs uppercase tracking-widest text-stamp-red mb-3">
            § 02 — WHY COUNTERSURE
          </div>
          <h2 className="font-sans font-black text-4xl md:text-5xl text-slate-ink tracking-tight mb-12 max-w-2xl">
            Built for the audit, not the inbox.
          </h2>

          <div className="divide-y divide-slate-ink/10 border-y border-slate-ink/10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-10">
              <div className="md:col-span-1 font-mono text-sm text-stamp-red">01</div>
              <div className="md:col-span-4 font-sans font-bold text-xl text-slate-ink">
                Every check is stamped, dated, signed.
              </div>
              <div className="md:col-span-7 font-body text-slate-mid">
                The Stamp records exactly what HMRC returned, when, and to whom. Drop it
                straight into your supplier file. Pass any audit.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-10">
              <div className="md:col-span-1 font-mono text-sm text-stamp-red">02</div>
              <div className="md:col-span-4 font-sans font-bold text-xl text-slate-ink">
                Bulk-clear a thousand suppliers in one upload.
              </div>
              <div className="md:col-span-7 font-body text-slate-mid">
                Drop a CSV. Get back a row-by-row verification with company names,
                addresses, status, and per-row PDFs zipped for filing.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-10">
              <div className="md:col-span-1 font-mono text-sm text-stamp-red">03</div>
              <div className="md:col-span-4 font-sans font-bold text-xl text-slate-ink">
                Watch a list. Get notified the second a status changes.
              </div>
              <div className="md:col-span-7 font-body text-slate-mid">
                Add suppliers to a watchlist. We'll email you the moment HMRC
                deregisters them, the address changes, or anything material moves.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="bg-customs-green text-clearance-white py-24 grain">
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="font-mono text-xs uppercase tracking-widest text-stamp-red mb-3">
            § 03 — WHO IT'S FOR
          </div>
          <h2 className="font-sans font-black text-4xl md:text-5xl tracking-tight mb-12 max-w-2xl">
            Procurement, accounting, compliance.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-clearance-white/10">
            {[
              { who: 'Procurement', use: 'Clear new suppliers before raising the first PO. Build a clean trade file from day one.' },
              { who: 'Accountants', use: 'Onboard client suppliers in bulk. White-label PDFs for your firm. Save hours on every audit.' },
              { who: 'Compliance', use: 'Hard evidence of due diligence at the moment of trade. Defensible audit trail for HMRC and AML.' },
            ].map((b) => (
              <div key={b.who} className="bg-customs-green p-8">
                <div className="font-mono text-xs uppercase tracking-widest text-clearance-white/60 mb-3">
                  Built for
                </div>
                <div className="font-sans font-bold text-2xl mb-3">{b.who}</div>
                <p className="font-body text-clearance-white/85">{b.use}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-clearance-white py-24">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="font-sans font-black text-4xl md:text-5xl text-slate-ink tracking-tight mb-6">
            Clear your first supplier in one second.
          </h2>
          <p className="font-body text-lg text-slate-mid mb-10 max-w-xl mx-auto">
            Free, no signup, audit-ready. Paid plans unlock bulk, PDFs, watchlists, and the API.
          </p>
          <div className="flex justify-center">
            <SearchBar />
          </div>
          <div className="mt-8 font-mono text-xs uppercase tracking-widest text-slate-mid">
            <Link href="/pricing" className="hover:text-customs-green">See plans →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
