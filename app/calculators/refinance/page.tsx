import type { Metadata } from 'next'
import RefinanceCalculator from './Calculator'

export const metadata: Metadata = {
  title: 'Refinance Calculator - Should You Refinance?',
  description: 'Free refinance calculator compares your current mortgage with a new one. Calculate monthly savings, break-even point, and total savings.',
  alternates: {
    canonical: '/calculators/refinance',
  },
  openGraph: {
    title: 'Refinance Calculator - Should You Refinance?',
    description: 'Free refinance calculator compares your current mortgage with a new one. Calculate monthly savings, break-even point, and total savings.',
    url: 'https://financecalculatoronline.pro/calculators/refinance',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Refinance Calculator - FinanceCalc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Refinance Calculator - Should You Refinance?',
    description: 'Free refinance calculator compares your current mortgage with a new one. Calculate monthly savings, break-even point, and total savings.',
    images: ['/og-image.png'],
  },
}

const faqs = [
  {
    question: 'When should I refinance my mortgage?',
    answer: 'Consider refinancing when rates are at least 0.75-1% lower than your current rate, you plan to stay in the home long enough to recoup closing costs, and your credit score qualifies for the best rates.',
  },
  {
    question: 'What are typical refinancing closing costs?',
    answer: 'Closing costs for refinancing typically range from 2-5% of the loan amount. For a $250,000 loan, that is $5,000-$12,500. These can include appraisal fees, title insurance, origination fees, and other charges.',
  },
  {
    question: 'How long does it take to break even on a refinance?',
    answer: 'Break-even time is calculated by dividing closing costs by monthly savings. For example, $5,000 in costs with $200/month savings takes 25 months to break even. If you plan to stay longer, refinancing makes sense.',
  },
  {
    question: 'Should I refinance to a shorter term?',
    answer: 'Refinancing from a 30-year to a 15-year mortgage increases monthly payments but dramatically reduces total interest paid. This is a good option if you can afford the higher payment and want to build equity faster.',
  },
]

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Refinance Calculator',
  url: 'https://financecalculatoronline.pro/calculators/refinance',
  description: 'Free refinance calculator compares current and new mortgage options.',
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

export default function RefinancePage() {
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
      <RefinanceCalculator />
    </>
  )
}
