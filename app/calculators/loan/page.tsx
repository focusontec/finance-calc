'use client'

import { useState } from 'react'
import CalculatorLayout from '@/components/CalculatorLayout'
import { formatCurrency, formatNumber } from '@/lib/format'
import { loanPayment, amortizationSchedule } from '@/lib/financial'

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('25000')
  const [interestRate, setInterestRate] = useState('7.5')
  const [loanTerm, setLoanTerm] = useState('5')
  const [extraPayment, setExtraPayment] = useState('0')

  const amount = parseFloat(loanAmount) || 0
  const rate = parseFloat(interestRate) || 0
  const term = parseFloat(loanTerm) || 0
  const extra = parseFloat(extraPayment) || 0

  const { monthlyPayment, totalPayment, totalInterest } = loanPayment(amount, rate, term)
  const schedule = amortizationSchedule(amount, rate, term, extra)
  const totalWithExtra = schedule.reduce((sum, row) => sum + row.payment, 0)
  const monthsSaved = (term * 12) - schedule.length
  const interestSaved = totalPayment - totalWithExtra

  const relatedCalculators = [
    { label: 'Mortgage Calculator', href: '/calculators/mortgage' },
    { label: 'Auto Loan Calculator', href: '/calculators/auto-loan' },
    { label: 'Amortization Calculator', href: '/calculators/amortization' },
    { label: 'Debt Payoff Calculator', href: '/calculators/debt-payoff' },
    { label: 'Credit Card Payoff', href: '/calculators/credit-card-payoff' },
  ]

  return (
    <CalculatorLayout
      title="Loan Calculator"
      description="Calculate monthly payments, total interest, and view a complete amortization schedule for any loan. Supports extra payments to see how much you can save."
      relatedCalculators={relatedCalculators}
      educationalContent={
        <div className="card prose prose-sm max-w-none">
          <h2>Understanding Loan Payments</h2>
          <p>
            Most loans use an amortization schedule, where each payment is split between
            interest and principal. Early payments are mostly interest, while later payments
            are mostly principal.
          </p>
          <h3>How Extra Payments Help</h3>
          <p>
            Making extra payments toward your principal reduces the balance faster, which means
            less interest accrues over the life of the loan. Even small extra payments can
            save thousands in interest and shorten your loan term significantly.
          </p>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div>
            <label className="input-label">Extra Monthly Payment ($)</label>
            <input type="number" value={extraPayment} onChange={(e) => setExtraPayment(e.target.value)} className="input-field" />
          </div>
        </div>

        <div className="result-box">
          <div className="result-label">Monthly Payment</div>
          <div className="result-value">{formatCurrency(monthlyPayment)}</div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Total Interest</div>
            <div className="text-lg font-semibold">{formatCurrency(totalInterest)}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Total Payment</div>
            <div className="text-lg font-semibold">{formatCurrency(totalPayment)}</div>
          </div>
          {extra > 0 && (
            <>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-xs text-green-700 mb-1">Interest Saved</div>
                <div className="text-lg font-semibold text-green-800">{formatCurrency(interestSaved)}</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-xs text-green-700 mb-1">Months Saved</div>
                <div className="text-lg font-semibold text-green-800">{monthsSaved}</div>
              </div>
            </>
          )}
        </div>

        {/* Amortization Table */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Amortization Schedule</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left font-medium text-gray-700">Month</th>
                  <th className="px-4 py-2 text-right font-medium text-gray-700">Payment</th>
                  <th className="px-4 py-2 text-right font-medium text-gray-700">Principal</th>
                  <th className="px-4 py-2 text-right font-medium text-gray-700">Interest</th>
                  <th className="px-4 py-2 text-right font-medium text-gray-700">Balance</th>
                </tr>
              </thead>
              <tbody>
                {schedule.slice(0, 24).map((row, i) => (
                  <tr key={i} className="border-t border-gray-100">
                    <td className="px-4 py-2">{row.month}</td>
                    <td className="px-4 py-2 text-right">{formatCurrency(row.payment)}</td>
                    <td className="px-4 py-2 text-right">{formatCurrency(row.principal)}</td>
                    <td className="px-4 py-2 text-right">{formatCurrency(row.interest)}</td>
                    <td className="px-4 py-2 text-right">{formatCurrency(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {schedule.length > 24 && (
              <p className="text-sm text-gray-500 mt-2 text-center">
                Showing first 24 of {schedule.length} payments
              </p>
            )}
          </div>
        </div>
      </div>
    </CalculatorLayout>
  )
}
