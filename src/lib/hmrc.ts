/**
 * HMRC Check UK VAT Number API v2.
 *
 * Endpoint:
 *   Production: https://api.service.hmrc.gov.uk/organisations/vat/check-vat-number/lookup/{vatNumber}
 *   Sandbox:    https://test-api.service.hmrc.gov.uk/organisations/vat/check-vat-number/lookup/{vatNumber}
 *
 * This API does not require user OAuth — server-to-server with an HMRC application's
 * server token. The token is passed as `Authorization: Bearer <token>` and Accept must
 * be `application/vnd.hmrc.2.0+json`.
 *
 * Docs: https://developer.service.hmrc.gov.uk/api-documentation/docs/api/service/vat-registered-companies-api
 */

const PRODUCTION_BASE = 'https://api.service.hmrc.gov.uk';
const SANDBOX_BASE = 'https://test-api.service.hmrc.gov.uk';

// In-memory token cache (serverless: one per cold start, fine for short-lived functions)
let cachedToken: { token: string; expiresAt: number } | null = null;

/**
 * Get a Bearer token via OAuth client_credentials grant.
 * HMRC issues tokens valid for ~4 hours.
 */
async function getAccessToken(): Promise<string | null> {
  // Prefer a static server token if provided
  const serverToken = process.env.HMRC_SERVER_TOKEN;
  if (serverToken) return serverToken;

  const clientId = process.env.HMRC_CLIENT_ID;
  const clientSecret = process.env.HMRC_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;

  // Return cached token if still valid (with 60s buffer)
  if (cachedToken && Date.now() < cachedToken.expiresAt - 60_000) {
    return cachedToken.token;
  }

  const base = getBase();
  const res = await fetch(`${base}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  if (!res.ok) {
    console.error('HMRC token exchange failed:', res.status, await res.text());
    return null;
  }

  const data = await res.json();
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in ?? 14400) * 1000,
  };
  return cachedToken.token;
}

export interface VatLookupAddress {
  line1?: string;
  line2?: string;
  line3?: string;
  line4?: string;
  postcode?: string;
  countryCode?: string;
}

export interface VatLookupResult {
  ok: true;
  vatNumber: string;
  name: string;
  address: VatLookupAddress;
  processedAt: string; // ISO timestamp from HMRC
  consultationNumber?: string; // For audit trail
}

export interface VatLookupNotFound {
  ok: false;
  reason: 'not_found';
  vatNumber: string;
}

export interface VatLookupError {
  ok: false;
  reason: 'error';
  vatNumber: string;
  status: number;
  message: string;
}

export type VatLookupResponse = VatLookupResult | VatLookupNotFound | VatLookupError;

function getBase(): string {
  return process.env.HMRC_API_BASE
    ?? (process.env.HMRC_USE_SANDBOX === 'true' ? SANDBOX_BASE : PRODUCTION_BASE);
}

/**
 * Normalise a VAT number for HMRC lookup.
 * Accepts: "GB 123 4567 89", "gb123456789", "123456789", "GB123456789012" (branch).
 * Returns the digits only (HMRC's API takes the 9- or 12-digit number without country prefix).
 */
export function normaliseVatNumber(input: string): string {
  return input.toUpperCase().replace(/^GB/, '').replace(/[^0-9]/g, '');
}

/**
 * Validate length: standard 9 digits, or 12 digits with branch suffix.
 */
export function isValidVatNumberFormat(vat: string): boolean {
  const n = normaliseVatNumber(vat);
  return n.length === 9 || n.length === 12;
}

/**
 * Look up a single VAT number against HMRC.
 */
export async function lookupVatNumber(vatNumber: string): Promise<VatLookupResponse> {
  const cleaned = normaliseVatNumber(vatNumber);

  if (!isValidVatNumberFormat(cleaned)) {
    return {
      ok: false,
      reason: 'error',
      vatNumber: cleaned,
      status: 400,
      message: 'Invalid VAT number format. Must be 9 or 12 digits.',
    };
  }

  const url = `${getBase()}/organisations/vat/check-vat-number/lookup/${cleaned}`;
  const headers: HeadersInit = {
    Accept: 'application/vnd.hmrc.2.0+json',
  };
  const token = await getAccessToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(url, { headers, cache: 'no-store' });

    if (res.status === 404) {
      return { ok: false, reason: 'not_found', vatNumber: cleaned };
    }

    if (!res.ok) {
      const body = await res.text();
      return {
        ok: false,
        reason: 'error',
        vatNumber: cleaned,
        status: res.status,
        message: `HMRC API returned ${res.status}: ${body.slice(0, 200)}`,
      };
    }

    const data = await res.json();
    const target = data.target ?? data;

    return {
      ok: true,
      vatNumber: cleaned,
      name: target.name ?? 'Unknown',
      address: {
        line1: target.address?.line1,
        line2: target.address?.line2,
        line3: target.address?.line3,
        line4: target.address?.line4,
        postcode: target.address?.postcode,
        countryCode: target.address?.countryCode,
      },
      processedAt: data.processingDate ?? new Date().toISOString(),
      consultationNumber: data.consultationNumber,
    };
  } catch (err) {
    return {
      ok: false,
      reason: 'error',
      vatNumber: cleaned,
      status: 500,
      message: (err as Error).message,
    };
  }
}

/**
 * Generate a Countersure verification ID for a check.
 * Format: CS-YYYYMMDD-XXXXXXXX (date + random suffix)
 */
export function generateVerificationId(): string {
  const d = new Date();
  const date = `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, '0')}${String(d.getUTCDate()).padStart(2, '0')}`;
  const suffix = Math.random().toString(36).slice(2, 10).toUpperCase();
  return `CS-${date}-${suffix}`;
}
