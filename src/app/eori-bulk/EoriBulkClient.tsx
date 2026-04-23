'use client';

import { useState } from 'react';

type Result = {
  input: string;
  verification_id: string;
  status: 'valid' | 'not_valid' | 'error';
  eori: string;
  name: string;
  address: string;
  checked_at: string;
  message?: string;
};

type Summary = {
  submitted: number;
  valid: number;
  not_valid: number;
  errors: number;
};

export function EoriBulkClient() {
  const [csvText, setCsvText] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Result[] | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [csvOut, setCsvOut] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    setCsvText(text);
  }

  async function submit() {
    if (!csvText.trim()) {
      setError('Paste a CSV or upload a file first.');
      return;
    }
    setLoading(true);
    setError(null);
    setResults(null);
    setSummary(null);
    setCsvOut(null);
    try {
      const res = await fetch('/api/eori/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csv: csvText }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || `Request failed (${res.status})`);
        return;
      }
      setResults(data.results);
      setSummary(data.summary);
      setCsvOut(data.csv);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  function download() {
    if (!csvOut) return;
    const blob = new Blob([csvOut], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `countersure-eori-bulk-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="border border-slate-ink/20 bg-sage-paper">
        <div className="grid md:grid-cols-2 gap-px bg-slate-ink/10">
          <div className="bg-clearance-white p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-stamp-red mb-2">
              § OPTION A — UPLOAD
            </p>
            <label className="block">
              <span className="sr-only">CSV file</span>
              <input
                type="file"
                accept=".csv,text/csv"
                onChange={handleFile}
                className="block w-full text-sm text-slate-ink file:mr-4 file:py-3 file:px-6 file:border-0 file:bg-customs-green file:text-clearance-white file:font-mono file:text-xs file:uppercase file:tracking-wider file:cursor-pointer hover:file:bg-customs-green/90"
              />
            </label>
            <p className="text-xs text-slate-mid mt-2">CSV up to 100 rows.</p>
          </div>
          <div className="bg-clearance-white p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-stamp-red mb-2">
              § OPTION B — PASTE
            </p>
            <textarea
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              placeholder="eori_number&#10;GB123456789000&#10;GB987654321000"
              rows={6}
              className="w-full font-mono text-sm border border-slate-ink/20 p-3 focus:outline-none focus:border-customs-green resize-y"
            />
          </div>
        </div>
        <div className="bg-clearance-white border-t border-slate-ink/10 p-6 flex items-center justify-between">
          <p className="font-mono text-xs text-slate-mid">
            {csvText
              ? `${csvText.split(/\r?\n/).filter((l) => l.trim()).length} lines staged`
              : 'No data yet'}
          </p>
          <button
            onClick={submit}
            disabled={loading || !csvText.trim()}
            className="bg-stamp-red hover:bg-stamp-red/90 disabled:opacity-50 text-clearance-white font-mono text-sm tracking-wider px-8 py-3 transition"
          >
            {loading ? 'Stamping…' : 'STAMP ALL →'}
          </button>
        </div>
      </div>

      {error ? (
        <div className="mt-6 border-l-4 border-stamp-red bg-stamp-red/5 p-4">
          <p className="font-mono text-xs text-stamp-red mb-1">§ ERROR</p>
          <p className="text-slate-ink">{error}</p>
        </div>
      ) : null}

      {summary ? (
        <div className="mt-8">
          <p className="section-rule mb-4">§ RESULTS</p>
          <div className="grid grid-cols-4 gap-px bg-slate-ink/10 border border-slate-ink/10 mb-6">
            <div className="bg-clearance-white p-4 text-center">
              <p className="font-mono text-xs text-slate-mid uppercase">Submitted</p>
              <p className="font-heading text-3xl font-black text-slate-ink">{summary.submitted}</p>
            </div>
            <div className="bg-clearance-white p-4 text-center">
              <p className="font-mono text-xs text-customs-green uppercase">Valid</p>
              <p className="font-heading text-3xl font-black text-customs-green">{summary.valid}</p>
            </div>
            <div className="bg-clearance-white p-4 text-center">
              <p className="font-mono text-xs text-flagged-amber uppercase">Not valid</p>
              <p className="font-heading text-3xl font-black text-flagged-amber">{summary.not_valid}</p>
            </div>
            <div className="bg-clearance-white p-4 text-center">
              <p className="font-mono text-xs text-stamp-red uppercase">Errors</p>
              <p className="font-heading text-3xl font-black text-stamp-red">{summary.errors}</p>
            </div>
          </div>

          {csvOut ? (
            <button
              onClick={download}
              className="bg-customs-green hover:bg-customs-green/90 text-clearance-white font-mono text-sm tracking-wider px-6 py-3 transition mb-6"
            >
              DOWNLOAD STAMPED CSV →
            </button>
          ) : null}

          <div className="border border-slate-ink/10 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-sage-paper">
                <tr>
                  <th className="text-left p-3 font-mono text-xs uppercase">Input</th>
                  <th className="text-left p-3 font-mono text-xs uppercase">Status</th>
                  <th className="text-left p-3 font-mono text-xs uppercase">Name</th>
                  <th className="text-left p-3 font-mono text-xs uppercase">Verification ID</th>
                </tr>
              </thead>
              <tbody>
                {results?.map((r, i) => (
                  <tr key={i} className="border-t border-slate-ink/10">
                    <td className="p-3 font-mono">{r.input}</td>
                    <td className="p-3">
                      <span
                        className={`font-mono text-xs uppercase px-2 py-1 ${
                          r.status === 'valid'
                            ? 'bg-customs-green text-clearance-white'
                            : r.status === 'not_valid'
                              ? 'bg-flagged-amber text-slate-ink'
                              : 'bg-stamp-red text-clearance-white'
                        }`}
                      >
                        {r.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-3 text-slate-ink">{r.name || '—'}</td>
                    <td className="p-3 font-mono text-xs text-slate-mid">{r.verification_id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  );
}
