import type { Metadata } from 'next'
import CompoundInterestCalculator from './Calculator'

export const metadata: Metadata = {
  title: 'Compound Interest Calculator - See Your Money Grow',
  description: 'Free compound interest calculator shows how your savings grow over time. Calculate future value with monthly contributions and different compounding frequencies.',
  alternates: {
    canonical: '/calculators/compound-interest',
  },
  openGraph: {
    title: 'Compound Interest Calculator - See Your Money Grow',
    description: 'Free compound interest calculator shows how your savings grow over time. Calculate future value with monthly contributions and different compounding frequencies.',
    url: 'https://financecalculatoronline.pro/calculators/compound-interest',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Compound Interest Calculator - FinanceCalc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compound Interest Calculator - See Your Money Grow',
    description: 'Free compound interest calculator shows how your savings grow over time. Calculate future value with monthly contributions and different compounding frequencies.',
    images: ['/og-image.png'],
  },
}

const faqs = [
  {
    question: 'What is compound interest?',
    answer: 'Compound interest is interest earned on both your initial deposit and the interest that has already accumulated. Unlike simple interest, which is only calculated on the principal, compound interest grows exponentially over time.',
  },
  {
    question: 'How does compound interest work?',
    answer: 'Each time interest compounds (daily, monthly, quarterly, or annually), the earned interest is added to your balance. The next interest calculation is based on this new, larger balance. The more frequently interest compounds, the more you earn.',
  },
  {
    question: 'What is the Rule of 72?',
    answer: 'The Rule of 72 is a quick way to estimate how long it takes to double your money. Divide 72 by your annual interest rate. For example, at 7% interest, your money doubles in approximately 10.3 years (72 ÷ 7 = 10.3).',
  },
  {
    question: 'How do monthly contributions affect compound interest?',
    answer: 'Regular monthly contributions dramatically boost your returns through dollar-cost averaging and a larger base for compounding. Even small monthly additions can result in significantly more wealth over decades compared to a one-time deposit.',
  },
]

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Compound Interest Calculator',
  url: 'https://financecalculatoronline.pro/calculators/compound-interest',
  description: 'Free compound interest calculator shows how your savings grow over time with compounding.',
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

export default function CompoundInterestPage() {
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
      <CompoundInterestCalculator />
    </>
  )
}
