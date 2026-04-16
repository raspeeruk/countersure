import type { Metadata } from 'next';
import Script from 'next/script';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const GA4_ID = 'G-B611ZYPXKL';

export const metadata: Metadata = {
  metadataBase: new URL('https://countersure.com'),
  title: {
    default: 'Countersure — Know who you trade with',
    template: '%s · Countersure',
  },
  description:
    'UK supplier verification. Check VAT numbers, EORI numbers, and Companies House records. Audit-ready PDFs for compliance teams.',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://countersure.com',
    siteName: 'Countersure',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA4_ID}');`}
        </Script>
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
