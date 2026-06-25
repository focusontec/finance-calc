import type { Metadata } from 'next'
import SalaryCalculator from './Calculator'

export const metadata: Metadata = {
  title: 'Salary Calculator - Convert Pay Rates',
  description: 'Free salary calculator converts between hourly, weekly, monthly, and annual pay. See all equivalent pay rates instantly.',
  alternates: {
    canonical: '/calculators/salary',
  },
  openGraph: {
    title: 'Salary Calculator - Convert Pay Rates',
    description: 'Free salary calculator converts between hourly, weekly, monthly, and annual pay. See all equivalent pay rates instantly.',
    url: 'https://financecalculatoronline.pro/calculators/salary',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Salary Calculator - FinanceCalc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salary Calculator - Convert Pay Rates',
    description: 'Free salary calculator converts between hourly, weekly, monthly, and annual pay. See all equivalent pay rates instantly.',
    images: ['/og-image.png'],
  },
}

const faqs = [
  {
    question: 'How do I convert hourly wage to annual salary?',
    answer: 'Multiply your hourly rate by hours per week, then by weeks per year. For example: $25/hour × 40 hours × 52 weeks = $52,000/year. This calculator does the conversion for any pay frequency.',
  },
  {
    question: 'What is the difference between gross and net pay?',
    answer: 'Gross pay is your total earnings before deductions. Net pay (take-home pay) is after taxes, insurance, retirement contributions, and other deductions. Net pay is typically 65-80% of gross pay.',
  },
  {
    question: 'How many hours are in a full-time work year?',
    answer: 'Full-time is typically 40 hours/week × 52 weeks = 2,080 hours per year. Some employers use 2,000 hours (accounting for holidays) or other variations.',
  },
  {
    question: 'What is the difference between biweekly and semimonthly?',
    answer: 'Biweekly means every 2 weeks (26 paychecks/year). Semimonthly means twice a month (24 paychecks/year). Biweekly results in 2 extra paychecks per year but each check is slightly smaller.',
  },
]

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Salary Calculator',
  url: 'https://financecalculatoronline.pro/calculators/salary',
  description: 'Free salary calculator converts between different pay frequencies.',
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

export default function SalaryPage() {
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
      <SalaryCalculator />
    </>
  )
}
