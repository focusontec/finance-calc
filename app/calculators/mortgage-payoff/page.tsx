'use client'

import { useState } from 'react'
import CalculatorLayout from '@/components/CalculatorLayout'
import { formatCurrency } from '@/lib/format'
import { loanPayment, amortizationSchedule } from '@/lib/financial'

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
