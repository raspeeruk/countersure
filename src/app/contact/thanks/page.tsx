import Link from 'next/link';

export default function ContactThanksPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <div className="font-mono text-xs uppercase tracking-widest text-stamp-red mb-3">
        § RECEIVED
      </div>
      <h1 className="font-sans font-black text-4xl md:text-5xl text-slate-ink tracking-tight mb-6">
        Thanks — we've got you.
      </h1>
      <p className="font-body text-slate-mid mb-10">
        Your message is on its way to us. We respond within one business day.
      </p>
      <Link
        href="/"
        className="inline-block bg-customs-green text-clearance-white px-8 py-3 font-sans font-bold uppercase tracking-wider text-sm hover:bg-customs-green-deep transition-colors"
      >
        ← Back home
      </Link>
    </div>
  );
}
