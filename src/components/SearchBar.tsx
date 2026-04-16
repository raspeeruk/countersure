'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function SearchBar({
  placeholder = 'GB123456789',
  variant: _variant = 'default',
}: {
  placeholder?: string;
  variant?: 'default' | 'hero';
}) {
  const [value, setValue] = useState('');
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleaned = value.replace(/\s+/g, '').toUpperCase();
    if (!cleaned) return;
    // Strip GB prefix if present for the URL
    const num = cleaned.startsWith('GB') ? cleaned.slice(2) : cleaned;
    router.push(`/check/${num}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-2xl">
      <div className="flex items-center bg-customs-green-deep px-4 font-mono text-clearance-white text-sm">
        VAT №
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-5 py-4 font-mono text-lg bg-clearance-white text-slate-ink placeholder:text-slate-mid/50 focus:outline-none focus:ring-2 focus:ring-stamp-red"
        autoComplete="off"
        spellCheck={false}
      />
      <button
        type="submit"
        className="bg-stamp-red text-clearance-white px-8 font-sans font-bold uppercase tracking-wider text-sm hover:bg-stamp-red-deep transition-colors"
      >
        Clear →
      </button>
    </form>
  );
}
