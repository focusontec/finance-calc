import type { Metadata } from 'next'
import NetWorthCalculator from './Calculator'

export const metadata: Metadata = {
  title: 'Net Worth Calculator - Track Your Wealth',
  description: 'Free net worth calculator helps you track assets and liabilities. Calculate your total net worth and debt-to-asset ratio instantly.',
  alternates: {
    canonical: '/calculators/net-worth',
  },
  openGraph: {
    title: 'Net Worth Calculator - Track Your Wealth',
    description: 'Free net worth calculator helps you track assets and liabilities. Calculate your total net worth and debt-to-asset ratio instantly.',
    url: 'https://financecalculatoronline.pro/calculators/net-worth',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Net Worth Calculator - FinanceCalc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Net Worth Calculator - Track Your Wealth',
    description: 'Free net worth calculator helps you track assets and liabilities. Calculate your total net worth and debt-to-asset ratio instantly.',
    images: ['/og-image.png'],
  },
}

const faqs = [
  {
    question: 'What is net worth?',
    answer: 'Net worth is the total value of everything you own (assets) minus everything you owe (liabilities). It is a snapshot of your financial health at a specific point in time. A positive net worth means you own more than you owe.',
  },
  {
    question: 'How do I calculate my net worth?',
    answer: 'Add up all your assets (cash, investments, property values, vehicles) and subtract all your liabilities (mortgage, loans, credit card debt). The result is your net worth. This calculator does the math for you.',
  },
  {
    question: 'What is a good net worth by age?',
    answer: 'A common guideline is to have your age multiplied by your gross income divided by 10 in net worth. For example, a 35-year-old earning $80,000 should aim for $280,000 in net worth. However, individual circumstances vary greatly.',
  },
  {
    question: 'What is the debt-to-asset ratio?',
    answer: 'The debt-to-asset ratio shows what percentage of your assets is financed by debt. A ratio below 50% is generally considered healthy. Lower is better, as it means you own more of your assets outright.',
  },
]

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Net Worth Calculator',
  url: 'https://financecalculatoronline.pro/calculators/net-worth',
  description: 'Free net worth calculator helps track assets and liabilities.',
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

export default function NetWorthPage() {
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
      <NetWorthCalculator />
    </>
  )
}
