import type { Metadata } from 'next';
import Link from 'next/link';
import { SearchBar } from '@/components/SearchBar';

export const metadata: Metadata = {
  title: 'Check a UK VAT Number',
  description:
    'Free UK VAT number checker — verify any GB VAT number against HMRC in one second. Audit-ready PDF available with Pro.',
  alternates: { canonical: 'https://countersure.com/check-vat-number' },
};

export default function CheckVatNumberPage() {
  return (
    <>
      <section className="bg-customs-green text-clearance-white grain">
        <div className="max-w-[1280px] mx-auto px-6 py-20 relative z-10">
          <div className="font-mono text-xs uppercase tracking-widest text-stamp-red mb-4">
            § FREE VAT CHECK
          </div>
          <h1 className="font-sans font-black text-5xl md:text-7xl tracking-tight leading-[0.95] mb-6 max-w-3xl">
            Check a UK VAT number.
          </h1>
          <p className="font-body text-lg md:text-xl text-clearance-white/85 mb-10 max-w-2xl">
            Verify any GB VAT registration against HMRC's live database in one second.
            Free for casual checks. Bulk and audit PDFs from £19/month.
          </p>
          <SearchBar />
          <div className="mt-6 font-mono text-xs uppercase tracking-widest text-clearance-white/60">
            5 free checks per day · No signup required
          </div>
        </div>
      </section>

      <section className="bg-clearance-white py-20">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
            <div className="font-mono text-xs uppercase tracking-widest text-stamp-red mb-3">
              § HOW IT WORKS
            </div>
            <h2 className="font-sans font-black text-4xl text-slate-ink tracking-tight mb-8">
              Three seconds. One source of truth.
            </h2>
            <ol className="space-y-8 font-body text-slate-mid">
              <li>
                <span className="font-mono text-stamp-red mr-3">01</span>
                <span className="font-sans font-bold text-slate-ink">Paste the VAT number.</span>{' '}
                Any format works — with or without GB, spaces or no spaces. We strip and validate it for you.
              </li>
              <li>
                <span className="font-mono text-stamp-red mr-3">02</span>
                <span className="font-sans font-bold text-slate-ink">We check HMRC directly.</span>{' '}
                Not a cached database — a live call to the HMRC Check UK VAT Number API. Same data
                a tax inspector sees.
              </li>
              <li>
                <span className="font-mono text-stamp-red mr-3">03</span>
                <span className="font-sans font-bold text-slate-ink">You get The Stamp.</span>{' '}
                Company name, address, status, timestamp, and a Countersure verification ID.
                Pro accounts can export an audit-ready PDF.
              </li>
            </ol>
          </div>
          <div className="md:col-span-5 bg-sage-paper p-8 status-verified">
            <div className="font-mono text-xs uppercase tracking-widest text-stamp-red mb-3">
              § WHO USES IT
            </div>
            <ul className="space-y-3 font-body text-slate-ink">
              <li>Procurement teams clearing new suppliers</li>
              <li>Accountants onboarding client suppliers</li>
              <li>Compliance officers building audit trails</li>
              <li>Importers verifying GB-NI trade partners</li>
              <li>Anyone raising an invoice they want to be paid</li>
            </ul>
            <Link
              href="/pricing"
              className="mt-8 inline-block bg-customs-green text-clearance-white px-6 py-3 font-sans font-bold uppercase tracking-wider text-sm hover:bg-customs-green-deep"
            >
              See plans →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
