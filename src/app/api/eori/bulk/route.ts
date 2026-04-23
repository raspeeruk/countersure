import { NextResponse } from 'next/server';
import { lookupEoriNumbers, normaliseEoriNumber, isValidEoriFormat } from '@/lib/eori';
import { generateVerificationId } from '@/lib/hmrc';

export const runtime = 'nodejs';
export const maxDuration = 60;

const MAX_ROWS = 100;
const BATCH_SIZE = 10; // HMRC EORI API accepts up to ~10 per request

function parseCsv(text: string): string[] {
  const rows = text
    .split(/\r?\n/)
    .flatMap((row) => row.split(','))
    .map((s) => s.trim())
    .filter(Boolean);

  // Drop a leading header if present
  if (rows.length > 0 && /^(eori[_ ]?number|eori|number)$/i.test(rows[0])) {
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
  let body: { csv?: string; eoris?: string[] };
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
  if (Array.isArray(body.eoris)) numbers = body.eoris;
  else if (body.csv) numbers = parseCsv(body.csv);

  if (numbers.length === 0) {
    return NextResponse.json({ error: 'No EORI numbers supplied' }, { status: 400 });
  }
  if (numbers.length > MAX_ROWS) {
    return NextResponse.json(
      { error: `Bulk limit is ${MAX_ROWS} rows per request.` },
      { status: 413 }
    );
  }

  const checkedAt = new Date().toISOString();

  // Batch in groups of BATCH_SIZE for efficiency
  const normalised = numbers.map(normaliseEoriNumber);
  const allResults: {
    input: string;
    verification_id: string;
    status: 'valid' | 'not_valid' | 'error';
    eori: string;
    name: string;
    address: string;
    checked_at: string;
    message?: string;
  }[] = [];

  for (let i = 0; i < normalised.length; i += BATCH_SIZE) {
    const batch = normalised.slice(i, i + BATCH_SIZE);
    const batchInputs = numbers.slice(i, i + BATCH_SIZE);
    const results = await lookupEoriNumbers(batch);

    for (let j = 0; j < results.length; j++) {
      const r = results[j];
      const verificationId = generateVerificationId();

      if (r.ok) {
        allResults.push({
          input: batchInputs[j],
          verification_id: verificationId,
          status: r.valid ? 'valid' : 'not_valid',
          eori: r.eori,
          name: r.companyName || '',
          address: r.address || '',
          checked_at: r.processingDate || checkedAt,
        });
      } else {
        allResults.push({
          input: batchInputs[j],
          verification_id: verificationId,
          status: 'error',
          eori: r.eori,
          name: '',
          address: '',
          checked_at: checkedAt,
          message: r.message,
        });
      }
    }
  }

  // Build CSV output
  const header = ['input', 'verification_id', 'status', 'eori', 'name', 'address', 'checked_at', 'message'];
  const lines = [header.join(',')];
  for (const r of allResults) {
    lines.push(
      [
        r.input,
        r.verification_id,
        r.status,
        r.eori,
        r.name,
        r.address,
        r.checked_at,
        r.message ?? '',
      ]
        .map((v) => escapeCsvField(String(v)))
        .join(',')
    );
  }
  const csvOut = lines.join('\n');

  return NextResponse.json({
    summary: {
      submitted: numbers.length,
      valid: allResults.filter((r) => r.status === 'valid').length,
      not_valid: allResults.filter((r) => r.status === 'not_valid').length,
      errors: allResults.filter((r) => r.status === 'error').length,
    },
    results: allResults,
    csv: csvOut,
  });
}
