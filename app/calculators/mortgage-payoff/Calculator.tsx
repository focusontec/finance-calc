'use client'

import { useState } from 'react'
import CalculatorLayout from '@/components/CalculatorLayout'
import { formatCurrency } from '@/lib/format'
import { loanPayment, amortizationSchedule } from '@/lib/financial'

const faqs = [
  {
    question: 'How do extra mortgage payments work?',
    answer: 'Extra payments go directly toward your principal balance. Since interest is calculated on the remaining balance, reducing it faster means less interest accrues over the life of the loan, potentially saving tens of thousands of dollars.',
  },
  {
    question: 'Is it better to make extra payments or invest?',
    answer: 'If your mortgage rate is lower than expected investment returns (e.g., 6.5% mortgage vs 8-10% market returns), investing may be mathematically better. However, extra mortgage payments provide guaranteed savings and peace of mind.',
  },
  {
    question: 'How much can I save with extra payments?',
    answer: 'Even $200 extra per month on a $250,000 mortgage at 6.5% can save over $80,000 in interest and pay off the loan 7+ years early. The savings depend on your balance, rate, and extra payment amount.',
  },
  {
    question: 'Should I refinance instead of making extra payments?',
    answer: 'Refinancing can lower your rate, but comes with closing costs (typically 2-5% of loan balance). Extra payments have no cost and provide immediate savings. Compare both options using our calculators.',
  },
]

export default function MortgagePayoffCalculator() {
  const [loanBalance, setLoanBalance] = useState('250000')
  const [interestRate, setInterestRate] = useState('6.5')
  const [remainingYears, setRemainingYears] = useState('25')
  const [extraPayment, setExtraPayment] = useState('200')

  const balance = parseFloat(loanBalance) || 0
  const rate = parseFloat(interestRate) || 0
  const years = parseFloat(remainingYears) || 0
  const extra = parseFloat(extraPayment) || 0

  const { monthlyPayment } = loanPayment(balance, rate, years)
  const normalSchedule = amortizationSchedule(balance, rate, years, 0)
  const acceleratedSchedule = amortizationSchedule(balance, rate, years, extra)

  const normalTotalInterest = normalSchedule.reduce((sum, row) => sum + row.interest, 0)
  const acceleratedTotalInterest = acceleratedSchedule.reduce((sum, row) => sum + row.interest, 0)
  const interestSaved = normalTotalInterest - acceleratedTotalInterest
  const monthsSaved = normalSchedule.length - acceleratedSchedule.length
  const yearsSaved = Math.floor(monthsSaved / 12)
  const extraMonths = monthsSaved % 12

  const normalPayoffDate = new Date()
  normalPayoffDate.setMonth(normalPayoffDate.getMonth() + normalSchedule.length)
  const acceleratedPayoffDate = new Date()
  acceleratedPayoffDate.setMonth(acceleratedPayoffDate.getMonth() + acceleratedSchedule.length)

  const relatedCalculators = [
    { label: 'Mortgage Calculator', href: '/calculators/mortgage' },
    { label: 'Loan Calculator', href: '/calculators/loan' },
    { label: 'Amortization Calculator', href: '/calculators/amortization' },
    { label: 'Refinance Calculator', href: '/calculators/refinance' },
  ]

  return (
    <CalculatorLayout
      title="Mortgage Payoff Calculator"
      description="See how extra payments can help you pay off your mortgage faster and save thousands in interest."
      relatedCalculators={relatedCalculators}
      educationalContent={
        <div className="card prose prose-sm max-w-none">
          <h2>How Extra Mortgage Payments Save Money</h2>
          <p>
            Extra mortgage payments reduce your principal balance faster, which means less interest
            accrues each month. This can save you tens of thousands of dollars and years off your
            loan term, providing financial freedom sooner.
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
            <label className="input-label">Current Loan Balance ($)</label>
            <input type="number" value={loanBalance} onChange={(e) => setLoanBalance(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">Interest Rate (%)</label>
            <input type="number" step="0.125" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">Remaining Term (years)</label>
            <input type="number" value={remainingYears} onChange={(e) => setRemainingYears(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">Extra Monthly Payment ($)</label>
            <input type="number" value={extraPayment} onChange={(e) => setExtraPayment(e.target.value)} className="input-field" />
          </div>
        </div>

        <div className="result-box">
          <div className="result-label">Interest Saved with Extra Payments</div>
          <div className="result-value text-green-700">{formatCurrency(interestSaved)}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-3">Without Extra Payments</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Monthly Payment</span><span>{formatCurrency(monthlyPayment)}</span></div>
              <div className="flex justify-between"><span>Total Interest</span><span>{formatCurrency(normalTotalInterest)}</span></div>
              <div className="flex justify-between"><span>Payoff Date</span><span>{normalPayoffDate.toLocaleDateString()}</span></div>
            </div>
          </div>
          <div className="card bg-green-50 border-green-200">
            <h3 className="font-semibold text-green-900 mb-3">With ${formatCurrency(extra)}/mo Extra</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Monthly Payment</span><span>{formatCurrency(monthlyPayment + extra)}</span></div>
              <div className="flex justify-between"><span>Total Interest</span><span>{formatCurrency(acceleratedTotalInterest)}</span></div>
              <div className="flex justify-between"><span>Payoff Date</span><span>{acceleratedPayoffDate.toLocaleDateString()}</span></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-green-700">
              {yearsSaved > 0 ? `${yearsSaved}y ${extraMonths}m` : `${monthsSaved}m`}
            </div>
            <div className="text-sm text-green-600">Paid Off Sooner</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-green-700">{formatCurrency(interestSaved)}</div>
            <div className="text-sm text-green-600">Interest Saved</div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  )
}
