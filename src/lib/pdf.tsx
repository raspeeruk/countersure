import { Document, Page, Text, View, StyleSheet, Svg, Circle, Path } from '@react-pdf/renderer';

// Brand colour tokens (mirrored from globals.css)
const COLORS = {
  customsGreen: '#0F5132',
  stampRed: '#B23A28',
  clearanceWhite: '#FAFBF9',
  sagePaper: '#F1F4EE',
  slateInk: '#1F2937',
  slateMid: '#6B7280',
  emerald: '#10B981',
  amber: '#F59E0B',
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.clearanceWhite,
    padding: 48,
    fontFamily: 'Helvetica',
    fontSize: 11,
    color: COLORS.slateInk,
  },
  // Top border bar (customs green) + accent rule (stamp red)
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 32,
    backgroundColor: COLORS.customsGreen,
  },
  redRule: {
    position: 'absolute',
    top: 32,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: COLORS.stampRed,
  },
  brand: {
    fontSize: 9,
    fontFamily: 'Courier',
    color: COLORS.clearanceWhite,
    position: 'absolute',
    top: 12,
    left: 48,
    letterSpacing: 2,
  },
  brandRight: {
    fontSize: 9,
    fontFamily: 'Courier',
    color: COLORS.clearanceWhite,
    position: 'absolute',
    top: 12,
    right: 48,
    letterSpacing: 2,
  },
  header: {
    marginTop: 32,
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#1F293720',
    paddingBottom: 12,
  },
  sectionLabel: {
    fontFamily: 'Courier',
    fontSize: 8,
    color: COLORS.stampRed,
    letterSpacing: 2,
    marginBottom: 4,
  },
  h1: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.slateInk,
    marginBottom: 4,
  },
  sub: {
    fontSize: 11,
    color: COLORS.slateMid,
    fontFamily: 'Helvetica',
  },
  layout: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 32,
  },
  body: {
    flex: 1,
  },
  metaBlock: {
    marginBottom: 16,
  },
  metaLabel: {
    fontFamily: 'Courier',
    fontSize: 7,
    color: COLORS.slateMid,
    letterSpacing: 2,
    marginBottom: 2,
  },
  metaValue: {
    fontSize: 14,
    color: COLORS.slateInk,
    fontFamily: 'Helvetica-Bold',
  },
  addressLine: {
    fontSize: 11,
    color: COLORS.slateInk,
    marginBottom: 1,
  },
  resultBox: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.customsGreen,
    paddingLeft: 12,
    marginBottom: 24,
    paddingTop: 4,
    paddingBottom: 4,
  },
  resultBoxFlagged: {
    borderLeftColor: COLORS.amber,
  },
  resultBoxRejected: {
    borderLeftColor: COLORS.stampRed,
  },
  resultStatus: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 16,
    color: COLORS.customsGreen,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  resultStatusRejected: {
    color: COLORS.stampRed,
  },
  resultStatusFlagged: {
    color: COLORS.amber,
  },
  // Stamp container
  stampWrap: {
    width: 180,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 0,
  },
  // Audit grid
  auditGrid: {
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#1F293720',
    paddingTop: 16,
  },
  auditRow: {
    flexDirection: 'row',
    paddingBottom: 8,
    marginBottom: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#1F293710',
  },
  auditCellLabel: {
    width: 140,
    fontFamily: 'Courier',
    fontSize: 8,
    color: COLORS.slateMid,
    letterSpacing: 2,
  },
  auditCellValue: {
    flex: 1,
    fontFamily: 'Courier',
    fontSize: 10,
    color: COLORS.slateInk,
  },
  footer: {
    position: 'absolute',
    bottom: 32,
    left: 48,
    right: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 8,
    fontFamily: 'Courier',
    color: COLORS.slateMid,
    letterSpacing: 1,
    paddingTop: 12,
    borderTopWidth: 0.5,
    borderTopColor: '#1F293720',
  },
});

// Stamp: SVG circles + View text overlay for cross-platform reliability ----------------
const stampStyles = StyleSheet.create({
  wrapper: {
    width: 170,
    height: 170,
    position: 'relative',
    transform: 'rotate(-7deg)',
  },
  textOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  country: {
    color: COLORS.stampRed,
    fontFamily: 'Helvetica-Bold',
    fontSize: 30,
    marginBottom: 2,
  },
  number: {
    color: COLORS.stampRed,
    fontFamily: 'Courier-Bold',
    fontSize: 11,
    letterSpacing: 1,
    marginBottom: 4,
  },
  date: {
    color: COLORS.stampRed,
    fontFamily: 'Courier',
    fontSize: 8,
    marginBottom: 2,
  },
  verified: {
    color: COLORS.stampRed,
    fontFamily: 'Courier',
    fontSize: 7,
    letterSpacing: 2,
  },
});

function StampSvg({
  countryCode,
  number,
  date,
}: {
  countryCode: string;
  number: string;
  date: string;
}) {
  const size = 170;
  const cx = size / 2;
  const cy = size / 2;
  const r = (size - 8) / 2;
  return (
    <View style={stampStyles.wrapper}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle cx={cx} cy={cy} r={r} stroke={COLORS.stampRed} strokeWidth={3} fill="none" />
        <Circle cx={cx} cy={cy} r={r - 8} stroke={COLORS.stampRed} strokeWidth={1} fill="none" />
        <Path
          d={`M ${cx - 3} ${cy - r + 14} L ${cx} ${cy - r + 8} L ${cx + 3} ${cy - r + 14} Z`}
          fill={COLORS.stampRed}
        />
      </Svg>
      <View style={stampStyles.textOverlay}>
        <Text style={stampStyles.country}>{countryCode}</Text>
        <Text style={stampStyles.number}>{number}</Text>
        <Text style={stampStyles.date}>{date}</Text>
        <Text style={stampStyles.verified}>VERIFIED</Text>
      </View>
    </View>
  );
}

// Public document type
export type StampDoc = {
  verificationId: string;
  vatNumber: string;
  countryCode: string;
  status: 'verified' | 'flagged' | 'not_found' | 'error';
  name?: string;
  address?: {
    line1?: string;
    line2?: string;
    line3?: string;
    line4?: string;
    postcode?: string;
    countryCode?: string;
  };
  checkedAt: string; // ISO
  source: string;
  consultationNumber?: string;
};

export function VerificationPdf({ doc }: { doc: StampDoc }) {
  const dateLabel = doc.checkedAt.slice(0, 10);
  const checkedAtFormatted = new Date(doc.checkedAt).toUTCString();
  const isVerified = doc.status === 'verified';
  const isFlagged = doc.status === 'flagged';

  return (
    <Document
      title={`Countersure verification ${doc.verificationId}`}
      author="Countersure"
      subject="UK VAT verification"
      keywords="VAT verification, HMRC, audit trail, supplier verification"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.topBar} />
        <View style={styles.redRule} />
        <Text style={styles.brand}>§ COUNTERSURE</Text>
        <Text style={styles.brandRight}>UK SUPPLIER VERIFICATION</Text>

        <View style={styles.header}>
          <Text style={styles.sectionLabel}>§ VAT NUMBER VERIFICATION</Text>
          <Text style={styles.h1}>Verification certificate</Text>
          <Text style={styles.sub}>
            Issued by Countersure against the live HMRC VAT register on {checkedAtFormatted}.
          </Text>
        </View>

        <View style={styles.layout}>
          <View style={styles.body}>
            <View
              style={[
                styles.resultBox,
                ...(isFlagged ? [styles.resultBoxFlagged] : []),
                ...(!isVerified && !isFlagged ? [styles.resultBoxRejected] : []),
              ]}
            >
              <Text style={styles.metaLabel}>§ RESULT</Text>
              <Text
                style={[
                  styles.resultStatus,
                  ...(isFlagged ? [styles.resultStatusFlagged] : []),
                  ...(!isVerified && !isFlagged ? [styles.resultStatusRejected] : []),
                ]}
              >
                {doc.status.replace('_', ' ')}
              </Text>
            </View>

            <View style={styles.metaBlock}>
              <Text style={styles.metaLabel}>§ VAT NUMBER</Text>
              <Text style={styles.metaValue}>
                {doc.countryCode}
                {doc.vatNumber}
              </Text>
            </View>

            {doc.name ? (
              <View style={styles.metaBlock}>
                <Text style={styles.metaLabel}>§ REGISTERED NAME</Text>
                <Text style={styles.metaValue}>{doc.name}</Text>
              </View>
            ) : null}

            {doc.address ? (
              <View style={styles.metaBlock}>
                <Text style={styles.metaLabel}>§ REGISTERED ADDRESS</Text>
                {doc.address.line1 ? <Text style={styles.addressLine}>{doc.address.line1}</Text> : null}
                {doc.address.line2 ? <Text style={styles.addressLine}>{doc.address.line2}</Text> : null}
                {doc.address.line3 ? <Text style={styles.addressLine}>{doc.address.line3}</Text> : null}
                {doc.address.line4 ? <Text style={styles.addressLine}>{doc.address.line4}</Text> : null}
                {doc.address.postcode ? <Text style={styles.addressLine}>{doc.address.postcode}</Text> : null}
              </View>
            ) : null}
          </View>

          <View style={styles.stampWrap}>
            <StampSvg
              countryCode={doc.countryCode}
              number={doc.vatNumber}
              date={dateLabel}
            />
          </View>
        </View>

        <View style={styles.auditGrid}>
          <Text style={styles.sectionLabel}>§ AUDIT TRAIL</Text>
          <View style={{ height: 8 }} />
          <View style={styles.auditRow}>
            <Text style={styles.auditCellLabel}>VERIFICATION ID</Text>
            <Text style={styles.auditCellValue}>{doc.verificationId}</Text>
          </View>
          <View style={styles.auditRow}>
            <Text style={styles.auditCellLabel}>SOURCE</Text>
            <Text style={styles.auditCellValue}>{doc.source}</Text>
          </View>
          <View style={styles.auditRow}>
            <Text style={styles.auditCellLabel}>CHECKED AT</Text>
            <Text style={styles.auditCellValue}>{doc.checkedAt}</Text>
          </View>
          {doc.consultationNumber ? (
            <View style={styles.auditRow}>
              <Text style={styles.auditCellLabel}>CONSULTATION №</Text>
              <Text style={styles.auditCellValue}>{doc.consultationNumber}</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.footer}>
          <Text>countersure.com  ·  Know who you trade with</Text>
          <Text>{doc.verificationId}</Text>
        </View>
      </Page>
    </Document>
  );
}
