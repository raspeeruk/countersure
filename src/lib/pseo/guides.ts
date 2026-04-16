// Long-form SEO guides — /guide/[slug]
export type Guide = {
  slug: string;
  title: string;
  description: string;
  category: 'Verification' | 'Compliance' | 'Risk' | 'Format' | 'Practice';
  readingMinutes: number;
  body: GuideSection[];
  publishedAt: string; // ISO date
};

type GuideSection = {
  heading: string;
  paragraphs: string[];
};

export const guides: Guide[] = [
  {
    slug: 'how-to-check-uk-vat-number',
    title: 'How to check a UK VAT number — the full guide',
    description: 'The four ways to verify a UK VAT number, with the trade-offs of each.',
    category: 'Verification',
    readingMinutes: 6,
    publishedAt: '2026-04-16',
    body: [
      {
        heading: 'Why VAT validation matters',
        paragraphs: [
          'Reclaiming input VAT against an invalid VAT number is one of the most common reasons HMRC denies a VAT return. The cost lands on the buyer, not the seller.',
          'The penalty regime tightened in 2023. HMRC is more willing than ever to assess on the basis of weak supplier verification.',
        ],
      },
      {
        heading: 'Method 1 — HMRC website',
        paragraphs: [
          'HMRC offers a public lookup at gov.uk. It accepts one number at a time and returns the registered name and address.',
          'It is free, but rate-limited and unsuitable for bulk verification. The output is a screen — not a defensible audit artefact.',
        ],
      },
      {
        heading: 'Method 2 — VIES',
        paragraphs: [
          'The European Commission VIES service validates VAT numbers across the EU. Post-Brexit, GB-prefixed numbers are no longer routed through VIES — only XI (Northern Ireland) numbers are.',
          'For cross-border EU trade, VIES gives a consultation reference number that constitutes evidence of the check.',
        ],
      },
      {
        heading: 'Method 3 — Countersure',
        paragraphs: [
          'Countersure calls the live HMRC API for UK numbers and produces a stamped PDF audit artefact in one step. Free for occasional use, paid plans for bulk and API.',
          'The verification ID format CS-YYYYMMDD-XXXXXXXX is unique, traceable, and stable across re-checks.',
        ],
      },
      {
        heading: 'Method 4 — Tax software integrations',
        paragraphs: [
          'Most modern bookkeeping software offers an integration. Quality varies. Many do not store evidence beyond a tick-box.',
          'For audit defence, you want a stamped artefact — not a checked box.',
        ],
      },
    ],
  },
  {
    slug: 'uk-vat-number-format',
    title: 'UK VAT number format explained',
    description: 'Standard, branch, government, and health authority formats.',
    category: 'Format',
    readingMinutes: 4,
    publishedAt: '2026-04-16',
    body: [
      {
        heading: 'The standard 9-digit format',
        paragraphs: [
          'Most UK VAT-registered businesses receive a 9-digit number. The check digit is computed by HMRC and not exposed in any public algorithm.',
          'The format is presented as GB followed by the digits, e.g. GB123456789.',
        ],
      },
      {
        heading: 'Branch numbers (12 digits)',
        paragraphs: [
          'Group registrations and large corporates with multiple branches use a 12-digit format — 9 digits plus a 3-digit branch identifier.',
          'Example: GB123456789001.',
        ],
      },
      {
        heading: 'Government and health authority prefixes',
        paragraphs: [
          'GD prefix identifies government departments — e.g. GBGD001.',
          'HA prefix identifies NHS health authorities — e.g. GBHA999.',
        ],
      },
    ],
  },
  {
    slug: 'eu-vat-validation-after-brexit',
    title: 'EU VAT validation after Brexit',
    description: 'GB, XI, and the new validation routing.',
    category: 'Compliance',
    readingMinutes: 5,
    publishedAt: '2026-04-16',
    body: [
      {
        heading: 'GB no longer routes through VIES',
        paragraphs: [
          'Since 1 January 2021, VIES no longer validates GB-prefixed VAT numbers. EU buyers verifying UK suppliers must use the HMRC API or its consumer-facing equivalent.',
          'XI-prefixed numbers — Northern Ireland under the Windsor Framework — continue to validate via VIES.',
        ],
      },
      {
        heading: 'What this means for your evidence',
        paragraphs: [
          'A VIES consultation number is no longer evidence of GB VAT verification. You need an alternative artefact.',
          'Countersure stamps every HMRC check with a verification ID, source, and date — the modern equivalent of the VIES reference.',
        ],
      },
    ],
  },
  {
    slug: 'missing-trader-fraud',
    title: 'Missing-trader fraud (MTIC) and how to defend',
    description: 'Why supplier verification is the front line.',
    category: 'Risk',
    readingMinutes: 7,
    publishedAt: '2026-04-16',
    body: [
      {
        heading: 'How MTIC works',
        paragraphs: [
          'A fraudster registers for VAT, sells goods (often electronics or commodities) into the UK supply chain, charges VAT, and disappears before remitting it to HMRC.',
          'The buyer claims input VAT. HMRC chases the buyer for the loss.',
        ],
      },
      {
        heading: 'The Kittel principle',
        paragraphs: [
          'The Court of Justice of the EU established that input VAT can be denied where the buyer knew or should have known they were participating in a fraudulent supply chain.',
          'The bar for "should have known" is lower than many businesses realise. Robust supplier verification is now the practical defence.',
        ],
      },
      {
        heading: 'What good defence looks like',
        paragraphs: [
          'Verify VAT and EORI on intake. Re-verify periodically. Keep stamped artefacts of every check.',
          'Countersure builds this into the standard onboarding flow — not as an afterthought.',
        ],
      },
    ],
  },
  {
    slug: 'what-is-eori',
    title: 'What is an EORI number',
    description: 'Economic Operator Registration and Identification — explained.',
    category: 'Format',
    readingMinutes: 4,
    publishedAt: '2026-04-16',
    body: [
      {
        heading: 'Definition',
        paragraphs: [
          'EORI is a unique identifier issued by HMRC to businesses that import or export goods. It is required for customs declarations.',
          'A UK EORI typically begins with GB followed by the 9-digit VAT number plus three trailing zeros.',
        ],
      },
      {
        heading: 'Why verify it',
        paragraphs: [
          'EORI numbers can be deactivated. An invalid EORI on a customs declaration triggers a hold and a delay.',
          'Verify on intake of new suppliers and freight partners.',
        ],
      },
    ],
  },
  {
    slug: 'cis-reverse-charge-vat',
    title: 'CIS Reverse Charge VAT — what contractors need to verify',
    description: 'Verification responsibilities under the construction Reverse Charge.',
    category: 'Compliance',
    readingMinutes: 6,
    publishedAt: '2026-04-16',
    body: [
      {
        heading: 'What is the Reverse Charge',
        paragraphs: [
          'The Domestic Reverse Charge for construction services moves the responsibility for accounting for VAT from the supplier to the customer where both are CIS-registered.',
          'It came into effect on 1 March 2021 and applies to most B2B construction services.',
        ],
      },
      {
        heading: 'Verification required',
        paragraphs: [
          'You must verify the customer is VAT-registered and CIS-registered before applying the Reverse Charge.',
          'Failure to verify means you may incorrectly charge VAT — or fail to charge it where you should — both of which create HMRC risk.',
        ],
      },
    ],
  },
  {
    slug: 'mtd-supplier-verification',
    title: 'Making Tax Digital and supplier verification',
    description: 'Where verification fits in the digital link chain.',
    category: 'Compliance',
    readingMinutes: 5,
    publishedAt: '2026-04-16',
    body: [
      {
        heading: 'Digital links are mandatory',
        paragraphs: [
          'MTD requires unbroken digital links from invoice capture through to the VAT return. Manual rekeying breaks the chain.',
          'A Countersure verification ID, captured automatically and stored alongside the supplier record, is a digital link.',
        ],
      },
    ],
  },
  {
    slug: 'gdpr-and-vat-checks',
    title: 'GDPR considerations for B2B verification',
    description: 'When VAT verification touches personal data.',
    category: 'Compliance',
    readingMinutes: 4,
    publishedAt: '2026-04-16',
    body: [
      {
        heading: 'Sole traders and personal data',
        paragraphs: [
          'A VAT lookup against a sole trader returns their trading name and address — which may include their home address.',
          'Document the lawful basis (legitimate interest) and retain only the verification ID, not the full record, for periodic audits.',
        ],
      },
    ],
  },
  {
    slug: 'audit-evidence-best-practice',
    title: 'Audit evidence best practice for VAT verification',
    description: 'What auditors want to see.',
    category: 'Practice',
    readingMinutes: 5,
    publishedAt: '2026-04-16',
    body: [
      {
        heading: 'Evidence properties',
        paragraphs: [
          'Auditors want artefacts that are: dated, sourced, identifiable (verification ID), reproducible (you can re-issue without losing the original), and tamper-evident.',
          'Screenshots fail on most of these. Stamped PDFs from a verification platform pass all of them.',
        ],
      },
    ],
  },
  {
    slug: 'when-vat-numbers-go-stale',
    title: 'When VAT numbers go stale — and how to catch it',
    description: 'The case for periodic re-verification.',
    category: 'Risk',
    readingMinutes: 5,
    publishedAt: '2026-04-16',
    body: [
      {
        heading: 'Common drift events',
        paragraphs: [
          'Suppliers can deregister voluntarily, be deregistered by HMRC, change names through M&A, restructure into a group registration, or have their VAT cancelled for non-compliance.',
          'Any of these breaks the assumption you made when you onboarded them.',
        ],
      },
      {
        heading: 'A quarterly cadence',
        paragraphs: [
          'For most B2B operations, quarterly re-verification of the active vendor master strikes the right balance between cost and risk.',
          'Countersure bulk runs make this an unattended job.',
        ],
      },
    ],
  },
  {
    slug: 'vat-number-vs-company-number',
    title: 'VAT number vs company number — what is the difference',
    description: 'Two different identifiers, two different registers.',
    category: 'Format',
    readingMinutes: 3,
    publishedAt: '2026-04-16',
    body: [
      {
        heading: 'Two different IDs',
        paragraphs: [
          'A company number is issued by Companies House on incorporation. Every limited company has one. Sole traders do not.',
          'A VAT number is issued by HMRC on VAT registration. Many companies are not VAT-registered. Some sole traders are.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-spot-fake-vat-number',
    title: 'How to spot a fake VAT number',
    description: 'Format clues and verification confirmation.',
    category: 'Risk',
    readingMinutes: 4,
    publishedAt: '2026-04-16',
    body: [
      {
        heading: 'Format checks first',
        paragraphs: [
          'A UK VAT number is 9 digits (or 12 with branch). Letters in the wrong place, wrong length, or non-numeric characters are immediate signals.',
          'Format alone is not enough — many fake numbers pass format checks. Always verify against HMRC.',
        ],
      },
    ],
  },
  {
    slug: 'pdf-audit-trail-explained',
    title: 'The Countersure stamped PDF — what is in it',
    description: 'Anatomy of the verification artefact.',
    category: 'Practice',
    readingMinutes: 3,
    publishedAt: '2026-04-16',
    body: [
      {
        heading: 'On the page',
        paragraphs: [
          'Each PDF carries the VAT number, the registered name, the registered address, the source (HMRC live API), the verification ID, the date in ISO format, and the result (verified, flagged, or not found).',
          'A circular passport-style stamp anchors the page. The verification ID format is CS-YYYYMMDD-XXXXXXXX.',
        ],
      },
    ],
  },
  {
    slug: 'bulk-vat-checks',
    title: 'Bulk VAT verification — how it works',
    description: 'CSV upload, scheduled re-runs, alerts.',
    category: 'Verification',
    readingMinutes: 4,
    publishedAt: '2026-04-16',
    body: [
      {
        heading: 'CSV upload',
        paragraphs: [
          'Drop a CSV with one VAT number per row. Countersure verifies each in turn against HMRC and produces a stamped pack.',
          'Headers are optional. The result CSV adds verification ID, status, and timestamp columns.',
        ],
      },
      {
        heading: 'Scheduled re-runs',
        paragraphs: [
          'Pro and Team plans can schedule the same source CSV to re-run on a cadence and email the diff.',
        ],
      },
    ],
  },
  {
    slug: 'api-integration-vat-check',
    title: 'Integrating Countersure into your software',
    description: 'API authentication, request format, webhooks.',
    category: 'Practice',
    readingMinutes: 5,
    publishedAt: '2026-04-16',
    body: [
      {
        heading: 'Authentication',
        paragraphs: [
          'API keys are issued from the dashboard. Authenticate with Authorization: Bearer cs_live_xxx.',
          'Test keys (cs_test_xxx) hit a sandbox that returns deterministic responses.',
        ],
      },
      {
        heading: 'Single check',
        paragraphs: [
          'POST /v1/vat/check with body { vat_number: "GB123456789", requester_vat?: "GB987654321" }.',
          'Returns the same payload format as the website — verification ID, status, registered name and address.',
        ],
      },
    ],
  },
  {
    slug: 'companies-house-vs-vat',
    title: 'Companies House vs VAT register — what each tells you',
    description: 'When to use which register.',
    category: 'Format',
    readingMinutes: 3,
    publishedAt: '2026-04-16',
    body: [
      {
        heading: 'Different signals',
        paragraphs: [
          'Companies House confirms legal existence and ownership. The VAT register confirms tax-status active operation.',
          'A company can be on Companies House but not VAT-registered — and vice versa for unincorporated businesses.',
        ],
      },
    ],
  },
  {
    slug: 'eori-vs-vat',
    title: 'EORI number vs VAT number',
    description: 'Two identifiers for two different jobs.',
    category: 'Format',
    readingMinutes: 3,
    publishedAt: '2026-04-16',
    body: [
      {
        heading: 'Where they overlap',
        paragraphs: [
          'A UK EORI is typically derived from the VAT number plus three trailing zeros — but they are validated against different registers.',
          'You need both for cross-border supply chains. Verify both.',
        ],
      },
    ],
  },
  {
    slug: 'invoice-without-vat-number',
    title: 'Receiving an invoice without a VAT number',
    description: 'When it is fine, when it is a red flag.',
    category: 'Compliance',
    readingMinutes: 3,
    publishedAt: '2026-04-16',
    body: [
      {
        heading: 'Two cases',
        paragraphs: [
          'A genuine non-VAT-registered supplier (under threshold or exempt) issues an invoice with no VAT number and no VAT line.',
          'A supplier charging VAT but not showing a number on the invoice is a red flag — request the number and verify before settling.',
        ],
      },
    ],
  },
  {
    slug: 'vat-deregistration',
    title: 'VAT deregistration — what triggers it',
    description: 'Voluntary, compulsory, and HMRC-initiated.',
    category: 'Risk',
    readingMinutes: 4,
    publishedAt: '2026-04-16',
    body: [
      {
        heading: 'Three routes',
        paragraphs: [
          'Voluntary: turnover falls below the deregistration threshold and the business chooses to leave.',
          'Compulsory: business ceases trading or becomes ineligible.',
          'HMRC-initiated: typically for non-compliance or failure to file.',
        ],
      },
    ],
  },
  {
    slug: 'choosing-vat-verification-software',
    title: 'Choosing VAT verification software — buyer\u2019s guide',
    description: 'What to evaluate and the questions to ask.',
    category: 'Practice',
    readingMinutes: 6,
    publishedAt: '2026-04-16',
    body: [
      {
        heading: 'Source of truth',
        paragraphs: [
          'Some tools scrape; some use the HMRC API. Only the latter survives audit. Confirm the source before buying.',
        ],
      },
      {
        heading: 'Audit artefact',
        paragraphs: [
          'Ask to see the artefact the tool produces. If it is a screenshot or a CSV row, walk away.',
          'You want a dated, identified, sourced PDF — and ideally the option of an API for downstream integrations.',
        ],
      },
    ],
  },
];
