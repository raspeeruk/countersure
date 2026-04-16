/**
 * The Stamp — circular passport-style date stamp.
 * CSS-only (no images) so it renders crisply in PDFs and at any zoom.
 */
export function Stamp({
  countryCode = 'GB',
  number,
  date,
  size = 180,
  animate = true,
  status = 'verified',
}: {
  countryCode?: string;
  number: string;
  date: string; // ISO date YYYY-MM-DD
  size?: number;
  animate?: boolean;
  status?: 'verified' | 'rejected';
}) {
  const colorVar = status === 'verified' ? '--color-stamp-red' : '--color-stamp-red';

  return (
    <div
      className={`stamp ${animate ? 'stamp-animate' : ''}`}
      style={
        {
          '--stamp-size': `${size}px`,
          '--stamp-color': `var(${colorVar})`,
        } as React.CSSProperties
      }
      aria-label={`${countryCode} ${number} verified ${date}`}
    >
      <span style={{ fontSize: size * 0.07, opacity: 0.85, marginBottom: 4 }}>
        ★ COUNTERSURE ★
      </span>
      <span style={{ fontSize: size * 0.13, fontWeight: 600, lineHeight: 1 }}>
        {countryCode}
      </span>
      <span style={{ fontSize: size * 0.085, marginTop: 4, fontWeight: 500 }}>
        {number}
      </span>
      <span style={{ fontSize: size * 0.06, marginTop: 6, opacity: 0.85 }}>
        {date}
      </span>
      <span style={{ fontSize: size * 0.055, marginTop: 4, opacity: 0.7 }}>
        VERIFIED
      </span>
    </div>
  );
}
