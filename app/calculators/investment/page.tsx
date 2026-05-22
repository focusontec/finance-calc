'use client'

import { useState } from 'react'
import CalculatorLayout from '@/components/CalculatorLayout'
import { formatCurrency } from '@/lib/format'
import { compoundInterest } from '@/lib/financial'

export default function InvestmentCalculator() {
  const [initialAmount, setInitialAmount] = useState('25000')
  const [monthlyContribution, setMonthlyContribution] = useState('1000')
  const [expectedReturn, setExpectedReturn] = useState('8')
  const [years, setYears] = useState('25')
  const [inflationRate, setInflationRate] = useState('3')

  const initial = parseFloat(initialAmount) || 0
  const monthly = parseFloat(monthlyContribution) || 0
  const returnRate = parseFloat(expectedReturn) || 0
  const period = parseFloat(years) || 0
  const inflation = parseFloat(inflationRate) || 0

  const nominal = compoundInterest(initial, returnRate, period, 12, monthly)
  const realRate = ((1 + returnRate / 100) / (1 + inflation / 100) - 1) * 100
  const real = compoundInterest(initial, realRate, period, 12, monthly)

  const totalContributions = initial + monthly * period * 12

  const relatedCalculators = [
    { label: 'Compound Interest Calculator', href: '/calculators/compound-interest' },
    { label: 'Savings Calculator', href: '/calculators/savings' },
    { label: 'ROI Calculator', href: '/calculators/roi' },
    { label: 'Inflation Calculator', href: '/calculators/inflation' },
    { label: 'Retirement Calculator', href: '/calculators/retirement' },
  ]

  return (
    <CalculatorLayout
      title="Investment Calculator"
      description="Project the growth of your investments over time with regular contributions. See both nominal and inflation-adjusted returns."
      relatedCalculators={relatedCalculators}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="input-label">Initial Investment ($)</label>
            <input type="number" value={initialAmount} onChange={(e) => setInitialAmount(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">Monthly Contribution ($)</label>
            <input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">Expected Annual Return (%)</label>
            <input type="number" step="0.1" value={expectedReturn} onChange={(e) => setExpectedReturn(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">Investment Period (years)</label>
            <input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">Expected Inflation Rate (%)</label>
            <input type="number" step="0.1" value={inflationRate} onChange={(e) => setInflationRate(e.target.value)} className="input-field" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="result-box">
            <div className="result-label">Future Value (Nominal)</div>
            <div className="result-value">{formatCurrency(nominal.totalBalance)}</div>
          </div>
          <div className="result-box">
            <div className="result-label">Future Value (Inflation-Adjusted)</div>
            <div className="result-value text-green-700">{formatCurrency(real.totalBalance)}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Total Invested</div>
            <div className="text-lg font-semibold">{formatCurrency(totalContributions)}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Investment Gain</div>
            <div className="text-lg font-semibold text-green-700">{formatCurrency(nominal.totalInterest)}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Real Return</div>
            <div className="text-lg font-semibold">{formatCurrency(real.totalBalance)}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Purchasing Power Lost</div>
            <div className="text-lg font-semibold text-red-600">{formatCurrency(nominal.totalBalance - real.totalBalance)}</div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  )
}
