'use client'

import { useState } from 'react'
import CalculatorLayout from '@/components/CalculatorLayout'
import { formatCurrency, formatPercent } from '@/lib/format'
import { compoundInterest } from '@/lib/financial'

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState('10000')
  const [monthlyContribution, setMonthlyContribution] = useState('500')
  const [annualRate, setAnnualRate] = useState('7')
  const [years, setYears] = useState('20')
  const [compounding, setCompounding] = useState('12')

  const p = parseFloat(principal) || 0
  const pmt = parseFloat(monthlyContribution) || 0
  const r = parseFloat(annualRate) || 0
  const y = parseFloat(years) || 0
  const n = parseInt(compounding) || 12

  const { totalBalance, totalContributions, totalInterest } = compoundInterest(p, r, y, n, pmt)

  const growthMultiple = p + pmt * y * 12 > 0 ? totalBalance / (p + pmt * y * 12) : 0

  const relatedCalculators = [
    { label: 'Investment Calculator', href: '/calculators/investment' },
    { label: 'Savings Calculator', href: '/calculators/savings' },
    { label: 'CD Calculator', href: '/calculators/cd' },
    { label: 'Inflation Calculator', href: '/calculators/inflation' },
    { label: 'ROI Calculator', href: '/calculators/roi' },
  ]

  return (
    <CalculatorLayout
      title="Compound Interest Calculator"
      description="See how your money grows over time with compound interest. Calculate the future value of your savings with regular contributions."
      relatedCalculators={relatedCalculators}
      educationalContent={
        <div className="card prose prose-sm max-w-none">
          <h2>What is Compound Interest?</h2>
          <p>
            Compound interest is interest earned on both the initial principal and previously
            accumulated interest. Unlike simple interest, compound interest grows exponentially
            over time, making it one of the most powerful concepts in finance.
          </p>
          <h3>The Compound Interest Formula</h3>
          <p>
            The formula is: <code>A = P(1 + r/n)^(nt)</code>, where A is the final amount,
            P is the principal, r is the annual interest rate, n is the number of times interest
            compounds per year, and t is the number of years.
          </p>
          <h3>The Rule of 72</h3>
          <p>
            A quick way to estimate how long it takes to double your money: divide 72 by the
            annual interest rate. At 7% interest, your money doubles approximately every 10.3 years.
          </p>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="input-label">Initial Principal ($)</label>
            <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">Monthly Contribution ($)</label>
            <input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">Annual Interest Rate (%)</label>
            <input type="number" step="0.1" value={annualRate} onChange={(e) => setAnnualRate(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">Number of Years</label>
            <input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">Compounding Frequency</label>
            <select value={compounding} onChange={(e) => setCompounding(e.target.value)} className="input-field">
              <option value="365">Daily</option>
              <option value="52">Weekly</option>
              <option value="12">Monthly</option>
              <option value="4">Quarterly</option>
              <option value="2">Semi-Annually</option>
              <option value="1">Annually</option>
            </select>
          </div>
        </div>

        <div className="result-box">
          <div className="result-label">Future Value</div>
          <div className="result-value">{formatCurrency(totalBalance)}</div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Total Contributions</div>
            <div className="text-lg font-semibold">{formatCurrency(totalContributions)}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Total Interest Earned</div>
            <div className="text-lg font-semibold text-green-700">{formatCurrency(totalInterest)}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Growth Multiple</div>
            <div className="text-lg font-semibold">{growthMultiple.toFixed(2)}x</div>
          </div>
        </div>

        {/* Visual Breakdown */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Breakdown</h3>
          <div className="flex h-8 rounded-lg overflow-hidden">
            <div
              className="bg-primary-500 flex items-center justify-center text-white text-xs font-medium"
              style={{ width: `${totalBalance > 0 ? (totalContributions / totalBalance) * 100 : 100}%` }}
            >
              Contributions
            </div>
            <div
              className="bg-green-500 flex items-center justify-center text-white text-xs font-medium"
              style={{ width: `${totalBalance > 0 ? (totalInterest / totalBalance) * 100 : 0}%` }}
            >
              Interest
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  )
}
