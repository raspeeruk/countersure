import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-slate-ink/10 bg-clearance-white">
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-mono text-xs tracking-widest text-stamp-red uppercase">
            §
          </span>
          <span className="font-sans font-bold text-lg tracking-tight text-slate-ink">
            Countersure
          </span>
        </Link>
        <nav className="flex items-center gap-8 font-mono text-xs uppercase tracking-widest">
          <Link href="/check-vat-number" className="text-slate-ink hover:text-customs-green">
            VAT Check
          </Link>
          <Link href="/eori-check" className="text-slate-ink hover:text-customs-green">
            EORI
          </Link>
          <Link href="/bulk" className="text-slate-ink hover:text-customs-green">
            Bulk
          </Link>
          <Link href="/use-cases" className="text-slate-ink hover:text-customs-green">
            Use cases
          </Link>
          <Link href="/api-docs" className="text-slate-ink hover:text-customs-green">
            API
          </Link>
          <Link href="/guide" className="text-slate-ink hover:text-customs-green">
            Guide
          </Link>
          <Link href="/pricing" className="text-slate-ink hover:text-customs-green">
            Pricing
          </Link>
          <Link
            href="/check-vat-number"
            className="bg-customs-green text-clearance-white px-4 py-2 hover:bg-customs-green-deep transition-colors"
          >
            Run a check →
          </Link>
        </nav>
      </div>
    </header>
  );
}
