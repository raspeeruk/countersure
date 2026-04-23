/**
 * HMRC EORI Checker API — open access, no auth required.
 *
 * Endpoint:
 *   https://api.service.hmrc.gov.uk/customs/eori/lookup/check-multiple-eori
 *
 * POST body: { "eoris": ["GB123456789000"] }
 * Accept: application/vnd.hmrc.1.0+json
 *
 * Docs: https://developer.service.hmrc.gov.uk/api-documentation/docs/api/service/eori-checker-api
 */

const API_URL =
  'https://api.service.hmrc.gov.uk/customs/eori/lookup/check-multiple-eori';

export interface EoriLookupResult {
  ok: true;
  eori: string;
  valid: boolean;
  companyName?: string;
  address?: string;
  processingDate: string;
}

export interface EoriLookupError {
  ok: false;
  eori: string;
  message: string;
}

export type EoriLookupResponse = EoriLookupResult | EoriLookupError;

/**
 * Normalise an EORI number input.
 * Accepts: "GB 123 456 789 000", "gb123456789000", "123456789000".
 * Returns uppercase with GB prefix (HMRC expects GB prefix for UK EORIs).
 */
export function normaliseEoriNumber(input: string): string {
  const stripped = input.toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (stripped.startsWith('GB')) return stripped;
  return `GB${stripped}`;
}

/**
 * Validate EORI format: GB + 12 digits, or GB + 9 digits (+ implied 000 suffix).
 */
export function isValidEoriFormat(eori: string): boolean {
  const n = normaliseEoriNumber(eori);
  // GB + 12 digits or GB + 9 digits
  return /^GB\d{12}$/.test(n) || /^GB\d{9}$/.test(n);
}

/**
 * Look up a single EORI number against the HMRC EORI Checker API.
 */
export async function lookupEoriNumber(
  eoriNumber: string
): Promise<EoriLookupResponse> {
  const normalised = normaliseEoriNumber(eoriNumber);

  if (!isValidEoriFormat(normalised)) {
    return {
      ok: false,
      eori: normalised,
      message:
        'Invalid EORI format. UK EORI numbers are GB followed by 9 or 12 digits.',
    };
  }

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.hmrc.1.0+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ eoris: [normalised] }),
      cache: 'no-store',
    });

    if (!res.ok) {
      const body = await res.text();
      return {
        ok: false,
        eori: normalised,
        message: `HMRC API returned ${res.status}: ${body.slice(0, 200)}`,
      };
    }

    const data = await res.json();

    // Response is an array of results
    const result = Array.isArray(data) ? data[0] : data;

    if (!result) {
      return {
        ok: false,
        eori: normalised,
        message: 'No result returned from HMRC',
      };
    }

    return {
      ok: true,
      eori: result.eori ?? normalised,
      valid: result.valid ?? false,
      companyName: result.traderName ?? undefined,
      address: result.address ?? undefined,
      processingDate:
        result.processingDate ?? new Date().toISOString().slice(0, 10),
    };
  } catch (err) {
    return {
      ok: false,
      eori: normalised,
      message: (err as Error).message,
    };
  }
}

/**
 * Look up multiple EORI numbers in one request (API supports up to ~10 per call).
 */
export async function lookupEoriNumbers(
  eoris: string[]
): Promise<EoriLookupResponse[]> {
  const normalised = eoris.map(normaliseEoriNumber);
  const invalid = normalised.filter((e) => !isValidEoriFormat(e));

  if (invalid.length > 0) {
    // Return individual results, marking invalid ones
    return normalised.map((e) =>
      isValidEoriFormat(e)
        ? // Will be resolved below
          ({ ok: false, eori: e, message: 'pending' } as EoriLookupError)
        : {
            ok: false,
            eori: e,
            message:
              'Invalid EORI format. UK EORI numbers are GB followed by 9 or 12 digits.',
          }
    );
  }

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.hmrc.1.0+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ eoris: normalised }),
      cache: 'no-store',
    });

    if (!res.ok) {
      const body = await res.text();
      return normalised.map((e) => ({
        ok: false as const,
        eori: e,
        message: `HMRC API returned ${res.status}: ${body.slice(0, 200)}`,
      }));
    }

    const data = await res.json();
    const rawResults: Array<{
      eori?: string;
      valid?: boolean;
      traderName?: string;
      address?: string;
      processingDate?: string;
    }> = Array.isArray(data) ? data : [data];

    // Map back to normalised order
    return normalised.map((eori) => {
      const match = rawResults.find(
        (r) => r.eori?.toUpperCase() === eori
      );
      if (!match) {
        return { ok: false as const, eori, message: 'No result from HMRC' };
      }
      return {
        ok: true as const,
        eori: match.eori ?? eori,
        valid: match.valid ?? false,
        companyName: match.traderName ?? undefined,
        address: match.address ?? undefined,
        processingDate:
          match.processingDate ?? new Date().toISOString().slice(0, 10),
      };
    });
  } catch (err) {
    return normalised.map((e) => ({
      ok: false as const,
      eori: e,
      message: (err as Error).message,
    }));
  }
}
