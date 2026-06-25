import type { Metadata } from 'next'
import HouseAffordabilityCalculator from './Calculator'

export const metadata: Metadata = {
  title: 'House Affordability Calculator - How Much Can I Afford',
  description: 'Free house affordability calculator shows how much home you can afford based on income, debts, and down payment. Get pre-qualified estimates instantly.',
  alternates: {
    canonical: '/calculators/house-affordability',
  },
  openGraph: {
    title: 'House Affordability Calculator - How Much Can I Afford',
    description: 'Free house affordability calculator shows how much home you can afford based on income, debts, and down payment. Get pre-qualified estimates instantly.',
    url: 'https://financecalculatoronline.pro/calculators/house-affordability',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'House Affordability Calculator - FinanceCalc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'House Affordability Calculator - How Much Can I Afford',
    description: 'Free house affordability calculator shows how much home you can afford based on income, debts, and down payment. Get pre-qualified estimates instantly.',
    images: ['/og-image.png'],
  },
}

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'House Affordability Calculator',
  url: 'https://financecalculatoronline.pro/calculators/house-affordability',
  description: 'Free house affordability calculator shows how much home you can afford.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
}

export default function HouseAffordabilityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <HouseAffordabilityCalculator />
    </>
  )
}
