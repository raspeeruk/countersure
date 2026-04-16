import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { SearchBar } from '@/components/SearchBar';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Run checks, manage your plan, see your usage.',
  alternates: { canonical: '/dashboard' },
};

export const dynamic = 'force-dynamic';

const PLAN_LABELS: Record<string, string> = {
  free: 'Free',
  cs_pro: 'Pro · £19/mo',
  cs_team: 'Team · £49/mo',
  cs_api: 'API · £199/mo',
};

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ welcome?: string }>;
}) {
  const params = await searchParams;
  const session = await auth();
  if (!session?.user) redirect('/signin');

  const plan = (session.user as { plan?: string }).plan ?? 'free';
  const planLabel = PLAN_LABELS[plan] ?? 'Free';

  return (
    <article className="bg-clearance-white">
      <section className="bg-customs-green text-clearance-white grain border-b-4 border-stamp-red">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-clearance-white/60 mb-4">
            § DASHBOARD
          </p>
          <h1 className="font-heading font-black text-4xl md:text-5xl leading-[0.95] tracking-tight mb-4">
            Welcome, {session.user.email}.
          </h1>
          <p className="text-clearance-white/80 font-mono text-sm">
            Plan: <span className="text-stamp-red">{planLabel}</span>
          </p>
        </div>
      </section>

      {params.welcome === '1' ? (
        <section className="bg-sage-paper border-b border-slate-ink/10">
          <div className="max-w-5xl mx-auto px-6 py-6">
            <p className="font-mono text-xs uppercase tracking-widest text-customs-green mb-1">
              § SUBSCRIPTION ACTIVE
            </p>
            <p className="text-slate-ink">
              You are now on the {planLabel} plan. Run a check below.
            </p>
          </div>
        </section>
      ) : null}

      <section className="max-w-5xl mx-auto px-6 py-12">
        <p className="section-rule mb-6">§ RUN A CHECK</p>
        <SearchBar />
      </section>

      <section className="bg-sage-paper border-y border-slate-ink/10">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <p className="section-rule mb-6">§ MANAGE</p>
          <div className="grid md:grid-cols-3 gap-px bg-slate-ink/10 border border-slate-ink/10">
            <Link href="/pricing" className="bg-clearance-white p-6 hover:bg-sage-paper transition">
              <p className="font-mono text-xs text-stamp-red mb-2">§ UPGRADE</p>
              <p className="font-heading text-xl font-bold text-slate-ink">Change plan</p>
              <p className="text-sm text-slate-mid mt-1">Go from Free to Pro, Team, or API.</p>
            </Link>
            <Link href="/api-docs" className="bg-clearance-white p-6 hover:bg-sage-paper transition">
              <p className="font-mono text-xs text-stamp-red mb-2">§ API</p>
              <p className="font-heading text-xl font-bold text-slate-ink">API keys & docs</p>
              <p className="text-sm text-slate-mid mt-1">Read the spec. Request keys.</p>
            </Link>
            <Link href="/contact" className="bg-clearance-white p-6 hover:bg-sage-paper transition">
              <p className="font-mono text-xs text-stamp-red mb-2">§ HELP</p>
              <p className="font-heading text-xl font-bold text-slate-ink">Talk to us</p>
              <p className="text-sm text-slate-mid mt-1">Anything missing? Tell us.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12">
        <form
          action={async () => {
            'use server';
            const { signOut } = await import('@/lib/auth');
            await signOut({ redirectTo: '/' });
          }}
        >
          <button
            type="submit"
            className="font-mono text-xs uppercase tracking-widest text-slate-mid hover:text-stamp-red transition"
          >
            ← Sign out
          </button>
        </form>
      </section>
    </article>
  );
}
