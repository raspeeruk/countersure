import type { Metadata } from 'next';
import Link from 'next/link';
import { Stamp } from '@/components/Stamp';
import { SearchBar } from '@/components/SearchBar';
import {
  lookupEoriNumber,
  normaliseEoriNumber,
} from '@/lib/eori';
import { generateVerificationId } from '@/lib/hmrc';

// Render on demand, cache for 24h
export const revalidate = 86400;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ eoriNumber: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { eoriNumber } = await params;
  const normalised = normaliseEoriNumber(eoriNumber);
  return {
    title: `EORI ${normalised} — Verification Check`,
    description: `HMRC verification result for UK EORI number ${normalised}. Live check against the production customs register.`,
  };
}

export default async function EoriCheckPage({ params }: PageProps) {
  const { eoriNumber } = await params;
  const result = await lookupEoriNumber(eoriNumber);
  const verificationId = generateVerificationId();
  const checkedAt = new Date().toISOString().slice(0, 10);

  const isValid = result.ok && result.valid;

  return (
    <div className="bg-clearance-white">
      {/* Result band */}
      <section className="bg-customs-green text-clearance-white grain">
        <div className="max-w-[1280px] mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7">
            <div className="font-mono text-xs uppercase tracking-widest text-stamp-red mb-4">
              § EORI VERIFICATION RESULT
            </div>
            <div className="font-mono text-clearance-white/70 mb-2">
              {result.ok ? result.eori : result.eori}
            </div>
            {result.ok ? (
              result.valid ? (
                <>
                  <h1 className="font-sans font-black text-4xl md:text-6xl tracking-tight leading-tight mb-6">
                    {result.companyName || 'Valid EORI'}
                  </h1>
                  {result.address && (
                    <div className="font-body text-clearance-white/85">
                      {result.address}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <h1 className="font-sans font-black text-4xl md:text-6xl tracking-tight leading-tight mb-6">
                    Not valid.
                  </h1>
                  <p className="font-body text-clearance-white/85 max-w-xl">
                    HMRC reports this EORI number as not valid. It may have been revoked,
                    never issued, or entered incorrectly.
                  </p>
                </>
              )
            ) : (
              <>
                <h1 className="font-sans font-black text-4xl md:text-6xl tracking-tight leading-tight mb-6">
                  Check failed.
                </h1>
                <p className="font-body text-clearance-white/85 max-w-xl">
                  {result.message}
                </p>
              </>
            )}
          </div>

          <div className="lg:col-span-5 flex justify-center">
            {isValid ? (
              <Stamp
                countryCode="EORI"
                number={result.eori}
                date={checkedAt}
                size={240}
                animate
              />
            ) : (
              <div className="font-mono text-clearance-white/40 text-sm">
                NO STAMP ISSUED
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Audit trail / metadata */}
      <section className="bg-clearance-white border-b border-slate-ink/10">
        <div className="max-w-[1280px] mx-auto px-6 py-12">
          <div className="font-mono text-xs uppercase tracking-widest text-stamp-red mb-6">
            § AUDIT TRAIL
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-slate-ink/10">
            <Cell label="Verification ID" value={verificationId} mono />
            <Cell label="Source" value="HMRC EORI Checker API v1" />
            <Cell label="Checked at" value={new Date().toUTCString()} mono />
            <Cell
              label="Status"
              value={
                !result.ok
                  ? 'ERROR'
                  : result.valid
                    ? 'VALID'
                    : 'NOT VALID'
              }
              status={isValid ? 'verified' : 'rejected'}
            />
          </div>
        </div>
      </section>

      {/* Upgrade strip */}
      <section className="bg-sage-paper py-16">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            <div className="font-mono text-xs uppercase tracking-widest text-stamp-red mb-3">
              § UPGRADE
            </div>
            <h2 className="font-sans font-black text-3xl md:text-4xl text-slate-ink tracking-tight mb-4">
              Need this as a PDF? Need 1,000 of them?
            </h2>
            <p className="font-body text-slate-mid max-w-xl">
              Pro plans unlock branded audit PDFs, bulk CSV verification, watchlists with change alerts,
              and API access. From £19/month.
            </p>
          </div>
          <div className="md:col-span-5 flex md:justify-end flex-wrap gap-4">
            {isValid ? (
              <a
                href={`/api/eori/${result.eori}/pdf`}
                className="bg-stamp-red text-clearance-white px-6 py-3 font-sans font-bold uppercase tracking-wider text-sm hover:bg-stamp-red/90"
              >
                Download stamped PDF →
              </a>
            ) : (
              <Link
                href="/pricing"
                className="bg-customs-green text-clearance-white px-6 py-3 font-sans font-bold uppercase tracking-wider text-sm hover:bg-customs-green-deep"
              >
                See plans
              </Link>
            )}
            <Link
              href="/eori-check"
              className="border border-slate-ink/20 text-slate-ink px-6 py-3 font-sans font-bold uppercase tracking-wider text-sm hover:bg-clearance-white"
            >
              Run another →
            </Link>
          </div>
        </div>
      </section>

      {/* Repeat search */}
      <section className="bg-clearance-white py-16">
        <div className="max-w-[1280px] mx-auto px-6 flex justify-center">
          <SearchBar
            placeholder="GB123456789000"
            action="/eori"
            label="EORI №"
          />
        </div>
      </section>
    </div>
  );
}

function Cell({
  label,
  value,
  mono,
  status,
}: {
  label: string;
  value: string;
  mono?: boolean;
  status?: 'verified' | 'rejected' | 'flagged';
}) {
  const statusClass =
    status === 'verified'
      ? 'status-verified'
      : status === 'rejected'
      ? 'status-rejected'
      : status === 'flagged'
      ? 'status-flagged'
      : '';

  return (
    <div className={`bg-clearance-white p-5 ${statusClass}`}>
      <div className="font-mono text-xs uppercase tracking-widest text-slate-mid mb-2">
        {label}
      </div>
      <div className={`${mono ? 'font-mono' : 'font-sans font-bold'} text-slate-ink text-sm break-words`}>
        {value}
      </div>
    </div>
  );
}
