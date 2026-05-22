'use client'

import { useState } from 'react'
import CalculatorLayout from '@/components/CalculatorLayout'
import { formatCurrency, formatPercent } from '@/lib/format'

export default function CreditCardPayoffCalculator() {
  const [balance, setBalance] = useState('5000')
  const [interestRate, setInterestRate] = useState('22.99')
  const [monthlyPayment, setMonthlyPayment] = useState('200')

  const cardBalance = parseFloat(balance) || 0
  const apr = parseFloat(interestRate) || 0
  const payment = parseFloat(monthlyPayment) || 0

  const monthlyRate = apr / 100 / 12

  // Calculate payoff
  let remainingBalance = cardBalance
  let totalInterest = 0
  let months = 0

  if (payment > cardBalance * monthlyRate) {
    while (remainingBalance > 0 && months < 600) {
      const interestCharge = remainingBalance * monthlyRate
      totalInterest += interestCharge
      const principalPayment = Math.min(payment - interestCharge, remainingBalance)
      remainingBalance -= principalPayment
      months++
      if (remainingBalance < 0.01) remainingBalance = 0
    }
  }

  const totalPaid = cardBalance + totalInterest
  const years = Math.floor(months / 12)
  const extraMonths = months % 12
  const payoffDate = new Date()
  payoffDate.setMonth(payoffDate.getMonth() + months)

  const minimumPayment = Math.max(cardBalance * 0.02, 25)
  const minimumInterest = (() => {
    let b = cardBalance, ti = 0, m = 0
    while (b > 0 && m < 600) {
      const i = b * monthlyRate
      ti += i
      const p = Math.max(minimumPayment - i, 0)
      b -= p
      m++
    }
    return { interest: ti, months: m }
  })()

  const relatedCalculators = [
    { label: 'Debt Payoff Calculator', href: '/calculators/debt-payoff' },
    { label: 'Loan Calculator', href: '/calculators/loan' },
  ]

  return (
    <CalculatorLayout
      title="Credit Card Payoff Calculator"
      description="Find out how long it will take to pay off your credit card balance and how much interest you'll pay. See the difference between minimum and fixed payments."
      relatedCalculators={relatedCalculators}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="input-label">Credit Card Balance ($)</label>
            <input type="number" value={balance} onChange={(e) => setBalance(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">Annual Interest Rate (APR) (%)</label>
            <input type="number" step="0.01" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">Monthly Payment ($)</label>
            <input type="number" value={monthlyPayment} onChange={(e) => setMonthlyPayment(e.target.value)} className="input-field" />
          </div>
        </div>

        <div className="result-box">
          <div className="result-label">Time to Pay Off</div>
          <div className="result-value">
            {months > 0 && months < 600
              ? `${years > 0 ? `${years} year${years !== 1 ? 's' : ''} ` : ''}${extraMonths > 0 ? `${extraMonths} month${extraMonths !== 1 ? 's' : ''}` : ''}`
              : 'Payment too low'}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Total Paid</div>
            <div className="text-lg font-semibold">{formatCurrency(totalPaid)}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Total Interest</div>
            <div className="text-lg font-semibold text-red-600">{formatCurrency(totalInterest)}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Interest % of Balance</div>
            <div className="text-lg font-semibold">{formatPercent(cardBalance > 0 ? (totalInterest / cardBalance) * 100 : 0)}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Payoff Date</div>
            <div className="text-lg font-semibold">{months > 0 && months < 600 ? payoffDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A'}</div>
          </div>
        </div>

        {/* Comparison: Minimum vs Fixed */}
        <div className="card">
          <h3 className="font-semibold mb-3">Minimum Payment vs Your Payment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-50 rounded-lg p-4">
              <h4 className="font-medium text-red-900 mb-2">Minimum Payment (2% of balance)</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between"><span>Monthly Payment</span><span>{formatCurrency(minimumPayment)}</span></div>
                <div className="flex justify-between"><span>Total Interest</span><span className="text-red-600">{formatCurrency(minimumInterest.interest)}</span></div>
                <div className="flex justify-between"><span>Time to Pay Off</span><span>{Math.floor(minimumInterest.months / 12)}y {minimumInterest.months % 12}m</span></div>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">Your Payment ({formatCurrency(payment)}/mo)</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between"><span>Monthly Payment</span><span>{formatCurrency(payment)}</span></div>
                <div className="flex justify-between"><span>Total Interest</span><span className="text-green-600">{formatCurrency(totalInterest)}</span></div>
                <div className="flex justify-between"><span>Time to Pay Off</span><span>{years > 0 ? `${years}y ` : ''}{extraMonths}m</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  )
}
