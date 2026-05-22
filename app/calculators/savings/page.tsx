'use client'

import { useState } from 'react'
import CalculatorLayout from '@/components/CalculatorLayout'
import { formatCurrency } from '@/lib/format'

export default function SavingsCalculator() {
  const [currentSavings, setCurrentSavings] = useState('5000')
  const [monthlyDeposit, setMonthlyDeposit] = useState('300')
  const [annualRate, setAnnualRate] = useState('4.5')
  const [years, setYears] = useState('5')
  const [savingsGoal, setSavingsGoal] = useState('25000')

  const current = parseFloat(currentSavings) || 0
  const deposit = parseFloat(monthlyDeposit) || 0
  const rate = parseFloat(annualRate) || 0
  const period = parseFloat(years) || 0
  const goal = parseFloat(savingsGoal) || 0

  const monthlyRate = rate / 100 / 12
  const months = period * 12

  let balance = current
  const yearlyData: Array<{ year: number; balance: number; contributions: number; interest: number }> = []
  let totalContributions = current
  let totalInterest = 0

  for (let month = 1; month <= months; month++) {
    const interest = balance * monthlyRate
    totalInterest += interest
    balance += interest + deposit
    totalContributions += deposit

    if (month % 12 === 0) {
      yearlyData.push({
        year: month / 12,
        balance: Math.round(balance * 100) / 100,
        contributions: Math.round(totalContributions * 100) / 100,
        interest: Math.round(totalInterest * 100) / 100,
      })
    }
  }

  const monthsToGoal = goal > 0 ? (() => {
    let b = current
    for (let m = 1; m <= 600; m++) {
      b = b * (1 + monthlyRate) + deposit
      if (b >= goal) return m
    }
    return -1
  })() : -1

  const relatedCalculators = [
    { label: 'Compound Interest Calculator', href: '/calculators/compound-interest' },
    { label: 'Investment Calculator', href: '/calculators/investment' },
    { label: 'CD Calculator', href: '/calculators/cd' },
  ]

  return (
    <CalculatorLayout
      title="Savings Calculator"
      description="Plan your savings goals with monthly deposits. See how long it takes to reach your target and how much interest you'll earn."
      relatedCalculators={relatedCalculators}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="input-label">Current Savings ($)</label>
            <input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">Monthly Deposit ($)</label>
            <input type="number" value={monthlyDeposit} onChange={(e) => setMonthlyDeposit(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">Annual Interest Rate (%)</label>
            <input type="number" step="0.1" value={annualRate} onChange={(e) => setAnnualRate(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">Time Period (years)</label>
            <input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="input-field" />
          </div>
          <div className="md:col-span-2">
            <label className="input-label">Savings Goal ($)</label>
            <input type="number" value={savingsGoal} onChange={(e) => setSavingsGoal(e.target.value)} className="input-field" />
          </div>
        </div>

        <div className="result-box">
          <div className="result-label">Future Savings Balance</div>
          <div className="result-value">{formatCurrency(balance)}</div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Total Deposits</div>
            <div className="text-lg font-semibold">{formatCurrency(totalContributions)}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Interest Earned</div>
            <div className="text-lg font-semibold text-green-700">{formatCurrency(totalInterest)}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Time to Reach Goal</div>
            <div className="text-lg font-semibold">
              {monthsToGoal === -1 ? 'N/A' : monthsToGoal <= 600 ? `${Math.floor(monthsToGoal / 12)}y ${monthsToGoal % 12}m` : 'Over 50 years'}
            </div>
          </div>
        </div>

        {/* Year by Year Table */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Year-by-Year Growth</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left font-medium text-gray-700">Year</th>
                  <th className="px-4 py-2 text-right font-medium text-gray-700">Balance</th>
                  <th className="px-4 py-2 text-right font-medium text-gray-700">Total Deposits</th>
                  <th className="px-4 py-2 text-right font-medium text-gray-700">Interest Earned</th>
                </tr>
              </thead>
              <tbody>
                {yearlyData.map((row, i) => (
                  <tr key={i} className="border-t border-gray-100">
                    <td className="px-4 py-2">Year {row.year}</td>
                    <td className="px-4 py-2 text-right font-medium">{formatCurrency(row.balance)}</td>
                    <td className="px-4 py-2 text-right">{formatCurrency(row.contributions)}</td>
                    <td className="px-4 py-2 text-right text-green-600">{formatCurrency(row.interest)}</td>
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
