'use client'

import { useState } from 'react'
import CalculatorLayout from '@/components/CalculatorLayout'
import { formatCurrency, formatPercent } from '@/lib/format'

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

export default function CDCalculator() {
  const [deposit, setDeposit] = useState('10000')
  const [interestRate, setInterestRate] = useState('5.0')
  const [term, setTerm] = useState('12')
  const [compounding, setCompounding] = useState('12')

  const principal = parseFloat(deposit) || 0
  const rate = parseFloat(interestRate) || 0
  const months = parseInt(term) || 0
  const n = parseInt(compounding) || 12

  const years = months / 12
  const r = rate / 100
  const futureValue = principal * Math.pow(1 + r / n, n * years)
  const interestEarned = futureValue - principal
  const apy = (Math.pow(1 + r / n, n) - 1) * 100

  const relatedCalculators = [
    { label: 'Compound Interest Calculator', href: '/calculators/compound-interest' },
    { label: 'Savings Calculator', href: '/calculators/savings' },
    { label: 'Inflation Calculator', href: '/calculators/inflation' },
  ]

  return (
    <CalculatorLayout
      title="CD Calculator"
      description="Calculate the earnings on a Certificate of Deposit (CD). See your total return and APY based on the interest rate and compounding frequency."
      relatedCalculators={relatedCalculators}
      educationalContent={
        <div className="card prose prose-sm max-w-none">
          <h2>How CDs Work</h2>
          <p>
            A Certificate of Deposit (CD) lets you earn a fixed interest rate by locking up your money for a set period.
            The longer the term, the higher the rate typically. CDs are ideal for money you won&apos;t need soon, offering
            guaranteed returns with FDIC insurance protection.
          </p>
          <h2>Frequently Asked Questions</h2>
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      }
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="input-label">Deposit Amount ($)</label>
            <input type="number" value={deposit} onChange={(e) => setDeposit(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">Annual Interest Rate (%)</label>
            <input type="number" step="0.01" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">CD Term</label>
            <select value={term} onChange={(e) => setTerm(e.target.value)} className="input-field">
              <option value="3">3 months</option>
              <option value="6">6 months</option>
              <option value="12">1 year</option>
              <option value="18">18 months</option>
              <option value="24">2 years</option>
              <option value="36">3 years</option>
              <option value="48">4 years</option>
              <option value="60">5 years</option>
            </select>
          </div>
          <div>
            <label className="input-label">Compounding Frequency</label>
            <select value={compounding} onChange={(e) => setCompounding(e.target.value)} className="input-field">
              <option value="365">Daily</option>
              <option value="12">Monthly</option>
              <option value="4">Quarterly</option>
              <option value="2">Semi-Annually</option>
              <option value="1">Annually</option>
            </select>
          </div>
        </div>

        <div className="result-box">
          <div className="result-label">Maturity Value</div>
          <div className="result-value">{formatCurrency(futureValue)}</div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Principal</div>
            <div className="text-lg font-semibold">{formatCurrency(principal)}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Interest Earned</div>
            <div className="text-lg font-semibold text-green-700">{formatCurrency(interestEarned)}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">APY</div>
            <div className="text-lg font-semibold">{formatPercent(apy)}</div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  )
}
