import type { Metadata } from 'next'
import RetirementCalculator from './Calculator'

export const metadata: Metadata = {
  title: 'Retirement Calculator - When Can I Retire (FIRE)',
  description: 'Free retirement calculator shows when you can achieve financial independence and retire early (FIRE). Calculate your FIRE number and timeline.',
  alternates: {
    canonical: '/calculators/retirement',
  },
  openGraph: {
    title: 'Retirement Calculator - When Can I Retire (FIRE)',
    description: 'Free retirement calculator shows when you can achieve financial independence and retire early (FIRE). Calculate your FIRE number and timeline.',
    url: 'https://financecalculatoronline.pro/calculators/retirement',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Retirement Calculator - FinanceCalc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Retirement Calculator - When Can I Retire (FIRE)',
    description: 'Free retirement calculator shows when you can achieve financial independence and retire early (FIRE). Calculate your FIRE number and timeline.',
    images: ['/og-image.png'],
  },
}

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Retirement Calculator',
  url: 'https://financecalculatoronline.pro/calculators/retirement',
  description: 'Free retirement calculator shows when you can achieve financial independence.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
}

export default function RetirementPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <RetirementCalculator />
    </>
  )
}
