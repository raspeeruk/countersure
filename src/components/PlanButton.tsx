'use client';

import { useState } from 'react';

export function PlanButton({
  plan,
  label,
  variant = 'green',
}: {
  plan: 'cs_pro' | 'cs_team' | 'cs_api';
  label: string;
  variant?: 'green' | 'red';
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function go() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (res.status === 401) {
        // Send through sign-in then back here
        window.location.href = `/signin?callbackUrl=${encodeURIComponent('/pricing')}`;
        return;
      }
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setError(data.error || 'Could not start checkout');
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-auto">
      <button
        onClick={go}
        disabled={loading}
        className={`w-full px-5 py-3 font-sans font-bold uppercase tracking-wider text-sm transition-colors ${
          variant === 'red'
            ? 'bg-stamp-red text-clearance-white hover:bg-stamp-red-deep'
            : 'bg-customs-green text-clearance-white hover:bg-customs-green-deep'
        } disabled:opacity-50`}
      >
        {loading ? 'Opening checkout…' : label}
      </button>
      {error ? (
        <p className="font-mono text-xs text-stamp-red mt-2">{error}</p>
      ) : null}
    </div>
  );
}
