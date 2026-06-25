import type { Metadata } from 'next'
import HourlyToSalaryCalculator from './Calculator'

export const metadata: Metadata = {
  title: 'Hourly to Salary Calculator - Wage Converter',
  description: 'Free hourly to salary calculator converts your hourly wage to annual, monthly, weekly, and daily pay. Accounts for hours and vacation time.',
  alternates: {
    canonical: '/calculators/hourly-to-salary',
  },
  openGraph: {
    title: 'Hourly to Salary Calculator - Wage Converter',
    description: 'Free hourly to salary calculator converts your hourly wage to annual, monthly, weekly, and daily pay. Accounts for hours and vacation time.',
    url: 'https://financecalculatoronline.pro/calculators/hourly-to-salary',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Hourly to Salary Calculator - FinanceCalc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hourly to Salary Calculator - Wage Converter',
    description: 'Free hourly to salary calculator converts your hourly wage to annual, monthly, weekly, and daily pay. Accounts for hours and vacation time.',
    images: ['/og-image.png'],
  },
}

const faqs = [
  {
    question: 'How do I convert hourly wage to annual salary?',
    answer: 'Multiply your hourly rate by hours per week, then by working weeks per year. For example: $25/hour × 40 hours × 50 weeks = $50,000/year. Account for unpaid vacation by subtracting vacation weeks.',
  },
  {
    question: 'How many hours is a full-time salary based on?',
    answer: 'Full-time employment is typically 40 hours per week, 52 weeks per year (2,080 hours annually). However, salaried positions may require more or fewer hours depending on the employer.',
  },
  {
    question: 'What is the difference between gross and net pay?',
    answer: 'Gross pay is your total earnings before deductions. Net pay (take-home pay) is after taxes, insurance, retirement contributions, and other deductions. Net pay is typically 65-80% of gross pay.',
  },
  {
    question: 'How does unpaid vacation affect my annual salary?',
    answer: 'Unpaid vacation weeks reduce your annual earnings. If you take 2 unpaid weeks, you lose 2 weeks of pay. For a $25/hour worker at 40 hours/week, that is $2,000 less per year.',
  },
]

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Hourly to Salary Calculator',
  url: 'https://financecalculatoronline.pro/calculators/hourly-to-salary',
  description: 'Free hourly to salary calculator converts hourly wages to annual salary.',
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

export default function HourlyToSalaryPage() {
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
      <HourlyToSalaryCalculator />
    </>
  )
}
