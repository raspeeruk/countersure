import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Countersure API — UK supplier verification',
  description:
    'REST API for UK VAT verification. Single check, bulk submit, webhooks for status drift. Pricing from £199/mo.',
  alternates: { canonical: '/api-docs' },
};

export default function ApiDocsPage() {
  return (
    <article className="bg-clearance-white">
      <section className="bg-slate-ink text-clearance-white grain border-b-4 border-stamp-red">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-clearance-white/60 mb-4">
            § THE COUNTERSURE API
          </p>
          <h1 className="font-heading font-black text-5xl md:text-6xl leading-[0.95] tracking-tight mb-6">
            Verify a supplier in one HTTP call.
          </h1>
          <p className="text-xl text-clearance-white/80 max-w-2xl mb-8">
            REST. JSON. Stamped audit IDs. Designed for ERPs, KYB stacks, marketplaces, and bookkeeping engines.
          </p>
          <div className="flex gap-3">
            <Link
              href="/pricing"
              className="inline-block bg-stamp-red hover:bg-stamp-red/90 text-clearance-white font-mono text-sm tracking-wider px-6 py-3 transition"
            >
              SEE PRICING →
            </Link>
            <Link
              href="/contact?topic=api"
              className="inline-block border border-clearance-white/30 hover:border-clearance-white text-clearance-white font-mono text-sm tracking-wider px-6 py-3 transition"
            >
              REQUEST KEYS →
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <p className="section-rule mb-6">§ AUTH</p>
        <pre className="bg-slate-ink text-clearance-white font-mono text-sm p-6 overflow-x-auto border-l-4 border-stamp-red">
{`Authorization: Bearer cs_live_a1b2c3d4...
Content-Type: application/json`}
        </pre>
        <p className="text-slate-mid mt-3 text-sm">
          Test keys (<code className="font-mono text-stamp-red">cs_test_*</code>) hit a sandbox returning deterministic responses.
        </p>
      </section>

      <section className="bg-sage-paper border-y border-slate-ink/10">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <p className="section-rule mb-6">§ SINGLE CHECK</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="font-mono text-xs uppercase text-stamp-red mb-2">REQUEST</p>
              <pre className="bg-clearance-white border border-slate-ink/10 font-mono text-sm p-4 overflow-x-auto">
{`POST /v1/vat/check
{
  "vat_number": "GB123456789",
  "requester_vat": "GB987654321"
}`}
              </pre>
            </div>
            <div>
              <p className="font-mono text-xs uppercase text-customs-green mb-2">RESPONSE</p>
              <pre className="bg-clearance-white border border-slate-ink/10 font-mono text-sm p-4 overflow-x-auto">
{`{
  "verification_id": "CS-20260416-7K3M9X1Q",
  "status": "verified",
  "vat_number": "GB123456789",
  "name": "Acme Trading Ltd",
  "address": "1 High St, London",
  "checked_at": "2026-04-16T14:21:09Z",
  "source": "HMRC",
  "pdf_url": "https://countersure.com/p/CS-..."
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <p className="section-rule mb-6">§ BULK SUBMIT</p>
        <pre className="bg-slate-ink text-clearance-white font-mono text-sm p-6 overflow-x-auto border-l-4 border-stamp-red">
{`POST /v1/vat/bulk
{ "vat_numbers": ["GB123456789", "GB987654321", ...] }

→ returns { "job_id": "...", "status_url": "..." }
   poll until "complete", then download CSV + zip of PDFs`}
        </pre>
      </section>

      <section className="bg-sage-paper border-y border-slate-ink/10">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <p className="section-rule mb-6">§ WEBHOOKS</p>
          <p className="text-slate-ink mb-4">
            Subscribe to status drift on any verified VAT number. Countersure re-checks on a schedule and fires:
          </p>
          <pre className="bg-clearance-white border border-slate-ink/10 font-mono text-sm p-4 overflow-x-auto">
{`POST <your_endpoint>
{
  "event": "vat.status_changed",
  "vat_number": "GB123456789",
  "previous_status": "verified",
  "current_status": "deregistered",
  "verification_id": "CS-20260420-A4K1MX9P",
  "checked_at": "2026-04-20T03:00:00Z"
}`}
          </pre>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <p className="section-rule mb-6">§ RATE LIMITS & SLAs</p>
        <ul className="space-y-3 text-slate-ink/85">
          <li className="grid grid-cols-[140px_1fr] gap-4 items-start">
            <span className="font-mono text-sm text-stamp-red">Pro</span>
            <span>1,000 checks / month · 5 req/sec · email support</span>
          </li>
          <li className="grid grid-cols-[140px_1fr] gap-4 items-start">
            <span className="font-mono text-sm text-stamp-red">Team</span>
            <span>5,000 checks / month · 20 req/sec · Slack support</span>
          </li>
          <li className="grid grid-cols-[140px_1fr] gap-4 items-start">
            <span className="font-mono text-sm text-stamp-red">API</span>
            <span>50,000 checks / month · 100 req/sec · 99.9% uptime SLA</span>
          </li>
        </ul>
      </section>

      <section className="bg-customs-green text-clearance-white">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-black mb-4">
            Talk to us about volume.
          </h2>
          <Link
            href="/contact?topic=api"
            className="inline-block bg-stamp-red hover:bg-stamp-red/90 text-clearance-white font-mono text-sm tracking-wider px-8 py-4 mt-4 transition"
          >
            REQUEST API ACCESS →
          </Link>
        </div>
      </section>
    </article>
  );
}
