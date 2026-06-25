'use client'

import { useState } from 'react'
import CalculatorLayout from '@/components/CalculatorLayout'
import { formatCurrency, formatPercent } from '@/lib/format'

const faqs = [
  {
    question: 'What is ROI (Return on Investment)?',
    answer: 'ROI is a performance measure used to evaluate the efficiency of an investment. It is calculated as: ROI = (Net Profit / Cost of Investment) × 100. A positive ROI means the investment gained value; negative means it lost value.',
  },
  {
    question: 'What is a good ROI?',
    answer: 'A good ROI depends on the investment type and risk level. Stock market investments historically return 7-10% annually. Real estate typically returns 8-12%. Higher-risk investments should offer higher potential returns to compensate.',
  },
  {
    question: 'What is annualized ROI?',
    answer: 'Annualized ROI adjusts returns for the time period, allowing fair comparison between investments of different durations. For example, 20% ROI over 2 years is about 9.5% annualized, while 20% over 5 years is about 3.7% annualized.',
  },
  {
    question: 'What are the limitations of ROI?',
    answer: 'ROI does not account for time value of money, risk, or opportunity cost. A 50% ROI over 10 years may be worse than 20% over 2 years. Use annualized ROI and consider other metrics like IRR for comprehensive analysis.',
  },
]

export default function ROICalculator() {
  const [initialInvestment, setInitialInvestment] = useState('10000')
  const [finalValue, setFinalValue] = useState('15000')
  const [timePeriod, setTimePeriod] = useState('2')

  const investment = parseFloat(initialInvestment) || 0
  const final = parseFloat(finalValue) || 0
  const years = parseFloat(timePeriod) || 0

  const netProfit = final - investment
  const roi = investment > 0 ? (netProfit / investment) * 100 : 0
  const annualizedRoi = years > 0 && investment > 0
    ? (Math.pow(final / investment, 1 / years) - 1) * 100
    : 0

  const relatedCalculators = [
    { label: 'Investment Calculator', href: '/calculators/investment' },
    { label: 'Compound Interest Calculator', href: '/calculators/compound-interest' },
    { label: 'Inflation Calculator', href: '/calculators/inflation' },
  ]

  return (
    <CalculatorLayout
      title="ROI Calculator"
      description="Calculate the return on investment (ROI) for any investment. See both total ROI and annualized returns."
      relatedCalculators={relatedCalculators}
      educationalContent={
        <div className="card prose prose-sm max-w-none">
          <h2>Understanding ROI</h2>
          <p>
            Return on Investment (ROI) measures the profitability of an investment. The basic formula is:
            <code> ROI = (Net Profit / Cost of Investment) × 100</code>.
          </p>
          <h3>Annualized ROI</h3>
          <p>
            Annualized ROI accounts for the time period of the investment, allowing you to compare
            investments of different durations on an equal basis. A 20% ROI over 2 years is very
            different from a 20% ROI over 10 years.
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
            <label className="input-label">Initial Investment ($)</label>
            <input type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">Final Value ($)</label>
            <input type="number" value={finalValue} onChange={(e) => setFinalValue(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">Time Period (years)</label>
            <input type="number" step="0.5" value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} className="input-field" />
          </div>
        </div>

        <div className="result-box">
          <div className="result-label">Return on Investment</div>
          <div className={`result-value ${roi >= 0 ? 'text-green-700' : 'text-red-700'}`}>
            {formatPercent(roi)}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Initial Investment</div>
            <div className="text-lg font-semibold">{formatCurrency(investment)}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Net Profit</div>
            <div className={`text-lg font-semibold ${netProfit >= 0 ? 'text-green-700' : 'text-red-700'}`}>
              {netProfit >= 0 ? '+' : ''}{formatCurrency(netProfit)}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Annualized ROI</div>
            <div className="text-lg font-semibold">{formatPercent(annualizedRoi)}</div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  )
}
