import type { Metadata } from 'next'
import CurrencyConverter from './Calculator'

export const metadata: Metadata = {
  title: 'Currency Converter - Convert World Currencies',
  description: 'Free currency converter converts between USD, EUR, GBP, JPY, and more. See exchange rates and calculate equivalent amounts instantly.',
  alternates: {
    canonical: '/calculators/currency-converter',
  },
  openGraph: {
    title: 'Currency Converter - Convert World Currencies',
    description: 'Free currency converter converts between USD, EUR, GBP, JPY, and more. See exchange rates and calculate equivalent amounts instantly.',
    url: 'https://financecalculatoronline.pro/calculators/currency-converter',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Currency Converter - FinanceCalc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Currency Converter - Convert World Currencies',
    description: 'Free currency converter converts between USD, EUR, GBP, JPY, and more. See exchange rates and calculate equivalent amounts instantly.',
    images: ['/og-image.png'],
  },
}

const faqs = [
  {
    question: 'How do exchange rates work?',
    answer: 'Exchange rates represent the value of one currency relative to another. They fluctuate based on economic factors like inflation, interest rates, trade balance, and market sentiment. A higher rate means one unit of the base currency buys more of the target currency.',
  },
  {
    question: 'What is the difference between buy and sell rates?',
    answer: 'Banks and exchange services offer two rates: the buy rate (what they pay you for foreign currency) and the sell rate (what they charge you). The difference is the spread, which is how they make money. Always compare rates before exchanging.',
  },
  {
    question: 'Why do exchange rates change?',
    answer: 'Exchange rates change due to supply and demand in the foreign exchange market. Factors include economic indicators, political stability, interest rate differences between countries, and market speculation.',
  },
  {
    question: 'What is the best way to exchange currency?',
    answer: 'For the best rates, use a bank or online exchange service rather than airport kiosks. Credit cards with no foreign transaction fees are convenient for travel. Always check the mid-market rate as a benchmark.',
  },
]

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Currency Converter',
  url: 'https://financecalculatoronline.pro/calculators/currency-converter',
  description: 'Free currency converter converts between major world currencies.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

export default function CurrencyConverterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CurrencyConverter />
    </>
  )
}
