// Industry pSEO data — /for/[industry]
export type Industry = {
  slug: string;
  name: string;
  audience: string;
  pain: string;
  hook: string;
  workflow: string[];
  riskNote: string;
  caseQuote: string;
};

export const industries: Industry[] = [
  {
    slug: 'accountants',
    name: 'Accountants & Bookkeepers',
    audience: 'practice owners, audit seniors, tax managers',
    pain: 'You log dozens of new suppliers per client per quarter. HMRC penalties for invalid VAT reclaims hit the practice, not the client.',
    hook: 'Stamp every supplier on intake. Audit-ready PDFs filed straight to client folder.',
    workflow: [
      'Receive supplier invoice from client',
      'Run VAT number through Countersure (1 second)',
      'PDF stamped with date, source (HMRC), and verification ID',
      'File to client cabinet — full evidence trail for HMRC enquiry',
    ],
    riskNote: 'HMRC can deny input VAT claims if the supplier is not VAT-registered. Practices have been hit with assessments running into five figures.',
    caseQuote: 'We were spending 30 minutes per audit cross-checking suppliers. Countersure cut it to under a minute.',
  },
  {
    slug: 'importers',
    name: 'Importers & Wholesalers',
    audience: 'procurement, customs, finance directors',
    pain: 'New EU supplier onboarding is one fraudulent VAT number away from a missing-trader assessment.',
    hook: 'Verify VAT + EORI on intake. Snapshot the evidence the day you signed the PO.',
    workflow: [
      'Sales contact submits new supplier',
      'Procurement runs VAT + (soon) EORI check',
      'Stamped result attached to vendor master record',
      'Re-stamped quarterly — drift = alert',
    ],
    riskNote: 'Missing-trader fraud can result in HMRC withholding input VAT and pursuing the buyer for the loss.',
    caseQuote: 'A new EU supplier had a deregistered VAT number. We caught it before the first invoice cleared.',
  },
  {
    slug: 'construction',
    name: 'Construction & Trade Contractors',
    audience: 'commercial managers, QS, CIS administrators',
    pain: 'CIS sub-contractor onboarding mixes VAT status, gross status, and Reverse Charge — get any wrong and HMRC pulls the file.',
    hook: 'One stamp per sub-contractor. Filed against the project. Unbreakable evidence trail.',
    workflow: [
      'New sub-contractor onboards via Countersure form',
      'VAT verified live against HMRC',
      'Reverse Charge applicability flagged automatically',
      'PDF lives in project folder for the duration',
    ],
    riskNote: 'Domestic Reverse Charge errors trigger HMRC enquiries and CIS filing penalties.',
    caseQuote: 'We onboard 40+ subbies per project. Countersure made it boring — exactly what we wanted.',
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    audience: 'supply chain, quality, finance',
    pain: 'Tier-2 and tier-3 suppliers change ownership, deregister, get acquired. Your vendor master goes stale within months.',
    hook: 'Stamp on intake. Re-verify on schedule. Drift detection built in.',
    workflow: [
      'Vendor master sync (CSV upload or API)',
      'Bulk re-stamp quarterly',
      'Alerts on any deregistration, name change, or status flip',
      'Audit pack generated for ISO 9001 / IATF audits',
    ],
    riskNote: 'ISO and customer audits increasingly demand documented supplier verification — not just a record that it was done.',
    caseQuote: 'Our automotive customer asked for evidence of supplier verification. We exported one PDF.',
  },
  {
    slug: 'ecommerce',
    name: 'Ecommerce & Marketplaces',
    audience: 'finance, ops, marketplace integrity teams',
    pain: 'Sellers register with placeholder VAT numbers. Marketplaces are now liable under the OECD model rules.',
    hook: 'API-first verification at seller signup. Block the fakes before they list.',
    workflow: [
      'Seller submits VAT number at registration',
      'Countersure API returns verified | flagged | unknown',
      'Decision logged with verification ID',
      'Re-checked at every payout cycle',
    ],
    riskNote: 'HMRC can hold marketplaces jointly liable for unpaid VAT by sellers using invalid numbers.',
    caseQuote: 'We integrated Countersure in an afternoon. Fake-VAT signups fell to zero.',
  },
  {
    slug: 'freight-forwarders',
    name: 'Freight Forwarders & Customs Brokers',
    audience: 'customs clearance, compliance, account managers',
    pain: 'Every clearance touches a VAT or EORI number. One bad entry costs days at the border.',
    hook: 'Verify before submission. Stamp the file. Move freight, not paper.',
    workflow: [
      'Pre-arrival entry build',
      'VAT + EORI verified against HMRC live records',
      'Stamped clearance pack saved to job',
      'AEO audit trail without the spreadsheet',
    ],
    riskNote: 'Customs delays from invalid party data are billed back to the broker more often than to the importer.',
    caseQuote: 'We stamp every entry now. Border holds dropped 80%.',
  },
  {
    slug: 'fintech',
    name: 'Fintech & Payments',
    audience: 'KYB, compliance, risk',
    pain: 'KYB onboarding for B2B accounts needs more than Companies House. VAT status is a real-time signal Companies House does not give you.',
    hook: 'Pull VAT verification straight into the KYB stack. One API call.',
    workflow: [
      'Business signs up for the account',
      'Countersure API returns VAT status with verification ID',
      'Status persists in compliance store',
      'Re-checked at threshold events',
    ],
    riskNote: 'Regulators now expect risk-based KYB refresh. Static checks at onboarding alone are not enough.',
    caseQuote: 'Our risk team wanted ongoing supplier monitoring. Countersure delivered what HMRC will not build.',
  },
  {
    slug: 'marketplaces',
    name: 'B2B Marketplaces',
    audience: 'trust & safety, finance, platform compliance',
    pain: 'Sellers churn fast. VAT numbers go stale. The marketplace carries the regulatory tail.',
    hook: 'Continuous re-stamping. Alerts. Dashboards. The compliance backbone for your platform.',
    workflow: [
      'Seller submits VAT number',
      'Countersure verifies + monitors',
      'Marketplace gets webhooks on any status change',
      'Compliance reports per quarter, signed and stamped',
    ],
    riskNote: 'Joint and several liability is now standard for B2B platforms above £85k turnover.',
    caseQuote: 'Compliance went from a spreadsheet to a dashboard in a week.',
  },
  {
    slug: 'public-sector',
    name: 'Public Sector Procurement',
    audience: 'procurement officers, framework managers, audit',
    pain: 'PCR 2015 and the Procurement Act 2023 expect documented supplier due diligence — every bid, every award.',
    hook: 'Stamped verification on every supplier in the framework. Defensible against challenge.',
    workflow: [
      'Bidder submits VAT and EORI on tender',
      'Countersure verifies live against HMRC',
      'Stamped record filed with bid pack',
      'Re-stamped on contract award and annually thereafter',
    ],
    riskNote: 'Procurement challenges increasingly cite weak supplier verification as a procedural failing.',
    caseQuote: 'We needed an evidence trail that survived legal challenge. Countersure was it.',
  },
  {
    slug: 'charities',
    name: 'Charities & Non-Profits',
    audience: 'finance trustees, gift aid administrators, grant managers',
    pain: 'Charity Commission expects documented supplier and grantee verification. A stamped record is what auditors want.',
    hook: 'Verify suppliers and grantees in one flow. Free for the basics.',
    workflow: [
      'New supplier or grantee submitted',
      'Countersure runs the check',
      'Stamped PDF attached to vendor or grant record',
      'Annual re-check before renewal',
    ],
    riskNote: 'The Charity Commission has flagged supplier verification weakness in serious incident reports.',
    caseQuote: 'We needed it documented for the trustees. Countersure made the documentation effortless.',
  },
];
