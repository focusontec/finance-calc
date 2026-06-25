import type { Metadata } from 'next'
import PayRaiseCalculator from './Calculator'

export const metadata: Metadata = {
  title: 'Pay Raise Calculator - See Your New Salary',
  description: 'Free pay raise calculator shows your new salary after a raise. See annual, monthly, and weekly increases from percentage or dollar raises.',
  alternates: {
    canonical: '/calculators/pay-raise',
  },
  openGraph: {
    title: 'Pay Raise Calculator - See Your New Salary',
    description: 'Free pay raise calculator shows your new salary after a raise. See annual, monthly, and weekly increases from percentage or dollar raises.',
    url: 'https://financecalculatoronline.pro/calculators/pay-raise',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Pay Raise Calculator - FinanceCalc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pay Raise Calculator - See Your New Salary',
    description: 'Free pay raise calculator shows your new salary after a raise. See annual, monthly, and weekly increases from percentage or dollar raises.',
    images: ['/og-image.png'],
  },
}

const faqs = [
  {
    question: 'What is a typical annual raise?',
    answer: 'The average annual raise in the US is 3-5%, though this varies by industry, performance, and economic conditions. Cost-of-living adjustments are typically 2-3%, while merit-based raises can be higher.',
  },
  {
    question: 'How do I negotiate a raise?',
    answer: 'Research market rates for your position, document your achievements and contributions, time your request well (after successful projects or during reviews), and be prepared to discuss specific numbers. Practice your pitch beforehand.',
  },
  {
    question: 'Should I ask for a percentage or dollar amount?',
    answer: 'For smaller raises (under $5,000), a percentage is often easier for managers to approve. For larger raises or promotions, a specific dollar amount tied to market data can be more effective. Know your market value.',
  },
  {
    question: 'How does a raise affect my taxes?',
    answer: 'A raise increases your taxable income. If it pushes you into a higher tax bracket, only the income above the bracket threshold is taxed at the higher rate. Use our salary calculator to estimate your take-home pay.',
  },
]

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Pay Raise Calculator',
  url: 'https://financecalculatoronline.pro/calculators/pay-raise',
  description: 'Free pay raise calculator shows new salary after a raise.',
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

export default function PayRaisePage() {
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
      <PayRaiseCalculator />
    </>
  )
}
