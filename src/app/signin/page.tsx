import type { Metadata } from 'next';
import { signIn, auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Sign in to Countersure',
  description: 'Sign in with a magic link emailed straight to you.',
  alternates: { canonical: '/signin' },
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ check?: string; callbackUrl?: string }>;
}) {
  const params = await searchParams;
  const session = await auth();
  if (session?.user) redirect('/dashboard');
  const showCheck = params.check === 'email';

  return (
    <article className="bg-clearance-white">
      <section className="bg-customs-green text-clearance-white grain border-b-4 border-stamp-red">
        <div className="max-w-2xl mx-auto px-6 py-20">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-clearance-white/60 mb-4">
            § SIGN IN
          </p>
          <h1 className="font-heading font-black text-5xl md:text-6xl leading-[0.95] tracking-tight">
            Stamp your supplier.
          </h1>
        </div>
      </section>

      <section className="max-w-md mx-auto px-6 py-16">
        {showCheck ? (
          <div className="bg-sage-paper border-l-4 border-customs-green p-6 mb-8">
            <p className="font-mono text-xs uppercase tracking-widest text-customs-green mb-2">
              § CHECK YOUR EMAIL
            </p>
            <p className="text-slate-ink">
              We just sent you a magic link. Open it on the same device to sign in.
            </p>
          </div>
        ) : null}

        <form
          action={async (formData) => {
            'use server';
            const email = String(formData.get('email') || '').trim();
            if (!email) return;
            await signIn('resend', {
              email,
              redirectTo: '/dashboard',
            });
          }}
          className="space-y-4"
        >
          <label className="block font-mono text-xs uppercase tracking-widest text-slate-mid">
            Email
            <input
              type="email"
              name="email"
              required
              placeholder="you@firm.co.uk"
              className="mt-2 w-full px-4 py-3 font-mono text-base bg-clearance-white border border-slate-ink/20 focus:outline-none focus:border-customs-green text-slate-ink"
            />
          </label>
          <button
            type="submit"
            className="w-full bg-stamp-red hover:bg-stamp-red/90 text-clearance-white font-mono text-sm tracking-wider py-4 transition"
          >
            EMAIL ME A SIGN-IN LINK →
          </button>
        </form>

        <p className="text-xs text-slate-mid mt-8 leading-relaxed">
          We use one-tap email links instead of passwords. Your link is good for 24 hours.
        </p>
      </section>
    </article>
  );
}
