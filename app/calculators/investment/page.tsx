import type { Metadata } from 'next'
import InvestmentCalculator from './Calculator'

export const metadata: Metadata = {
  title: 'Investment Calculator - Project Portfolio Growth',
  description: 'Free investment calculator projects your portfolio growth with contributions. See nominal and inflation-adjusted returns over time.',
  alternates: {
    canonical: '/calculators/investment',
  },
  openGraph: {
    title: 'Investment Calculator - Project Portfolio Growth',
    description: 'Free investment calculator projects your portfolio growth with contributions. See nominal and inflation-adjusted returns over time.',
    url: 'https://financecalculatoronline.pro/calculators/investment',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Investment Calculator - FinanceCalc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Investment Calculator - Project Portfolio Growth',
    description: 'Free investment calculator projects your portfolio growth with contributions. See nominal and inflation-adjusted returns over time.',
    images: ['/og-image.png'],
  },
}

const faqs = [
  {
    question: 'How do I calculate investment returns?',
    answer: 'Investment returns depend on your initial amount, regular contributions, expected return rate, and time period. The formula accounts for compound growth: your money earns returns, and those returns earn more returns over time.',
  },
  {
    question: 'What is a realistic rate of return?',
    answer: 'Historically, the S&P 500 has returned about 10% annually before inflation (7% after inflation). Bond funds typically return 3-5%. A diversified portfolio might expect 6-8% long-term returns.',
  },
  {
    question: 'What is the difference between nominal and real returns?',
    answer: 'Nominal returns are the stated percentage gains. Real returns adjust for inflation, showing your actual purchasing power increase. If your investment returns 8% and inflation is 3%, your real return is about 5%.',
  },
  {
    question: 'How important are regular contributions?',
    answer: 'Regular contributions dramatically boost your final balance through dollar-cost averaging and compound growth. Even small monthly additions can result in significantly more wealth over decades compared to a one-time investment.',
  },
]

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Investment Calculator',
  url: 'https://financecalculatoronline.pro/calculators/investment',
  description: 'Free investment calculator projects portfolio growth with regular contributions.',
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

export default function InvestmentPage() {
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
      <InvestmentCalculator />
    </>
  )
}
