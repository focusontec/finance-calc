import type { Metadata } from 'next'
import DebtPayoffCalculator from './Calculator'

export const metadata: Metadata = {
  title: 'Debt Payoff Calculator - Snowball vs Avalanche',
  description: 'Free debt payoff calculator compares snowball and avalanche methods. Create a plan to become debt-free faster and save on interest.',
  alternates: {
    canonical: '/calculators/debt-payoff',
  },
  openGraph: {
    title: 'Debt Payoff Calculator - Snowball vs Avalanche',
    description: 'Free debt payoff calculator compares snowball and avalanche methods. Create a plan to become debt-free faster and save on interest.',
    url: 'https://financecalculatoronline.pro/calculators/debt-payoff',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Debt Payoff Calculator - FinanceCalc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Debt Payoff Calculator - Snowball vs Avalanche',
    description: 'Free debt payoff calculator compares snowball and avalanche methods. Create a plan to become debt-free faster and save on interest.',
    images: ['/og-image.png'],
  },
}

const faqs = [
  {
    question: 'What is the debt avalanche method?',
    answer: 'The debt avalanche method prioritizes paying off debts with the highest interest rates first while making minimum payments on all other debts. This method saves the most money in total interest paid over time.',
  },
  {
    question: 'What is the debt snowball method?',
    answer: 'The debt snowball method focuses on paying off the smallest balances first, regardless of interest rate. This provides quick psychological wins that can help maintain motivation, though it may cost more in total interest.',
  },
  {
    question: 'Which is better: snowball or avalanche?',
    answer: 'The avalanche method saves more money mathematically. However, the snowball method has a higher success rate because quick wins provide motivation. Choose the method that you will stick with consistently.',
  },
  {
    question: 'Should I consolidate my debt?',
    answer: 'Debt consolidation can simplify payments and potentially lower your interest rate. It works best when you can secure a lower rate than your average current rate and commit to not accumulating new debt.',
  },
]

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Debt Payoff Calculator',
  url: 'https://financecalculatoronline.pro/calculators/debt-payoff',
  description: 'Free debt payoff calculator compares snowball and avalanche methods.',
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

export default function DebtPayoffPage() {
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
      <DebtPayoffCalculator />
    </>
  )
}
