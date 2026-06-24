import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://financecalculatoronline.pro'),
  title: {
    default: 'Free Financial Calculators - FinanceCalc',
    template: '%s - FinanceCalc',
  },
  description: 'Free online financial calculators for mortgages, loans, investments, and retirement. Easy-to-use tools for smarter financial decisions.',
  keywords: ['financial calculator', 'mortgage calculator', 'loan calculator', 'investment calculator', 'retirement calculator', 'tax calculator'],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'FinanceCalc',
    url: 'https://financecalculatoronline.pro',
    title: 'Free Financial Calculators - FinanceCalc',
    description: 'Free online financial calculators for mortgages, loans, investments, and retirement. Easy-to-use tools for smarter financial decisions.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FinanceCalc - Free Financial Calculators',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Financial Calculators - FinanceCalc',
    description: 'Free online financial calculators for mortgages, loans, investments, and retirement. Easy-to-use tools for smarter financial decisions.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Analytics />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
