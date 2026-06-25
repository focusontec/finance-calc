import type { Metadata } from 'next'
import LoanCalculator from './Calculator'

export const metadata: Metadata = {
  title: 'Loan Calculator - Monthly Payment & Amortization',
  description: 'Free loan calculator shows monthly payments, total interest, and amortization schedule. Supports extra payments to see how much you can save.',
  alternates: {
    canonical: '/calculators/loan',
  },
  openGraph: {
    title: 'Loan Calculator - Monthly Payment & Amortization',
    description: 'Free loan calculator shows monthly payments, total interest, and amortization schedule. Supports extra payments to see how much you can save.',
    url: 'https://financecalculatoronline.pro/calculators/loan',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Loan Calculator - FinanceCalc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loan Calculator - Monthly Payment & Amortization',
    description: 'Free loan calculator shows monthly payments, total interest, and amortization schedule. Supports extra payments to see how much you can save.',
    images: ['/og-image.png'],
  },
}

const faqs = [
  {
    question: 'How is a loan payment calculated?',
    answer: 'Loan payments are calculated using the formula M = P × [r(1+r)^n] / [(1+r)^n - 1], where P is the loan amount, r is the monthly interest rate, and n is the number of payments. This ensures equal payments throughout the loan term.',
  },
  {
    question: 'How do extra payments affect my loan?',
    answer: 'Extra payments go directly toward reducing your principal balance. This means less interest accrues, potentially saving you thousands and shortening your loan term. Even $50-100 extra per month can make a significant difference.',
  },
  {
    question: 'What is the difference between interest rate and APR?',
    answer: 'The interest rate is the cost of borrowing the principal. APR (Annual Percentage Rate) includes the interest rate plus other loan costs like origination fees and closing costs, giving you the true cost of the loan.',
  },
  {
    question: 'Should I choose a shorter or longer loan term?',
    answer: 'Shorter terms (3-5 years) have higher monthly payments but lower total interest. Longer terms (7-10 years) lower monthly payments but increase total cost. Choose based on your monthly budget and how quickly you want to be debt-free.',
  },
]

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Loan Calculator',
  url: 'https://financecalculatoronline.pro/calculators/loan',
  description: 'Free loan calculator with amortization schedule and extra payment support.',
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

export default function LoanPage() {
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
      <LoanCalculator />
    </>
  )
}
