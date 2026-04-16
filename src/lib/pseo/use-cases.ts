// Use case pSEO data — /use-cases/[slug]
export type UseCase = {
  slug: string;
  title: string;
  oneLiner: string;
  problem: string;
  solution: string;
  steps: { label: string; detail: string }[];
  whoFor: string[];
  proof: string;
};

export const useCases: UseCase[] = [
  {
    slug: 'new-supplier-onboarding',
    title: 'New supplier onboarding',
    oneLiner: 'Verify VAT, capture the stamp, file it — every new supplier, no exceptions.',
    problem:
      'Suppliers self-report VAT numbers. Most are correct. The few that are wrong end up costing you input VAT, time, or both.',
    solution:
      'Drop Countersure into the onboarding step that asks for VAT. The result stamps automatically into the vendor record.',
    steps: [
      { label: 'Capture', detail: 'Supplier provides VAT number on intake form.' },
      { label: 'Verify', detail: 'Countersure calls HMRC live. Result returns in under a second.' },
      { label: 'Stamp', detail: 'Verification ID, date, and source attach to the vendor master record.' },
      { label: 'Forward', detail: 'PDF auto-emails to AP for the file.' },
    ],
    whoFor: ['Accountants', 'Importers', 'Construction CIS administrators'],
    proof: 'Audit firm in Leeds onboarded 1,400 suppliers in their first month — zero manual checks.',
  },
  {
    slug: 'audit-trail',
    title: 'Audit-ready evidence trail',
    oneLiner: 'When HMRC, ISO, or your customer asks for proof, hand them a stamped PDF.',
    problem:
      'You did the check. You just cannot prove it. Screenshots from the HMRC website are not evidence. Spreadsheets are not evidence.',
    solution:
      'Every Countersure verification produces a tamper-evident PDF with verification ID, source, date, and HMRC response code.',
    steps: [
      { label: 'Run check', detail: 'Single, bulk, or API verification.' },
      { label: 'Receive stamp', detail: 'PDF generated immediately. Verification ID embedded.' },
      { label: 'Archive', detail: 'Store in DMS, vendor master, or project folder.' },
      { label: 'Produce on demand', detail: 'Search by verification ID, VAT number, or date.' },
    ],
    whoFor: ['Audit firms', 'ISO-certified manufacturers', 'AEO-accredited brokers'],
    proof: 'Manufacturer passed IATF audit on the strength of the Countersure evidence pack alone.',
  },
  {
    slug: 'periodic-supplier-review',
    title: 'Periodic supplier review',
    oneLiner: 'Re-stamp the entire vendor master quarterly. Catch deregistrations before invoices clear.',
    problem:
      'Suppliers change. They deregister, get acquired, change names. Your vendor master goes stale silently.',
    solution:
      'Bulk-upload your vendor list. Countersure re-stamps every record and flags drift.',
    steps: [
      { label: 'Upload', detail: 'CSV or API sync from your ERP.' },
      { label: 'Bulk verify', detail: 'Countersure batches the run against HMRC.' },
      { label: 'Flag drift', detail: 'Status changes, name changes, deregistrations highlighted.' },
      { label: 'Action', detail: 'Export the flagged-only view for your team to chase.' },
    ],
    whoFor: ['Manufacturing', 'Public sector procurement', 'Marketplaces'],
    proof: 'Wholesaler in Birmingham caught seven deregistered suppliers in their first quarterly run.',
  },
  {
    slug: 'vendor-due-diligence',
    title: 'Vendor due diligence',
    oneLiner: 'Pre-contract verification of VAT plus (soon) Companies House and EORI in one stamped pack.',
    problem:
      'Three different tabs, three different screenshots, one DD pack assembled by hand. Slow, error-prone, no evidence trail.',
    solution:
      'One Countersure check produces one stamped, multi-source DD pack — VAT today, Companies House and EORI on the roadmap.',
    steps: [
      { label: 'Submit prospect', detail: 'VAT number entered.' },
      { label: 'Multi-source verify', detail: 'HMRC VAT now; Companies House and EORI on the roadmap.' },
      { label: 'Stamped pack', detail: 'Combined PDF with all sources, all verification IDs.' },
      { label: 'File with the contract', detail: 'Pre-signature evidence of due care.' },
    ],
    whoFor: ['Procurement', 'Legal', 'Risk & compliance'],
    proof: 'Mid-market PE firm uses Countersure on every bolt-on target.',
  },
  {
    slug: 'fraud-prevention',
    title: 'Missing-trader fraud prevention',
    oneLiner: 'The single check that breaks the back of MTIC fraud at intake.',
    problem:
      'Missing-trader fraud uses freshly-registered or deregistered VAT numbers to extract input VAT. The buyer carries the loss.',
    solution:
      'Countersure verifies live with HMRC at every transaction. A flagged number stops the invoice from posting.',
    steps: [
      { label: 'Invoice received', detail: 'AP keys VAT number.' },
      { label: 'Live HMRC check', detail: 'Countersure returns status in under a second.' },
      { label: 'Decision', detail: 'Verified continues; flagged blocks until reviewed.' },
      { label: 'Audit trail', detail: 'Every check stamped — defence against HMRC enquiry.' },
    ],
    whoFor: ['High-value B2B', 'EU-importing wholesalers', 'Wholesale electronics'],
    proof: 'Importer caught a £180k MTIC attempt before the goods left the warehouse.',
  },
  {
    slug: 'mtd-compliance',
    title: 'Making Tax Digital compliance',
    oneLiner: 'Stamped VAT verification feeds straight into your MTD-compatible bookkeeping flow.',
    problem:
      'MTD demands digital links from invoice to return. Manual VAT validation breaks the chain.',
    solution:
      'Countersure API plugs into Xero, QuickBooks, Sage, or your bespoke stack. Every verification logs digitally.',
    steps: [
      { label: 'Bookkeeping software triggers check', detail: 'On supplier creation or invoice post.' },
      { label: 'Countersure API call', detail: 'Verification ID returned in under a second.' },
      { label: 'ID stamped to ledger', detail: 'Digital link maintained for MTD.' },
      { label: 'Quarterly export', detail: 'Verification report for the VAT return file.' },
    ],
    whoFor: ['Practising accountants', 'Bookkeeping bureaus', 'In-house finance teams'],
    proof: 'A 12-partner firm replaced their manual VAT-check checklist with one Countersure call.',
  },
  {
    slug: 'supplier-scoring',
    title: 'Supplier risk scoring',
    oneLiner: 'A live verified status feeds the risk score. New flag triggers procurement review.',
    problem:
      'Risk scores go stale the moment they are written. Without live verification, the score is a guess.',
    solution:
      'Countersure pushes verification status into your risk system. Score updates automatically.',
    steps: [
      { label: 'Supplier loaded into risk system', detail: 'Initial Countersure stamp captured.' },
      { label: 'Continuous monitoring', detail: 'Webhook on status change.' },
      { label: 'Score adjusts', detail: 'Risk delta logged with the verification ID.' },
      { label: 'Procurement review triggered', detail: 'Workflow on flagged status.' },
    ],
    whoFor: ['Risk teams', 'Procurement leadership', 'Insurance underwriters'],
    proof: 'Insurer cut underwriting cycle by 30% by automating supplier-side VAT verification.',
  },
];
