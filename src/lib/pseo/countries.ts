// Country VAT format pSEO — /vat-number-format/[country]
export type CountryFormat = {
  slug: string;
  country: string;
  countryCode: string; // ISO 3166-1 alpha-2
  vatPrefix: string; // e.g. "GB"
  pattern: string; // human description
  regex: string; // regex pattern as string
  examples: string[]; // valid examples (synthetic)
  notes: string[];
  validatorSource: 'HMRC' | 'VIES';
};

export const countries: CountryFormat[] = [
  {
    slug: 'united-kingdom',
    country: 'United Kingdom',
    countryCode: 'GB',
    vatPrefix: 'GB',
    pattern: '9-digit standard, 12-digit branch, or GD/HA prefix for government and health',
    regex: '^GB(\\d{9}|\\d{12}|GD\\d{3}|HA\\d{3})$',
    examples: ['GB123456789', 'GB123456789001', 'GBGD123', 'GBHA999'],
    notes: [
      'The 9-digit format is the standard issued to most VAT-registered businesses.',
      '12-digit numbers are issued to branches of corporate groups.',
      'GD prefix denotes government departments; HA denotes NHS health authorities.',
      'Spaces and hyphens are stripped before validation.',
    ],
    validatorSource: 'HMRC',
  },
  {
    slug: 'ireland',
    country: 'Ireland',
    countryCode: 'IE',
    vatPrefix: 'IE',
    pattern: '7 digits + 1 or 2 letters, or 9-character format with second character a letter',
    regex: '^IE(\\d{7}[A-Z]{1,2}|\\d[A-Z]\\d{5}[A-Z])$',
    examples: ['IE1234567A', 'IE1234567AB', 'IE1A23456A'],
    notes: [
      'Revenue Commissioners issue several historical formats — all still valid.',
      'Older formats include a letter mid-number; modern ones place letters at the end.',
      'Always validate against VIES for cross-border supplies.',
    ],
    validatorSource: 'VIES',
  },
  {
    slug: 'france',
    country: 'France',
    countryCode: 'FR',
    vatPrefix: 'FR',
    pattern: '2 alphanumeric (key) + 9 digits (SIREN)',
    regex: '^FR[0-9A-HJ-NP-Z]{2}\\d{9}$',
    examples: ['FR12345678901', 'FRA1234567890', 'FR1A123456789'],
    notes: [
      'The first two characters can be letters or numbers, but never I or O.',
      'The trailing 9 digits are the company SIREN.',
      'A key-based check digit calculation can be performed offline.',
    ],
    validatorSource: 'VIES',
  },
  {
    slug: 'germany',
    country: 'Germany',
    countryCode: 'DE',
    vatPrefix: 'DE',
    pattern: '9 digits',
    regex: '^DE\\d{9}$',
    examples: ['DE123456789'],
    notes: [
      'A clean 9-digit format issued by the Bundeszentralamt für Steuern.',
      'Distinct from the German Steuernummer used domestically.',
      'VIES is the canonical validation source.',
    ],
    validatorSource: 'VIES',
  },
  {
    slug: 'netherlands',
    country: 'Netherlands',
    countryCode: 'NL',
    vatPrefix: 'NL',
    pattern: '9 digits + B + 2-digit branch number',
    regex: '^NL\\d{9}B\\d{2}$',
    examples: ['NL123456789B01'],
    notes: [
      'The trailing B + branch suffix identifies the legal entity branch.',
      'Most businesses use B01.',
      'Belastingdienst issues the BTW-id format for invoicing.',
    ],
    validatorSource: 'VIES',
  },
  {
    slug: 'spain',
    country: 'Spain',
    countryCode: 'ES',
    vatPrefix: 'ES',
    pattern: 'Letter + 7 digits + letter, or letter + 8 digits, or 8 digits + letter',
    regex: '^ES([A-Z]\\d{7}[A-Z]|[A-Z]\\d{8}|\\d{8}[A-Z])$',
    examples: ['ESA1234567B', 'ESA12345678', 'ES12345678A'],
    notes: [
      'Different formats apply to corporates, sole traders, and non-residents.',
      'Format follows the NIF/CIF distinction used in Spain.',
    ],
    validatorSource: 'VIES',
  },
  {
    slug: 'italy',
    country: 'Italy',
    countryCode: 'IT',
    vatPrefix: 'IT',
    pattern: '11 digits',
    regex: '^IT\\d{11}$',
    examples: ['IT12345678901'],
    notes: [
      'Codice fiscale and partita IVA are distinct — only the partita IVA validates here.',
      'Includes a check digit calculable offline.',
    ],
    validatorSource: 'VIES',
  },
  {
    slug: 'belgium',
    country: 'Belgium',
    countryCode: 'BE',
    vatPrefix: 'BE',
    pattern: '10 digits, leading zero permitted',
    regex: '^BE0?\\d{9}$',
    examples: ['BE0123456789', 'BE1234567890'],
    notes: [
      'Format moved from 9 to 10 digits in 2008; both still occur in legacy data.',
      'Always validate via VIES for cross-border supplies.',
    ],
    validatorSource: 'VIES',
  },
  {
    slug: 'poland',
    country: 'Poland',
    countryCode: 'PL',
    vatPrefix: 'PL',
    pattern: '10 digits',
    regex: '^PL\\d{10}$',
    examples: ['PL1234567890'],
    notes: [
      'NIP format. Includes a check digit calculable offline.',
      'The Ministry of Finance also operates a domestic active-payer register.',
    ],
    validatorSource: 'VIES',
  },
  {
    slug: 'sweden',
    country: 'Sweden',
    countryCode: 'SE',
    vatPrefix: 'SE',
    pattern: '10 digits + 01',
    regex: '^SE\\d{10}01$',
    examples: ['SE123456789001'],
    notes: [
      'The trailing 01 is fixed and identifies the VAT branch.',
      'Skatteverket issues the format; VIES validates.',
    ],
    validatorSource: 'VIES',
  },
];
