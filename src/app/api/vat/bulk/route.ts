import { NextResponse } from 'next/server';
import { lookupVatNumber, generateVerificationId } from '@/lib/hmrc';

export const runtime = 'nodejs';
export const maxDuration = 60;

const MAX_ROWS = 100;

function parseCsv(text: string): string[] {
  // Permissive single-column CSV. Splits on newlines/commas, trims, drops headers/blanks.
  const rows = text
    .split(/\r?\n/)
    .flatMap((row) => row.split(','))
    .map((s) => s.trim())
    .filter(Boolean);

  // Drop a leading "vat", "vat_number", "vatnumber" header if present
  if (rows.length > 0 && /^(vat[_ ]?number|vat|number)$/i.test(rows[0])) {
    rows.shift();
  }
  return rows;
}

function escapeCsvField(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function POST(req: Request) {
  let body: { csv?: string; vatNumbers?: string[] };
  const ct = req.headers.get('content-type') || '';
  try {
    if (ct.includes('multipart/form-data')) {
      const fd = await req.formData();
      const file = fd.get('file');
      if (file && typeof file !== 'string') {
        body = { csv: await (file as File).text() };
      } else {
        body = { csv: String(fd.get('csv') || '') };
      }
    } else {
      body = await req.json();
    }
  } catch {
    return NextResponse.json({ error: 'Could not parse body' }, { status: 400 });
  }

  let numbers: string[] = [];
  if (Array.isArray(body.vatNumbers)) numbers = body.vatNumbers;
  else if (body.csv) numbers = parseCsv(body.csv);

  if (numbers.length === 0) {
    return NextResponse.json({ error: 'No VAT numbers supplied' }, { status: 400 });
  }
  if (numbers.length > MAX_ROWS) {
    return NextResponse.json(
      { error: `Bulk limit is ${MAX_ROWS} rows per request. Use the API for larger jobs.` },
      { status: 413 }
    );
  }

  const checkedAt = new Date().toISOString();
  const results = await Promise.all(
    numbers.map(async (raw) => {
      const r = await lookupVatNumber(raw);
      const verificationId = generateVerificationId();
      if (r.ok) {
        return {
          input: raw,
          verification_id: verificationId,
          status: 'verified' as const,
          vat_number: r.vatNumber,
          name: r.name,
          address: [
            r.address.line1,
            r.address.line2,
            r.address.line3,
            r.address.line4,
            r.address.postcode,
          ]
            .filter(Boolean)
            .join(', '),
          checked_at: r.processedAt,
        };
      }
      return {
        input: raw,
        verification_id: verificationId,
        status: r.reason === 'not_found' ? ('not_found' as const) : ('error' as const),
        vat_number: r.vatNumber,
        name: '',
        address: '',
        checked_at: checkedAt,
        message: r.reason === 'error' ? r.message : 'Not found on HMRC register',
      };
    })
  );

  // Build CSV output
  const header = ['input', 'verification_id', 'status', 'vat_number', 'name', 'address', 'checked_at', 'message'];
  const lines = [header.join(',')];
  for (const r of results) {
    lines.push(
      [
        r.input,
        r.verification_id,
        r.status,
        r.vat_number,
        r.name ?? '',
        r.address ?? '',
        r.checked_at,
        'message' in r ? r.message ?? '' : '',
      ]
        .map((v) => escapeCsvField(String(v)))
        .join(',')
    );
  }
  const csvOut = lines.join('\n');

  return NextResponse.json({
    summary: {
      submitted: numbers.length,
      verified: results.filter((r) => r.status === 'verified').length,
      not_found: results.filter((r) => r.status === 'not_found').length,
      errors: results.filter((r) => r.status === 'error').length,
    },
    results,
    csv: csvOut,
  });
}
