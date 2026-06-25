import type { Metadata } from 'next'
import OvertimeCalculator from './Calculator'

export const metadata: Metadata = {
  title: 'Overtime Calculator - Calculate OT Pay',
  description: 'Free overtime calculator computes pay at 1.5x or 2x rates. See weekly, monthly, and annual earnings including overtime hours.',
  alternates: {
    canonical: '/calculators/overtime',
  },
  openGraph: {
    title: 'Overtime Calculator - Calculate OT Pay',
    description: 'Free overtime calculator computes pay at 1.5x or 2x rates. See weekly, monthly, and annual earnings including overtime hours.',
    url: 'https://financecalculatoronline.pro/calculators/overtime',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Overtime Calculator - FinanceCalc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Overtime Calculator - Calculate OT Pay',
    description: 'Free overtime calculator computes pay at 1.5x or 2x rates. See weekly, monthly, and annual earnings including overtime hours.',
    images: ['/og-image.png'],
  },
}

const faqs = [
  {
    question: 'What is overtime pay?',
    answer: 'Overtime pay is additional compensation for hours worked beyond the standard 40-hour workweek. Under the Fair Labor Standards Act (FLSA), non-exempt employees must receive at least 1.5 times their regular rate for overtime hours.',
  },
  {
    question: 'When does overtime start?',
    answer: 'Overtime typically begins after 40 hours of work in a week. Some states (like California) also require overtime after 8 hours in a single day. Check your state labor laws for specific rules.',
  },
  {
    question: 'What is time and a half?',
    answer: 'Time and a half means 1.5 times your regular hourly rate. If you earn $25/hour, your overtime rate is $37.50/hour. Double time (2x) would be $50/hour.',
  },
  {
    question: 'Do salaried employees get overtime?',
    answer: 'Most salaried employees classified as "exempt" under FLSA do not receive overtime. However, salaried employees earning below a certain threshold ($684/week as of 2024) may be eligible for overtime pay.',
  },
]

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Overtime Calculator',
  url: 'https://financecalculatoronline.pro/calculators/overtime',
  description: 'Free overtime calculator computes pay at 1.5x or 2x rates.',
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

export default function OvertimePage() {
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
      <OvertimeCalculator />
    </>
  )
}
