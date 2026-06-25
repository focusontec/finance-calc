import type { Metadata } from 'next'
import RentVsBuyCalculator from './Calculator'

export const metadata: Metadata = {
  title: 'Rent vs Buy Calculator - Which is Better?',
  description: 'Free rent vs buy calculator compares total cost of renting vs buying a home over time. Make an informed decision with detailed financial analysis.',
  alternates: {
    canonical: '/calculators/rent-vs-buy',
  },
  openGraph: {
    title: 'Rent vs Buy Calculator - Which is Better?',
    description: 'Free rent vs buy calculator compares total cost of renting vs buying a home over time. Make an informed decision with detailed financial analysis.',
    url: 'https://financecalculatoronline.pro/calculators/rent-vs-buy',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rent vs Buy Calculator - FinanceCalc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rent vs Buy Calculator - Which is Better?',
    description: 'Free rent vs buy calculator compares total cost of renting vs buying a home over time. Make an informed decision with detailed financial analysis.',
    images: ['/og-image.png'],
  },
}

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Rent vs Buy Calculator',
  url: 'https://financecalculatoronline.pro/calculators/rent-vs-buy',
  description: 'Free rent vs buy calculator compares total cost of renting vs buying.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
}

export default function RentVsBuyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <RentVsBuyCalculator />
    </>
  )
}
