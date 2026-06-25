import type { Metadata } from 'next'
import InflationCalculator from './Calculator'

export const metadata: Metadata = {
  title: 'Inflation Calculator - Purchasing Power Over Time',
  description: 'Free inflation calculator shows how prices change over time. Calculate the impact of inflation on purchasing power and see historical value equivalents.',
  alternates: {
    canonical: '/calculators/inflation',
  },
  openGraph: {
    title: 'Inflation Calculator - Purchasing Power Over Time',
    description: 'Free inflation calculator shows how prices change over time. Calculate the impact of inflation on purchasing power and see historical value equivalents.',
    url: 'https://financecalculatoronline.pro/calculators/inflation',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Inflation Calculator - FinanceCalc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inflation Calculator - Purchasing Power Over Time',
    description: 'Free inflation calculator shows how prices change over time. Calculate the impact of inflation on purchasing power and see historical value equivalents.',
    images: ['/og-image.png'],
  },
}

const faqs = [
  {
    question: 'What is inflation?',
    answer: 'Inflation is the rate at which the general level of prices for goods and services rises over time, causing purchasing power to fall. A 3% annual inflation rate means that something costing $100 today will cost about $103 next year.',
  },
  {
    question: 'How does inflation affect my savings?',
    answer: 'Inflation erodes the real value of money over time. If inflation is 3% per year, $100,000 in savings today will only have the purchasing power of about $74,000 in 10 years. This is why investing is important to outpace inflation.',
  },
  {
    question: 'What causes inflation?',
    answer: 'Inflation is caused by increased demand (demand-pull), rising production costs (cost-push), and increased money supply. Central banks manage inflation through monetary policy, primarily by adjusting interest rates.',
  },
  {
    question: 'What is the Rule of 72 for inflation?',
    answer: 'The Rule of 72 helps estimate how quickly inflation halves your purchasing power. Divide 72 by the inflation rate: at 3% inflation, your money loses half its value in about 24 years (72 ÷ 3 = 24).',
  },
]

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Inflation Calculator',
  url: 'https://financecalculatoronline.pro/calculators/inflation',
  description: 'Free inflation calculator shows the impact of inflation on purchasing power.',
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

export default function InflationPage() {
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
      <InflationCalculator />
    </>
  )
}
