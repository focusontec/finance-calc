import type { Metadata } from 'next'
import MortgagePayoffCalculator from './Calculator'

export const metadata: Metadata = {
  title: 'Mortgage Payoff Calculator - Save on Interest',
  description: 'Free mortgage payoff calculator shows how extra payments save interest and shorten your loan. See years saved and total interest reduction.',
  alternates: {
    canonical: '/calculators/mortgage-payoff',
  },
  openGraph: {
    title: 'Mortgage Payoff Calculator - Save on Interest',
    description: 'Free mortgage payoff calculator shows how extra payments save interest and shorten your loan. See years saved and total interest reduction.',
    url: 'https://financecalculatoronline.pro/calculators/mortgage-payoff',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mortgage Payoff Calculator - FinanceCalc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mortgage Payoff Calculator - Save on Interest',
    description: 'Free mortgage payoff calculator shows how extra payments save interest and shorten your loan. See years saved and total interest reduction.',
    images: ['/og-image.png'],
  },
}

const faqs = [
  {
    question: 'How do extra mortgage payments work?',
    answer: 'Extra payments go directly toward your principal balance. Since interest is calculated on the remaining balance, reducing it faster means less interest accrues over the life of the loan, potentially saving tens of thousands of dollars.',
  },
  {
    question: 'Is it better to make extra payments or invest?',
    answer: 'If your mortgage rate is lower than expected investment returns (e.g., 6.5% mortgage vs 8-10% market returns), investing may be mathematically better. However, extra mortgage payments provide guaranteed savings and peace of mind.',
  },
  {
    question: 'How much can I save with extra payments?',
    answer: 'Even $200 extra per month on a $250,000 mortgage at 6.5% can save over $80,000 in interest and pay off the loan 7+ years early. The savings depend on your balance, rate, and extra payment amount.',
  },
  {
    question: 'Should I refinance instead of making extra payments?',
    answer: 'Refinancing can lower your rate, but comes with closing costs (typically 2-5% of loan balance). Extra payments have no cost and provide immediate savings. Compare both options using our calculators.',
  },
]

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Mortgage Payoff Calculator',
  url: 'https://financecalculatoronline.pro/calculators/mortgage-payoff',
  description: 'Free mortgage payoff calculator shows savings from extra payments.',
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

export default function MortgagePayoffPage() {
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
      <MortgagePayoffCalculator />
    </>
  )
}
