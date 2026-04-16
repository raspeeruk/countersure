import { NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { lookupVatNumber, generateVerificationId } from '@/lib/hmrc';
import { VerificationPdf, type StampDoc } from '@/lib/pdf';

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ vatNumber: string }> }
) {
  const { vatNumber } = await params;
  const r = await lookupVatNumber(vatNumber);
  const verificationId = generateVerificationId();
  const checkedAt = new Date().toISOString();

  const doc: StampDoc = r.ok
    ? {
        verificationId,
        vatNumber: r.vatNumber,
        countryCode: 'GB',
        status: 'verified',
        name: r.name,
        address: r.address,
        checkedAt: r.processedAt || checkedAt,
        source: 'HMRC live API',
        consultationNumber: r.consultationNumber,
      }
    : {
        verificationId,
        vatNumber: r.vatNumber,
        countryCode: 'GB',
        status: r.reason === 'not_found' ? 'not_found' : 'error',
        checkedAt,
        source: 'HMRC live API',
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
