import type { Metadata } from 'next'
import MortgageCalculator from './Calculator'

export const metadata: Metadata = {
  title: 'Mortgage Calculator - Monthly Payment & Amortization',
  description: 'Free mortgage calculator with taxes, insurance, and PMI. Calculate monthly payments, total interest, and see full amortization schedules.',
  alternates: {
    canonical: '/calculators/mortgage',
  },
  openGraph: {
    title: 'Mortgage Calculator - Monthly Payment & Amortization',
    description: 'Free mortgage calculator with taxes, insurance, and PMI. Calculate monthly payments, total interest, and see full amortization schedules.',
    url: 'https://financecalculatoronline.pro/calculators/mortgage',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mortgage Calculator - FinanceCalc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mortgage Calculator - Monthly Payment & Amortization',
    description: 'Free mortgage calculator with taxes, insurance, and PMI. Calculate monthly payments, total interest, and see full amortization schedules.',
    images: ['/og-image.png'],
  },
}

const faqs = [
  {
    question: 'How much house can I afford?',
    answer: 'Most lenders use the 28/36 rule: your mortgage payment should not exceed 28% of gross monthly income, and total debt payments should not exceed 36%. For a $100,000 salary, that means a maximum of about $2,333/month for housing.',
  },
  {
    question: 'What is PMI and when do I need it?',
    answer: 'Private Mortgage Insurance (PMI) is required when your down payment is less than 20% of the home value. PMI protects the lender if you default. It typically costs 0.5-1% of the loan amount annually and can be removed once you reach 20% equity.',
  },
  {
    question: 'What is included in a monthly mortgage payment?',
    answer: 'A typical mortgage payment includes Principal, Interest, Taxes, and Insurance (PITI). Principal reduces your loan balance, interest is the borrowing cost, taxes are property taxes, and insurance covers homeowner\'s insurance and possibly PMI.',
  },
  {
    question: 'Should I choose a 15-year or 30-year mortgage?',
    answer: 'A 15-year mortgage has higher monthly payments but significantly less total interest paid. A 30-year mortgage has lower monthly payments but costs more over time. Choose based on your budget and financial goals.',
  },
]

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Mortgage Calculator',
  url: 'https://financecalculatoronline.pro/calculators/mortgage',
  description: 'Free mortgage calculator with taxes, insurance, and PMI.',
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

export default function MortgagePage() {
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
      <MortgageCalculator />
    </>
  )
}
