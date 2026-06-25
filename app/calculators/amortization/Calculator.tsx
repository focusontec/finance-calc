'use client'

import { useState } from 'react'
import CalculatorLayout from '@/components/CalculatorLayout'
import { formatCurrency, formatNumber } from '@/lib/format'
import { loanPayment, amortizationSchedule } from '@/lib/financial'

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

export default function AmortizationCalculator() {
  const [loanAmount, setLoanAmount] = useState('300000')
  const [interestRate, setInterestRate] = useState('6.5')
  const [loanTerm, setLoanTerm] = useState('30')
  const [startDate, setStartDate] = useState('')

  const amount = parseFloat(loanAmount) || 0
  const rate = parseFloat(interestRate) || 0
  const term = parseFloat(loanTerm) || 0

  const { monthlyPayment, totalPayment, totalInterest } = loanPayment(amount, rate, term)
  const schedule = amortizationSchedule(amount, rate, term)

  const interestPercent = totalPayment > 0 ? (totalInterest / totalPayment) * 100 : 0
  const principalPercent = totalPayment > 0 ? (amount / totalPayment) * 100 : 0

  const relatedCalculators = [
    { label: 'Mortgage Calculator', href: '/calculators/mortgage' },
    { label: 'Loan Calculator', href: '/calculators/loan' },
    { label: 'Mortgage Payoff Calculator', href: '/calculators/mortgage-payoff' },
  ]

  return (
    <CalculatorLayout
      title="Amortization Calculator"
      description="View a detailed amortization schedule showing how each payment is split between principal and interest over the life of your loan."
      relatedCalculators={relatedCalculators}
      educationalContent={
        <div className="card prose prose-sm max-w-none">
          <h2>What is Amortization?</h2>
          <p>
            Amortization is the process of spreading a loan into a series of fixed payments over time.
            Each payment covers both interest and a portion of the principal balance. In the early years,
            most of each payment goes toward interest. As the balance decreases, more of each payment
            goes toward the principal.
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="input-label">Loan Amount ($)</label>
            <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">Annual Interest Rate (%)</label>
            <input type="number" step="0.125" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">Loan Term (years)</label>
            <input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className="input-field" />
          </div>
        </div>

        <div className="result-box">
          <div className="result-label">Monthly Payment</div>
          <div className="result-value">{formatCurrency(monthlyPayment)}</div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Principal</div>
            <div className="text-lg font-semibold">{formatCurrency(amount)}</div>
            <div className="text-xs text-gray-400">{formatNumber(principalPercent, 1)}%</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Total Interest</div>
            <div className="text-lg font-semibold">{formatCurrency(totalInterest)}</div>
            <div className="text-xs text-gray-400">{formatNumber(interestPercent, 1)}%</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Total Cost</div>
            <div className="text-lg font-semibold">{formatCurrency(totalPayment)}</div>
          </div>
        </div>

        {/* Visual bar */}
        <div className="flex h-8 rounded-lg overflow-hidden">
          <div className="bg-primary-500 flex items-center justify-center text-white text-xs font-medium" style={{ width: `${principalPercent}%` }}>
            Principal
          </div>
          <div className="bg-orange-500 flex items-center justify-center text-white text-xs font-medium" style={{ width: `${interestPercent}%` }}>
            Interest
          </div>
        </div>

        {/* Full Amortization Table */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Full Amortization Schedule</h3>
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-white">
                <tr className="bg-gray-50">
                  <th className="px-3 py-2 text-left font-medium text-gray-700">#</th>
                  <th className="px-3 py-2 text-right font-medium text-gray-700">Payment</th>
                  <th className="px-3 py-2 text-right font-medium text-gray-700">Principal</th>
                  <th className="px-3 py-2 text-right font-medium text-gray-700">Interest</th>
                  <th className="px-3 py-2 text-right font-medium text-gray-700">Balance</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row, i) => (
                  <tr key={i} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-3 py-2">{row.month}</td>
                    <td className="px-3 py-2 text-right">{formatCurrency(row.payment)}</td>
                    <td className="px-3 py-2 text-right">{formatCurrency(row.principal)}</td>
                    <td className="px-3 py-2 text-right">{formatCurrency(row.interest)}</td>
                    <td className="px-3 py-2 text-right">{formatCurrency(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  )
}
