'use client'

import { useState } from 'react'
import CalculatorLayout from '@/components/CalculatorLayout'
import { formatCurrency } from '@/lib/format'
import { loanPayment } from '@/lib/financial'

export default function RefinanceCalculator() {
  const [currentBalance, setCurrentBalance] = useState('250000')
  const [currentRate, setCurrentRate] = useState('7.5')
  const [currentTerm, setCurrentTerm] = useState('28')
  const [newRate, setNewRate] = useState('6.0')
  const [newTerm, setNewTerm] = useState('30')
  const [closingCosts, setClosingCosts] = useState('5000')

  const balance = parseFloat(currentBalance) || 0
  const cRate = parseFloat(currentRate) || 0
  const cTerm = parseFloat(currentTerm) || 0
  const nRate = parseFloat(newRate) || 0
  const nTerm = parseFloat(newTerm) || 0
  const costs = parseFloat(closingCosts) || 0

  const current = loanPayment(balance, cRate, cTerm)
  const newLoan = loanPayment(balance + costs, nRate, nTerm)

  const monthlySavings = current.monthlyPayment - newLoan.monthlyPayment
  const totalSavings = current.totalPayment - newLoan.totalPayment - costs
  const breakEvenMonths = monthlySavings > 0 ? Math.ceil(costs / monthlySavings) : Infinity

  const relatedCalculators = [
    { label: 'Mortgage Calculator', href: '/calculators/mortgage' },
    { label: 'Mortgage Payoff Calculator', href: '/calculators/mortgage-payoff' },
    { label: 'Loan Calculator', href: '/calculators/loan' },
  ]

  return (
    <CalculatorLayout
      title="Refinance Calculator"
      description="Should you refinance? Compare your current mortgage with a new one to see if refinancing makes financial sense."
      relatedCalculators={relatedCalculators}
    >
      <div className="space-y-6">
        <h3 className="font-semibold text-gray-900">Current Mortgage</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="input-label">Current Balance ($)</label>
            <input type="number" value={currentBalance} onChange={(e) => setCurrentBalance(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">Current Rate (%)</label>
            <input type="number" step="0.125" value={currentRate} onChange={(e) => setCurrentRate(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">Remaining Years</label>
            <input type="number" value={currentTerm} onChange={(e) => setCurrentTerm(e.target.value)} className="input-field" />
          </div>
        </div>

        <h3 className="font-semibold text-gray-900">New Mortgage</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="input-label">New Rate (%)</label>
            <input type="number" step="0.125" value={newRate} onChange={(e) => setNewRate(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">New Term (years)</label>
            <input type="number" value={newTerm} onChange={(e) => setNewTerm(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">Closing Costs ($)</label>
            <input type="number" value={closingCosts} onChange={(e) => setClosingCosts(e.target.value)} className="input-field" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-3">Current Mortgage</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Monthly Payment</span><span>{formatCurrency(current.monthlyPayment)}</span></div>
              <div className="flex justify-between"><span>Total Interest</span><span>{formatCurrency(current.totalInterest)}</span></div>
              <div className="flex justify-between"><span>Total Payment</span><span>{formatCurrency(current.totalPayment)}</span></div>
            </div>
          </div>
          <div className="card bg-primary-50 border-primary-200">
            <h3 className="font-semibold text-primary-900 mb-3">New Mortgage</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Monthly Payment</span><span>{formatCurrency(newLoan.monthlyPayment)}</span></div>
              <div className="flex justify-between"><span>Total Interest</span><span>{formatCurrency(newLoan.totalInterest)}</span></div>
              <div className="flex justify-between"><span>Total Payment</span><span>{formatCurrency(newLoan.totalPayment)}</span></div>
            </div>
          </div>
        </div>

        <div className="result-box">
          <div className="result-label">Monthly Savings</div>
          <div className={`result-value ${monthlySavings >= 0 ? 'text-green-700' : 'text-red-700'}`}>
            {monthlySavings >= 0 ? '+' : ''}{formatCurrency(monthlySavings)}/month
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{breakEvenMonths === Infinity ? 'N/A' : `${breakEvenMonths} months`}</div>
            <div className="text-sm text-gray-500">Break-even Point</div>
          </div>
          <div className={`rounded-lg p-4 text-center ${totalSavings >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className={`text-2xl font-bold ${totalSavings >= 0 ? 'text-green-700' : 'text-red-700'}`}>
              {formatCurrency(Math.abs(totalSavings))}
            </div>
            <div className={`text-sm ${totalSavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalSavings >= 0 ? 'Total Savings' : 'Total Extra Cost'}
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  )
}
