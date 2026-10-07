/**
 * HMRC Check UK VAT Number API v2.
 *
 * Production: https://api.service.hmrc.gov.uk/organisations/vat/check-vat-number/lookup/{vatNumber}
 * Sandbox:    https://test-api.service.hmrc.gov.uk/organisations/vat/check-vat-number/lookup/{vatNumber}
 *
 * Application-restricted OAuth: client_credentials with scope `read:vat`,
 * or a static server token. Accept must be exactly `application/vnd.hmrc.2.0+json`.
 *
 * A 404 is "not registered" only when the JSON code is NOT_FOUND. Gateway 404s
 * (MATCHING_RESOURCE_NOT_FOUND), 401s, and transport failures are errors.
 *
 * Docs: https://developer.service.hmrc.gov.uk/api-documentation/docs/api/service/vat-registered-companies-api/2.0
 */

const PRODUCTION_BASE = 'https://api.service.hmrc.gov.uk';
const SANDBOX_BASE = 'https://test-api.service.hmrc.gov.uk';
const SANDBOX_HOST = 'test-api.service.hmrc.gov.uk';
const HMRC_ACCEPT = 'application/vnd.hmrc.2.0+json';
const REQUEST_TIMEOUT_MS = 15_000;

let cachedToken: { token: string; expiresAt: number } | null = null;
let sandboxOverrideWarned = false;

export function resetHmrcClientForTests(): void {
  cachedToken = null;
  sandboxOverrideWarned = false;
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
  processedAt: string;
  consultationNumber?: string;
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

export type VatCheckStatusLabel = 'VERIFIED' | 'NOT REGISTERED' | 'ERROR';

export function vatCheckStatusLabel(result: VatLookupResponse): VatCheckStatusLabel {
  if (result.ok) return 'VERIFIED';
  if (result.reason === 'not_found') return 'NOT REGISTERED';
  return 'ERROR';
}

type AccessTokenResult =
  | { ok: true; token: string }
  | { ok: false; status: number; message: string };

function trimBase(value: string | undefined): string | undefined {
  const trimmed = value?.trim().replace(/\/+$/, '');
  return trimmed || undefined;
}

function hostnameOf(url: string): string | null {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

function isProductionDeployment(): boolean {
  if (process.env.CONTEXT === 'production') return true;
  const siteUrl = process.env.URL?.trim();
  if (!siteUrl) return false;
  try {
    return new URL(siteUrl).hostname === 'countersure.com';
  } catch {
    return false;
  }
}

function warnSandboxOverride(message: string): void {
  if (sandboxOverrideWarned) return;
  sandboxOverrideWarned = true;
  console.error(message);
}

/**
 * Base URL for the Check VAT Number API.
 * The sandbox host is ignored unless HMRC_USE_SANDBOX=true, and it is never
 * used for the production site (Netlify CONTEXT=production or URL host
 * countersure.com). A sandbox base URL there is what made real VAT numbers
 * come back as "not registered".
 */
export function resolveHmrcBaseUrl(): string {
  const configured = trimBase(process.env.HMRC_API_BASE);
  const configuredSandbox = trimBase(process.env.HMRC_API_BASE_SANDBOX);
  const sandboxOptIn = process.env.HMRC_USE_SANDBOX === 'true';
  const configuredIsSandbox = configured ? hostnameOf(configured) === SANDBOX_HOST : false;

  if (isProductionDeployment()) {
    if (configured && !configuredIsSandbox) return configured;
    if (configuredIsSandbox || sandboxOptIn) {
      warnSandboxOverride(
        'Refusing the HMRC sandbox on the production site. Using https://api.service.hmrc.gov.uk. Set HMRC_CLIENT_ID and HMRC_CLIENT_SECRET to the production application credentials.'
      );
    }
    return PRODUCTION_BASE;
  }

  if (sandboxOptIn) {
    if (configuredSandbox) return configuredSandbox;
    if (configuredIsSandbox && configured) return configured;
    return SANDBOX_BASE;
  }

  if (configured && !configuredIsSandbox) return configured;
  if (configuredIsSandbox) {
    warnSandboxOverride(
      'HMRC_API_BASE points at the HMRC sandbox without HMRC_USE_SANDBOX=true. Using the production Check VAT Number API instead.'
    );
  }
  return PRODUCTION_BASE;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function errorResult(vatNumber: string, status: number, message: string): VatLookupError {
  return { ok: false, reason: 'error', vatNumber, status, message };
}

const AUTH_FAILED = 'HMRC authentication failed, so this check could not be completed.';
const NOT_CONFIGURED = 'HMRC authentication is not configured, so this check could not be completed.';
const UNREACHABLE = 'HMRC could not be reached, so this check could not be completed.';
const UNEXPECTED = 'HMRC returned an unexpected response, so this check could not be completed.';
const RATE_LIMITED = 'HMRC rate-limited this check, so it could not be completed.';
const UPSTREAM = 'HMRC returned an error, so this check could not be completed.';

async function getAccessToken(options?: { force?: boolean }): Promise<AccessTokenResult> {
  const serverToken = process.env.HMRC_SERVER_TOKEN?.trim();
  if (serverToken) return { ok: true, token: serverToken };

  const clientId = process.env.HMRC_CLIENT_ID?.trim();
  const clientSecret = process.env.HMRC_CLIENT_SECRET?.trim();
  if (!clientId || !clientSecret) {
    console.error(
      'HMRC credentials missing: set HMRC_SERVER_TOKEN, or both HMRC_CLIENT_ID and HMRC_CLIENT_SECRET'
    );
    return { ok: false, status: 503, message: NOT_CONFIGURED };
  }

  if (!options?.force && cachedToken && Date.now() < cachedToken.expiresAt - 60_000) {
    return { ok: true, token: cachedToken.token };
  }

  let res: Response;
  try {
    res = await fetch(`${resolveHmrcBaseUrl()}/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
        scope: 'read:vat',
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (err) {
    console.error('HMRC token request failed:', err instanceof Error ? err.message : err);
    return { ok: false, status: 503, message: UNREACHABLE };
  }

  if (!res.ok) {
    console.error('HMRC token exchange failed with status', res.status);
    return { ok: false, status: 503, message: AUTH_FAILED };
  }

  let data: unknown;
  try {
    data = await res.json();
  } catch {
    console.error('HMRC token response was not JSON');
    return { ok: false, status: 502, message: UNEXPECTED };
  }

  const record = asRecord(data);
  const accessToken = record && typeof record.access_token === 'string' ? record.access_token : '';
  if (!accessToken) {
    console.error('HMRC token response did not include access_token');
    return { ok: false, status: 502, message: AUTH_FAILED };
  }

  const expiresIn =
    record && typeof record.expires_in === 'number' && Number.isFinite(record.expires_in) && record.expires_in > 0
      ? record.expires_in
      : 14_400;
  cachedToken = { token: accessToken, expiresAt: Date.now() + expiresIn * 1000 };
  return { ok: true, token: accessToken };
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

function errorCode(body: unknown): string | null {
  const record = asRecord(body);
  const code = record?.code;
  return typeof code === 'string' ? code : null;
}

function optionalString(record: Record<string, unknown>, key: string): string | undefined {
  const value = record[key];
  return typeof value === 'string' && value.trim() ? value : undefined;
}

function parseRegistered(data: unknown, cleaned: string): VatLookupResponse {
  const body = asRecord(data);
  const target = body ? asRecord(body.target) : null;
  const name = target && typeof target.name === 'string' ? target.name.trim() : '';
  if (!target || !name) {
    return errorResult(cleaned, 502, UNEXPECTED);
  }

  const address = asRecord(target.address) ?? {};
  const consultationNumber = body ? optionalString(body, 'consultationNumber') : undefined;

  return {
    ok: true,
    vatNumber: cleaned,
    name,
    address: {
      line1: optionalString(address, 'line1'),
      line2: optionalString(address, 'line2'),
      line3: optionalString(address, 'line3'),
      line4: optionalString(address, 'line4'),
      postcode: optionalString(address, 'postcode'),
      countryCode: optionalString(address, 'countryCode'),
    },
    processedAt: (body && optionalString(body, 'processingDate')) || new Date().toISOString(),
    consultationNumber,
  };
}

async function interpretLookup(res: Response, cleaned: string): Promise<VatLookupResponse> {
  const bodyText = await res.text();
  let parsed: unknown = null;
  if (bodyText) {
    try {
      parsed = JSON.parse(bodyText);
    } catch {
      parsed = null;
    }
  }

  if (res.status === 404 && errorCode(parsed) === 'NOT_FOUND') {
    return { ok: false, reason: 'not_found', vatNumber: cleaned };
  }

  if (res.ok) return parseRegistered(parsed, cleaned);

  if (res.status === 429) return errorResult(cleaned, 429, RATE_LIMITED);
  if (res.status === 401 || res.status === 403) return errorResult(cleaned, res.status, AUTH_FAILED);
  if (res.status >= 500) return errorResult(cleaned, res.status, UPSTREAM);
  return errorResult(cleaned, res.status || 502, UNEXPECTED);
}

async function fetchLookup(url: string, token: string): Promise<Response> {
  return fetch(url, {
    headers: {
      Accept: HMRC_ACCEPT,
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
}

/**
 * Look up a single VAT number against HMRC.
 */
export async function lookupVatNumber(vatNumber: string): Promise<VatLookupResponse> {
  const cleaned = normaliseVatNumber(vatNumber);

  if (!isValidVatNumberFormat(cleaned)) {
    return errorResult(cleaned, 400, 'Invalid VAT number format. Must be 9 or 12 digits.');
  }

  const url = `${resolveHmrcBaseUrl()}/organisations/vat/check-vat-number/lookup/${encodeURIComponent(cleaned)}`;

  try {
    const firstToken = await getAccessToken();
    if (!firstToken.ok) {
      return errorResult(cleaned, firstToken.status, firstToken.message);
    }

    let res = await fetchLookup(url, firstToken.token);
    if (res.status === 401) {
      cachedToken = null;
      const refreshed = await getAccessToken({ force: true });
      if (!refreshed.ok) {
        return errorResult(cleaned, refreshed.status, refreshed.message);
      }
      if (refreshed.token !== firstToken.token) {
        res = await fetchLookup(url, refreshed.token);
      }
    }

    return await interpretLookup(res, cleaned);
  } catch (err) {
    console.error('HMRC VAT lookup failed:', err instanceof Error ? err.message : err);
    return errorResult(cleaned, 503, UNREACHABLE);
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
