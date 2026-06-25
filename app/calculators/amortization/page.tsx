import type { Metadata } from 'next'
import AmortizationCalculator from './Calculator'

export const metadata: Metadata = {
  title: 'Amortization Calculator - View Loan Payment Schedule',
  description: 'Free amortization calculator shows your full loan payment schedule. See how each payment splits between principal and interest over the life of your loan.',
  alternates: {
    canonical: '/calculators/amortization',
  },
  openGraph: {
    title: 'Amortization Calculator - View Loan Payment Schedule',
    description: 'Free amortization calculator shows your full loan payment schedule. See how each payment splits between principal and interest over the life of your loan.',
    url: 'https://financecalculatoronline.pro/calculators/amortization',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Amortization Calculator - FinanceCalc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amortization Calculator - View Loan Payment Schedule',
    description: 'Free amortization calculator shows your full loan payment schedule. See how each payment splits between principal and interest over the life of your loan.',
    images: ['/og-image.png'],
  },
}

const faqs = [
  {
    question: 'What is an amortization schedule?',
    answer: 'An amortization schedule is a table showing each periodic payment on a loan over time. It breaks down how much of each payment goes toward principal and interest, and shows the remaining balance after each payment.',
  },
  {
    question: 'How is amortization calculated?',
    answer: 'Amortization uses the formula M = P × [r(1+r)^n] / [(1+r)^n - 1], where P is the loan amount, r is the monthly interest rate, and n is the total number of payments. Each payment is the same amount, but the split between principal and interest changes over time.',
  },
  {
    question: 'Why do early payments have more interest?',
    answer: 'In the early years of a loan, the outstanding balance is largest, so the interest portion of each payment is higher. As you pay down the principal, less interest accrues each month, and more of your payment goes toward reducing the balance.',
  },
  {
    question: 'Can I pay off my loan faster with extra payments?',
    answer: 'Yes, making extra principal payments reduces your balance faster, which means less interest accrues. This can significantly shorten your loan term and save thousands in interest. Use our Mortgage Payoff Calculator to see the impact.',
  },
]

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Amortization Calculator',
  url: 'https://financecalculatoronline.pro/calculators/amortization',
  description: 'Free amortization calculator shows your full loan payment schedule with principal and interest breakdown.',
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

export default function AmortizationPage() {
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
      <AmortizationCalculator />
    </>
  )
}
