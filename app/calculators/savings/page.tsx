import type { Metadata } from 'next'
import SavingsCalculator from './Calculator'

export const metadata: Metadata = {
  title: 'Savings Calculator - Plan Your Savings Goals',
  description: 'Free savings calculator shows how your money grows with monthly deposits. Calculate time to reach your savings goal and total interest earned.',
  alternates: {
    canonical: '/calculators/savings',
  },
  openGraph: {
    title: 'Savings Calculator - Plan Your Savings Goals',
    description: 'Free savings calculator shows how your money grows with monthly deposits. Calculate time to reach your savings goal and total interest earned.',
    url: 'https://financecalculatoronline.pro/calculators/savings',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Savings Calculator - FinanceCalc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Savings Calculator - Plan Your Savings Goals',
    description: 'Free savings calculator shows how your money grows with monthly deposits. Calculate time to reach your savings goal and total interest earned.',
    images: ['/og-image.png'],
  },
}

const faqs = [
  {
    question: 'How do I calculate how long to reach my savings goal?',
    answer: 'The time depends on your current savings, monthly deposits, interest rate, and goal amount. This calculator determines exactly how many months it will take to reach your target, accounting for compound interest.',
  },
  {
    question: 'What is a good savings rate?',
    answer: 'Financial experts recommend saving 15-20% of your income. However, any amount is better than nothing. Start with what you can afford and increase over time. High-yield savings accounts offer 4-5% APY.',
  },
  {
    question: 'How does compound interest help savings?',
    answer: 'Compound interest means you earn interest on your interest. Each month, the interest earned is added to your balance, and future interest is calculated on the larger amount. This accelerates growth over time.',
  },
  {
    question: 'What is a high-yield savings account?',
    answer: 'High-yield savings accounts offer significantly higher interest rates than traditional savings accounts (4-5% vs 0.01-0.5%). They are typically offered by online banks with lower overhead costs.',
  },
]

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Savings Calculator',
  url: 'https://financecalculatoronline.pro/calculators/savings',
  description: 'Free savings calculator helps plan savings goals with monthly deposits.',
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

export default function SavingsPage() {
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
      <SavingsCalculator />
    </>
  )
}
