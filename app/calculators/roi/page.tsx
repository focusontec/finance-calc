import type { Metadata } from 'next'
import ROICalculator from './Calculator'

export const metadata: Metadata = {
  title: 'ROI Calculator - Return on Investment',
  description: 'Free ROI calculator measures investment profitability. Calculate total return on investment and annualized returns for any venture.',
  alternates: {
    canonical: '/calculators/roi',
  },
  openGraph: {
    title: 'ROI Calculator - Return on Investment',
    description: 'Free ROI calculator measures investment profitability. Calculate total return on investment and annualized returns for any venture.',
    url: 'https://financecalculatoronline.pro/calculators/roi',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ROI Calculator - FinanceCalc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ROI Calculator - Return on Investment',
    description: 'Free ROI calculator measures investment profitability. Calculate total return on investment and annualized returns for any venture.',
    images: ['/og-image.png'],
  },
}

const faqs = [
  {
    question: 'What is ROI (Return on Investment)?',
    answer: 'ROI is a performance measure used to evaluate the efficiency of an investment. It is calculated as: ROI = (Net Profit / Cost of Investment) × 100. A positive ROI means the investment gained value; negative means it lost value.',
  },
  {
    question: 'What is a good ROI?',
    answer: 'A good ROI depends on the investment type and risk level. Stock market investments historically return 7-10% annually. Real estate typically returns 8-12%. Higher-risk investments should offer higher potential returns to compensate.',
  },
  {
    question: 'What is annualized ROI?',
    answer: 'Annualized ROI adjusts returns for the time period, allowing fair comparison between investments of different durations. For example, 20% ROI over 2 years is about 9.5% annualized, while 20% over 5 years is about 3.7% annualized.',
  },
  {
    question: 'What are the limitations of ROI?',
    answer: 'ROI does not account for time value of money, risk, or opportunity cost. A 50% ROI over 10 years may be worse than 20% over 2 years. Use annualized ROI and consider other metrics like IRR for comprehensive analysis.',
  },
]

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'ROI Calculator',
  url: 'https://financecalculatoronline.pro/calculators/roi',
  description: 'Free ROI calculator measures investment profitability.',
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

export default function ROIPage() {
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
      <ROICalculator />
    </>
  )
}
