import type { Metadata } from 'next'
import AutoLoanCalculator from './Calculator'

export const metadata: Metadata = {
  title: 'Auto Loan Calculator - Calculate Car Payment',
  description: 'Free auto loan calculator with trade-in and sales tax. Calculate your monthly car payment, total interest, and see the full cost breakdown.',
  alternates: {
    canonical: '/calculators/auto-loan',
  },
  openGraph: {
    title: 'Auto Loan Calculator - Calculate Car Payment',
    description: 'Free auto loan calculator with trade-in and sales tax. Calculate your monthly car payment, total interest, and see the full cost breakdown.',
    url: 'https://financecalculatoronline.pro/calculators/auto-loan',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Auto Loan Calculator - FinanceCalc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auto Loan Calculator - Calculate Car Payment',
    description: 'Free auto loan calculator with trade-in and sales tax. Calculate your monthly car payment, total interest, and see the full cost breakdown.',
    images: ['/og-image.png'],
  },
}

const faqs = [
  {
    question: 'How is my auto loan payment calculated?',
    answer: 'Your monthly payment is calculated using the loan amount (vehicle price + tax - down payment - trade-in), interest rate, and loan term. The formula is M = P × [r(1+r)^n] / [(1+r)^n - 1].',
  },
  {
    question: 'Should I include sales tax in my auto loan?',
    answer: 'In most states, sales tax is due at purchase. You can pay it upfront or roll it into your loan. Rolling it in increases your loan amount and total interest paid, but reduces your upfront cost.',
  },
  {
    question: 'What is a good interest rate for an auto loan?',
    answer: 'Auto loan rates vary based on credit score, loan term, and whether the car is new or used. As of 2024, excellent credit (750+) may qualify for 4-6% APR, while subprime borrowers may see 10%+ rates.',
  },
  {
    question: 'Is a longer auto loan term better?',
    answer: 'Longer terms (72-84 months) lower your monthly payment but increase total interest paid. Shorter terms (36-48 months) have higher payments but save money overall. Aim for the shortest term you can comfortably afford.',
  },
]

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Auto Loan Calculator',
  url: 'https://financecalculatoronline.pro/calculators/auto-loan',
  description: 'Free auto loan calculator with trade-in and sales tax. Calculate your monthly car payment and total cost.',
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

export default function AutoLoanPage() {
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
      <AutoLoanCalculator />
    </>
  )
}
