import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-slate-ink/10 bg-sage-paper">
      <div className="max-w-[1280px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="font-sans font-bold text-slate-ink">Countersure</div>
          <p className="font-body text-sm text-slate-mid mt-2">
            Know who you trade with.
          </p>
        </div>
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-stamp-red mb-3">
            Product
          </div>
          <ul className="space-y-2 font-body text-sm">
            <li><Link href="/check-vat-number" className="hover:text-customs-green">VAT check</Link></li>
            <li><Link href="/bulk" className="hover:text-customs-green">Bulk check</Link></li>
            <li><Link href="/eori-check" className="hover:text-customs-green">EORI check</Link></li>
            <li><Link href="/companies-house-lookup" className="hover:text-customs-green">Companies House</Link></li>
            <li><Link href="/api-docs" className="hover:text-customs-green">API</Link></li>
            <li><Link href="/pricing" className="hover:text-customs-green">Pricing</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-stamp-red mb-3">
            Resources
          </div>
          <ul className="space-y-2 font-body text-sm">
            <li><Link href="/guide" className="hover:text-customs-green">Guide</Link></li>
            <li><Link href="/use-cases" className="hover:text-customs-green">Use cases</Link></li>
            <li><Link href="/for" className="hover:text-customs-green">By industry</Link></li>
            <li><Link href="/vat-number-format" className="hover:text-customs-green">VAT formats</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-stamp-red mb-3">
            Company
          </div>
          <ul className="space-y-2 font-body text-sm">
            <li><Link href="/contact" className="hover:text-customs-green">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-customs-green">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-customs-green">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-ink/10 py-4">
        <div className="max-w-[1280px] mx-auto px-6 flex justify-between font-mono text-xs text-slate-mid">
          <span>© {new Date().getFullYear()} Countersure</span>
          <span>UK Supplier Verification · § REGISTERED</span>
        </div>
      </div>
    </footer>
  );
}
