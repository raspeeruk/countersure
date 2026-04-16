import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the Countersure team.',
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24">
      <div className="font-mono text-xs uppercase tracking-widest text-stamp-red mb-3">
        § CONTACT
      </div>
      <h1 className="font-sans font-black text-4xl md:text-5xl text-slate-ink tracking-tight mb-4">
        Get in touch.
      </h1>
      <p className="font-body text-slate-mid mb-10">
        Sales, support, partnerships, press — drop us a line and we'll respond within one business day.
      </p>

      <form action="/api/contact" method="POST" className="space-y-6">
        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-slate-mid mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full px-4 py-3 font-body bg-clearance-white border border-slate-ink/20 focus:outline-none focus:border-customs-green"
          />
        </div>
        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-slate-mid mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-3 font-body bg-clearance-white border border-slate-ink/20 focus:outline-none focus:border-customs-green"
          />
        </div>
        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-slate-mid mb-2">
            Company
          </label>
          <input
            type="text"
            name="company"
            className="w-full px-4 py-3 font-body bg-clearance-white border border-slate-ink/20 focus:outline-none focus:border-customs-green"
          />
        </div>
        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-slate-mid mb-2">
            Message
          </label>
          <textarea
            name="message"
            required
            rows={6}
            className="w-full px-4 py-3 font-body bg-clearance-white border border-slate-ink/20 focus:outline-none focus:border-customs-green"
          />
        </div>
        <button
          type="submit"
          className="bg-customs-green text-clearance-white px-8 py-3 font-sans font-bold uppercase tracking-wider text-sm hover:bg-customs-green-deep transition-colors"
        >
          Send →
        </button>
      </form>
    </div>
  );
}
