import { NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { lookupEoriNumber } from '@/lib/eori';
import { generateVerificationId } from '@/lib/hmrc';
import { VerificationPdf, type StampDoc } from '@/lib/pdf';

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ eoriNumber: string }> }
) {
  const { eoriNumber } = await params;
  const r = await lookupEoriNumber(eoriNumber);
  const verificationId = generateVerificationId();
  const checkedAt = new Date().toISOString();

  const isValid = r.ok && r.valid;

  const doc: StampDoc = r.ok
    ? {
        verificationId,
        vatNumber: r.eori,
        countryCode: 'GB',
        type: 'eori',
        status: r.valid ? 'verified' : 'not_found',
        name: r.companyName,
        address: r.address
          ? { line1: r.address }
          : undefined,
        checkedAt: r.processingDate || checkedAt,
        source: 'HMRC EORI Checker API v1',
      }
    : {
        verificationId,
        vatNumber: r.eori,
        countryCode: 'GB',
        type: 'eori',
        status: 'error',
        checkedAt,
        source: 'HMRC EORI Checker API v1',
      };

  const buffer = await renderToBuffer(<VerificationPdf doc={doc} />);
  const body = new Uint8Array(buffer);

  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${verificationId}.pdf"`,
      'Cache-Control': 'no-store',
    },
  });
}
