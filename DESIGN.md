# Countersure — Design Brief

## Aesthetic Direction
**Customs Hall / Verification Bureau** — the visual language of a UK Border Force clearance hall crossed with a Swiss private bank. Authoritative, institutional, never alarmist. The feeling you get when your passport is stamped: scrutinised, recorded, cleared.

## Target Audience
- **Procurement managers** at UK SMEs verifying suppliers before raising POs
- **Accountants** running supplier onboarding for client portfolios
- **Compliance officers** building audit trails for HMRC and AML scrutiny
- **Finance leads** at importers/exporters checking VAT + EORI before quoting

Emotional state: **professional, slightly skeptical, audit-conscious**. They are not browsing — they have a job to do, a supplier to clear, a record to file. The site must feel like an extension of their compliance workflow, not a marketing brochure. Authority outranks delight.

## Typography
- **Headings**: **Geist Sans** (700/900) — Vercel's font, modern fintech authority, geometric and clean. Unused elsewhere in the portfolio.
- **Body**: **Cabinet Grotesk** (400/500) — Fontshare, has more personality than typical sans-serif body fonts. Pairs cleanly with Geist's geometry.
- **Data/UI**: **Geist Mono** — sibling of Geist Sans, used for VAT numbers, EORI numbers, timestamps, monospaced tabular data. Critical for the verification feel.
- **Scale**: 16px body → 24px subhead → 56px section heading → 96px hero. 3x+ jumps. Hero numbers (e.g. "98.4M VAT records") rendered at 120-160px in Geist Mono.

## Color Palette
| Role | Hex | Usage |
|------|-----|-------|
| Dominant | **#0F5132** Customs hall green | Hero band, navigation chrome, headers, primary surfaces. Roughly 40% of branded surface. |
| Accent (action) | **#B23A28** Stamp red | The Stamp itself, primary CTAs, error states, "REJECTED" status indicators. Used sparingly — under 5%. |
| Verified | **#10B981** Verified emerald | Status badges for valid checks, success ticks, confirmation banners. |
| Flagged | **#F59E0B** Flagged amber | Warning states (deregistration risk, missing data, expired records). |
| Background | **#FAFBF9** Clearance white | Main body background — slightly cooler than pure white, reads as "official paper". |
| Surface | **#F1F4EE** Sage paper | Card backgrounds, table row alternation, sidebar fills. |
| Text Primary | **#1F2937** Slate ink | Body copy and headings on light backgrounds. |
| Text Secondary | **#6B7280** Slate mid | Metadata, timestamps, captions, hint text. |

## Layout Rules
- **Hero**: Customs hall green full-bleed band (60-70vh). Single search input centred-left, 8px sharp corners, Geist Mono placeholder text. Right side shows a **live demo result card** with The Stamp affixed. No animated gradients. No 3D illustrations. The interaction IS the hero.
- **Grid**: 12-column with 8:4 splits favoured. Result pages use a 7:5 (data left, audit metadata right). Listing pages use a single dense column with hairline rules between rows — like a customs declaration form, not a card grid.
- **Cards**: Sharp corners (border-radius: 4px maximum). Single 1px border in slate ink at 15% opacity. NO drop shadows. Status indicated by a 4px coloured left-border (verified emerald / stamp red / flagged amber).
- **Sections**: Hard cuts. Alternating customs hall green sections and clearance white sections, separated by a 2px solid stamp-red divider rule with a small Geist Mono label inset on the left ("§ 02 — VERIFICATION", "§ 03 — AUDIT TRAIL").
- **Max width**: 1280px main container. Hero forms allowed to extend to 1440px for breathing room.
- **Spacing philosophy**: Dense and structured, not airy. Information density signals authority. Whitespace used as section breathing room, not padding for its own sake.

## The Stamp (Unique Hook)
Every verification result generates **The Stamp** — a circular date stamp resembling a passport entry mark or notary seal. Specifications:
- **Outer ring**: 1.5px stamp red, broken at top and bottom
- **Inner content**: Country code, VAT/EORI number, ISO date in Geist Mono, all in stamp red
- **Slight rotation**: -7° to feel hand-applied, not generated
- **CSS-only generation** (no images) so it renders crisply in PDFs and at any zoom
- **Featured prominently** on result pages, in PDF exports, and as the favicon mark
- **Behaviour**: when you complete a check, The Stamp animates in with a 200ms scale + slight rotation, like it's been physically pressed onto the page

This is the screenshotable artefact. Procurement teams will paste it into Slack/Teams to show "supplier cleared". It becomes recognisable as Countersure visual shorthand.

## Banned Patterns
- Drop shadows of any kind (flat institutional only)
- Gradient backgrounds (one exception: subtle paper-grain SVG noise overlay)
- Rounded buttons or pills (sharp corners only — except The Stamp itself)
- Generic 3-card feature grids ("Fast / Secure / Reliable")
- Centred hero with subtitle + two buttons
- Lottie animations or any "delight" micro-interactions outside The Stamp's press
- Stock photos of people in offices
- The phrase "Get Started" anywhere — use "Run a check" or "Clear a supplier"

## Reference Mood
- **gov.uk** — clarity, hierarchy, no ornamentation, content-first
- **HMRC's published service standards** — dense, structured, audit-ready
- **Stripe Atlas** — institutional confidence with modern type
- **Linear's docs** — clean Geist usage, sharp corners, monospace data
- **A real UK customs declaration form** — multi-section, hairline-divided, every field labelled

## Texture Notes
- Subtle paper-grain SVG noise overlay at 3% opacity on customs hall green sections — adds tactile "official document" feel without trespassing into "vintage" territory
- Faint security-document microprint pattern (1px text repeated, "COUNTERSURE · VERIFIED · ") in section dividers
- Status borders pulse slowly (2s, 60% → 100% opacity) on flagged/expired results — a calm urgency

## Distinct From Portfolio
| Portfolio site | Why Countersure differs |
|----------------|-------------------------|
| **RedBoxIQ** (Parliamentary Gazette, dispatch red) | Different aesthetic family — Countersure is operational/clearance, not editorial/gazette. Different green dominant vs slate dominant. |
| **CertWatch** (Blueprint blue + amber) | Blue vs green dominant. Architectural blueprint vs customs declaration. CertWatch is countdowns; Countersure is point-in-time verification. |
| **CarePlanHQ** (Sage green + coral) | CarePlanHQ is warm clinical; Countersure is cold institutional. Different greens (#1E6F5C vs #0F5132), different accents (coral vs stamp red). |
| **BrickData** (Stone paper + surveyor orange) | Survey grid pattern vs customs declaration form. Different fonts entirely (Vollkorn serif vs Geist sans). |
| **EPC Check** (Utility/government) | EPC Check is light/utilitarian; Countersure is dark/institutional. Different visual weight. |

The screenshot test: If you see Countersure next to RedBoxIQ, CertWatch, or CarePlanHQ, you'd assume four different companies built them.
