import type { Metadata } from 'next'
import CDCalculator from './Calculator'

export const metadata: Metadata = {
  title: 'CD Calculator - Certificate of Deposit Earnings',
  description: 'Free CD calculator shows your certificate of deposit earnings. Calculate maturity value, interest earned, and APY with different compounding frequencies.',
  alternates: {
    canonical: '/calculators/cd',
  },
  openGraph: {
    title: 'CD Calculator - Certificate of Deposit Earnings',
    description: 'Free CD calculator shows your certificate of deposit earnings. Calculate maturity value, interest earned, and APY with different compounding frequencies.',
    url: 'https://financecalculatoronline.pro/calculators/cd',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CD Calculator - FinanceCalc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CD Calculator - Certificate of Deposit Earnings',
    description: 'Free CD calculator shows your certificate of deposit earnings. Calculate maturity value, interest earned, and APY with different compounding frequencies.',
    images: ['/og-image.png'],
  },
}

const faqs = [
  {
    question: 'What is a CD (Certificate of Deposit)?',
    answer: 'A Certificate of Deposit (CD) is a savings product offered by banks and credit unions. You deposit a fixed amount for a set term (3 months to 5 years), and in return, you earn a fixed interest rate that is typically higher than a regular savings account.',
  },
  {
    question: 'What is APY and how is it different from interest rate?',
    answer: 'APY (Annual Percentage Yield) includes the effect of compounding interest, while the stated interest rate does not. For example, a 5% rate compounded monthly gives an APY of 5.116%. APY gives you the true annual return on your investment.',
  },
  {
    question: 'What happens when my CD matures?',
    answer: 'When your CD matures, you can withdraw your money (principal + interest), renew it for another term, or roll it into a different CD. Most banks have a grace period (7-10 days) after maturity before auto-renewal.',
  },
  {
    question: 'Are CDs FDIC insured?',
    answer: 'Yes, CDs at FDIC-insured banks are protected up to $250,000 per depositor, per bank. This means your principal is safe even if the bank fails, up to the insurance limit.',
  },
]

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'CD Calculator',
  url: 'https://financecalculatoronline.pro/calculators/cd',
  description: 'Free CD calculator shows your certificate of deposit earnings and APY.',
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

export default function CDPage() {
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
      <CDCalculator />
    </>
  )
}
