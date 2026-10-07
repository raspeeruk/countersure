import assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, it, mock } from 'node:test';
import {
  lookupVatNumber,
  resetHmrcClientForTests,
  resolveHmrcBaseUrl,
  vatCheckStatusLabel,
  type VatLookupResponse,
} from './hmrc.ts';

const ENV_KEYS = [
  'HMRC_API_BASE',
  'HMRC_API_BASE_SANDBOX',
  'HMRC_USE_SANDBOX',
  'HMRC_CLIENT_ID',
  'HMRC_CLIENT_SECRET',
  'HMRC_SERVER_TOKEN',
  'CONTEXT',
  'URL',
] as const;

const originalEnv = Object.fromEntries(ENV_KEYS.map((key) => [key, process.env[key]]));

type FetchCall = { url: string; init?: RequestInit };

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

function requestUrl(input: string | URL | Request): string {
  if (typeof input === 'string') return input;
  if (input instanceof URL) return input.toString();
  return input.url;
}

function headerValue(init: RequestInit | undefined, name: string): string | null {
  return new Headers(init?.headers).get(name);
}

function installFetch(handler: (call: FetchCall, index: number) => Response | Promise<Response>): FetchCall[] {
  const calls: FetchCall[] = [];
  mock.method(globalThis, 'fetch', async (input: string | URL | Request, init?: RequestInit) => {
    const call = { url: requestUrl(input), init };
    calls.push(call);
    return handler(call, calls.length - 1);
  });
  return calls;
}

const tescoBody = {
  target: {
    name: 'TESCO STORES LIMITED',
    vatNumber: '220430231',
    address: {
      line1: 'TESCO HOUSE',
      line2: 'SHIRE PARK',
      postcode: 'AL7 1GA',
      countryCode: 'GB',
    },
  },
  processingDate: '2026-10-07T12:00:00+00:00',
};

beforeEach(() => {
  for (const key of ENV_KEYS) delete process.env[key];
  resetHmrcClientForTests();
});

afterEach(() => {
  mock.restoreAll();
  for (const key of ENV_KEYS) {
    const value = originalEnv[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  resetHmrcClientForTests();
});

describe('lookupVatNumber', () => {
  it('returns Registered with the trader name and address HMRC provides', async () => {
    process.env.HMRC_SERVER_TOKEN = 'server-token';
    process.env.HMRC_API_BASE = 'http://hmrc.test';
    const calls = installFetch(async () => jsonResponse(200, tescoBody));

    const result = await lookupVatNumber('GB 220 4302 31');

    assert.equal(result.ok, true);
    assert.equal(vatCheckStatusLabel(result), 'VERIFIED');
    if (!result.ok) return;
    assert.equal(result.vatNumber, '220430231');
    assert.equal(result.name, 'TESCO STORES LIMITED');
    assert.equal(result.address.line1, 'TESCO HOUSE');
    assert.equal(result.address.line2, 'SHIRE PARK');
    assert.equal(result.address.postcode, 'AL7 1GA');
    assert.equal(result.address.countryCode, 'GB');
    assert.equal(result.processedAt, '2026-10-07T12:00:00+00:00');
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, 'http://hmrc.test/organisations/vat/check-vat-number/lookup/220430231');
    assert.equal(headerValue(calls[0].init, 'accept'), 'application/vnd.hmrc.2.0+json');
    assert.equal(headerValue(calls[0].init, 'authorization'), 'Bearer server-token');
  });

  it('returns Not registered only for an HMRC NOT_FOUND body', async () => {
    process.env.HMRC_SERVER_TOKEN = 'server-token';
    process.env.HMRC_API_BASE = 'http://hmrc.test';
    installFetch(async () =>
      jsonResponse(404, {
        code: 'NOT_FOUND',
        message: 'targetVrn does not match a registered company',
      })
    );

    const result = await lookupVatNumber('GB000000000');

    assert.equal(result.ok, false);
    assert.equal(vatCheckStatusLabel(result), 'NOT REGISTERED');
    if (result.ok || result.reason !== 'not_found') return;
    assert.equal(result.vatNumber, '000000000');
  });

  it('maps a missing credential configuration to error and does not call HMRC', async () => {
    const calls = installFetch(async () => jsonResponse(404, { code: 'NOT_FOUND' }));

    const result = await lookupVatNumber('GB220430231');

    assert.equal(calls.length, 0);
    assertError(result);
    assert.match(result.message, /not configured/i);
  });

  it('maps a failed client-credentials exchange to error and does not look up the VAT number', async () => {
    process.env.HMRC_CLIENT_ID = 'client-id';
    process.env.HMRC_CLIENT_SECRET = 'client-secret';
    process.env.HMRC_API_BASE = 'http://hmrc.test';
    const calls = installFetch(async (call) => {
      assert.equal(call.url, 'http://hmrc.test/oauth/token');
      assert.match(String(call.init?.body), /scope=read%3Avat/);
      assert.match(String(call.init?.body), /grant_type=client_credentials/);
      return jsonResponse(401, { error: 'invalid_client' });
    });

    const result = await lookupVatNumber('GB220430231');

    assert.equal(calls.length, 1);
    assert.equal(calls.some((call) => call.url.includes('lookup')), false);
    assertError(result);
    assert.match(result.message, /authentication failed/i);
  });

  it('maps lookup 401, 429, 500, and network failures to error', async () => {
    process.env.HMRC_SERVER_TOKEN = 'server-token';
    process.env.HMRC_API_BASE = 'http://hmrc.test';

    const cases: Array<{ status?: number; throwError?: boolean; pattern: RegExp }> = [
      { status: 401, pattern: /authentication failed/i },
      { status: 429, pattern: /rate-limited/i },
      { status: 503, pattern: /returned an error/i },
      { throwError: true, pattern: /could not be reached/i },
    ];

    for (const item of cases) {
      mock.restoreAll();
      resetHmrcClientForTests();
      installFetch(async () => {
        if (item.throwError) throw new TypeError('network down');
        return jsonResponse(item.status ?? 500, { code: 'INTERNAL_SERVER_ERROR', message: 'Unknown error' });
      });
      const result = await lookupVatNumber('GB220430231');
      assertError(result);
      assert.match(result.message, item.pattern);
    }
  });

  it('does not treat a gateway 404 or a malformed 200 as Not registered', async () => {
    process.env.HMRC_SERVER_TOKEN = 'server-token';
    process.env.HMRC_API_BASE = 'http://hmrc.test';

    installFetch(async () =>
      jsonResponse(404, {
        code: 'MATCHING_RESOURCE_NOT_FOUND',
        message: 'A resource with the name in the request can not be found in the API',
      })
    );
    const gateway = await lookupVatNumber('GB220430231');
    assertError(gateway);

    mock.restoreAll();
    installFetch(async () => jsonResponse(200, { unexpected: true }));
    const malformed = await lookupVatNumber('GB220430231');
    assertError(malformed);

    mock.restoreAll();
    installFetch(async () => jsonResponse(404, 'not json'));
    const unparsed = await lookupVatNumber('GB220430231');
    assertError(unparsed);
  });

  it('renews an OAuth token once after a lookup 401 and then returns the trader', async () => {
    process.env.HMRC_CLIENT_ID = 'client-id';
    process.env.HMRC_CLIENT_SECRET = 'client-secret';
    process.env.HMRC_API_BASE = 'http://hmrc.test';
    const tokens = ['expired-token', 'fresh-token'];
    const calls = installFetch(async (call) => {
      if (call.url.endsWith('/oauth/token')) {
        const token = tokens.shift() ?? 'fresh-token';
        return jsonResponse(200, { access_token: token, expires_in: 14_400 });
      }
      const authorization = headerValue(call.init, 'authorization');
      if (authorization === 'Bearer expired-token') {
        return jsonResponse(401, { code: 'INVALID_CREDENTIALS' });
      }
      assert.equal(authorization, 'Bearer fresh-token');
      return jsonResponse(200, tescoBody);
    });

    const result = await lookupVatNumber('GB220430231');

    assert.equal(result.ok, true);
    assert.equal(vatCheckStatusLabel(result), 'VERIFIED');
    if (result.ok) assert.equal(result.name, 'TESCO STORES LIMITED');
    assert.equal(calls.filter((call) => call.url.endsWith('/oauth/token')).length, 2);
    assert.equal(calls.filter((call) => call.url.includes('/lookup/')).length, 2);
  });

  it('calls the production API when HMRC_API_BASE is the sandbox host', async () => {
    process.env.HMRC_SERVER_TOKEN = 'server-token';
    process.env.HMRC_API_BASE = 'https://test-api.service.hmrc.gov.uk';
    const calls = installFetch(async () => jsonResponse(200, tescoBody));

    const result = await lookupVatNumber('GB220430231');

    assert.equal(result.ok, true);
    assert.equal(
      calls[0].url,
      'https://api.service.hmrc.gov.uk/organisations/vat/check-vat-number/lookup/220430231'
    );
  });

  it('keeps the production site off the sandbox even if sandbox mode is set', () => {
    process.env.CONTEXT = 'production';
    process.env.HMRC_USE_SANDBOX = 'true';
    process.env.HMRC_API_BASE = 'https://test-api.service.hmrc.gov.uk';
    assert.equal(resolveHmrcBaseUrl(), 'https://api.service.hmrc.gov.uk');

    delete process.env.CONTEXT;
    process.env.URL = 'https://countersure.com';
    assert.equal(resolveHmrcBaseUrl(), 'https://api.service.hmrc.gov.uk');
  });

  it('uses the sandbox only when explicitly requested outside production', () => {
    process.env.HMRC_USE_SANDBOX = 'true';
    assert.equal(resolveHmrcBaseUrl(), 'https://test-api.service.hmrc.gov.uk');

    process.env.HMRC_API_BASE_SANDBOX = 'http://sandbox.test';
    assert.equal(resolveHmrcBaseUrl(), 'http://sandbox.test');
  });
});

function assertError(result: VatLookupResponse): asserts result is Extract<VatLookupResponse, { reason: 'error' }> {
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.reason, 'error');
  assert.equal(vatCheckStatusLabel(result), 'ERROR');
  assert.notEqual(vatCheckStatusLabel(result), 'NOT REGISTERED');
}
