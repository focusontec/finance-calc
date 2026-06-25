import type { Metadata } from 'next'
import CreditCardPayoffCalculator from './Calculator'

export const metadata: Metadata = {
  title: 'Credit Card Payoff Calculator - Get Out of Debt',
  description: 'Free credit card payoff calculator shows how long to pay off your balance. Compare minimum vs fixed payments and see total interest savings.',
  alternates: {
    canonical: '/calculators/credit-card-payoff',
  },
  openGraph: {
    title: 'Credit Card Payoff Calculator - Get Out of Debt',
    description: 'Free credit card payoff calculator shows how long to pay off your balance. Compare minimum vs fixed payments and see total interest savings.',
    url: 'https://financecalculatoronline.pro/calculators/credit-card-payoff',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Credit Card Payoff Calculator - FinanceCalc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Credit Card Payoff Calculator - Get Out of Debt',
    description: 'Free credit card payoff calculator shows how long to pay off your balance. Compare minimum vs fixed payments and see total interest savings.',
    images: ['/og-image.png'],
  },
}

const faqs = [
  {
    question: 'How long will it take to pay off my credit card?',
    answer: 'The time depends on your balance, APR, and monthly payment. A $5,000 balance at 22% APR with $200/month payments takes about 2.5 years. Paying only the minimum (2% of balance) could take over 20 years.',
  },
  {
    question: 'Should I pay more than the minimum payment?',
    answer: 'Yes, always pay more than the minimum if possible. Minimum payments are designed to maximize interest revenue for the card issuer. Even small increases in your monthly payment can dramatically reduce your payoff time and total interest.',
  },
  {
    question: 'What is a good strategy for paying off credit card debt?',
    answer: 'The two most popular methods are the Avalanche (pay highest interest rate first) and Snowball (pay smallest balance first). The Avalanche saves the most money, while the Snowball provides quick wins for motivation.',
  },
  {
    question: 'How does credit card interest work?',
    answer: 'Credit card interest is calculated daily based on your average daily balance. Your APR is divided by 365 to get the daily rate. If you pay your full balance by the due date, you pay no interest (grace period).',
  },
]

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Credit Card Payoff Calculator',
  url: 'https://financecalculatoronline.pro/calculators/credit-card-payoff',
  description: 'Free credit card payoff calculator shows how long to pay off your balance and total interest.',
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

export default function CreditCardPayoffPage() {
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
      <CreditCardPayoffCalculator />
    </>
  )
}
