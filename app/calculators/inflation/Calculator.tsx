'use client'

import { useState } from 'react'
import CalculatorLayout from '@/components/CalculatorLayout'
import { formatCurrency, formatNumber, formatPercent } from '@/lib/format'

const faqs = [
  {
    question: 'What is inflation?',
    answer: 'Inflation is the rate at which the general level of prices for goods and services rises over time, causing purchasing power to fall. A 3% annual inflation rate means that something costing $100 today will cost about $103 next year.',
  },
  {
    question: 'How does inflation affect my savings?',
    answer: 'Inflation erodes the real value of money over time. If inflation is 3% per year, $100,000 in savings today will only have the purchasing power of about $74,000 in 10 years. This is why investing is important to outpace inflation.',
  },
  {
    question: 'What causes inflation?',
    answer: 'Inflation is caused by increased demand (demand-pull), rising production costs (cost-push), and increased money supply. Central banks manage inflation through monetary policy, primarily by adjusting interest rates.',
  },
  {
    question: 'What is the Rule of 72 for inflation?',
    answer: 'The Rule of 72 helps estimate how quickly inflation halves your purchasing power. Divide 72 by the inflation rate: at 3% inflation, your money loses half its value in about 24 years (72 ÷ 3 = 24).',
  },
]

export default function InflationCalculator() {
  const [amount, setAmount] = useState('100')
  const [startYear, setStartYear] = useState('2000')
  const [endYear, setEndYear] = useState('2024')
  const [inflationRate, setInflationRate] = useState('3.0')

  const currentAmount = parseFloat(amount) || 0
  const fromYear = parseInt(startYear) || 2000
  const toYear = parseInt(endYear) || 2024
  const rate = parseFloat(inflationRate) || 0

  const years = toYear - fromYear
  const futureValue = currentAmount * Math.pow(1 + rate / 100, years)
  const purchasingPowerLoss = futureValue - currentAmount
  const percentChange = currentAmount > 0 ? ((futureValue - currentAmount) / currentAmount) * 100 : 0

  const reverseValue = futureValue / Math.pow(1 + rate / 100, years)

  const relatedCalculators = [
    { label: 'Investment Calculator', href: '/calculators/investment' },
    { label: 'Compound Interest Calculator', href: '/calculators/compound-interest' },
    { label: 'Salary Calculator', href: '/calculators/salary' },
  ]

  return (
    <CalculatorLayout
      title="Inflation Calculator"
      description="Calculate the impact of inflation on the purchasing power of money over time. See how much a dollar from the past is worth today."
      relatedCalculators={relatedCalculators}
      educationalContent={
        <div className="card prose prose-sm max-w-none">
          <h2>What is Inflation?</h2>
          <p>
            Inflation is the rate at which the general level of prices for goods and services rises,
            causing purchasing power to fall. A 3% annual inflation rate means that something costing
            $100 today will cost about $103 next year.
          </p>
          <h3>The Rule of 72 and Inflation</h3>
          <p>
            At 3% inflation, the purchasing power of money halves in about 24 years (72 / 3 = 24).
            This is why investing is important — to outpace inflation and preserve your wealth.
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
            <label className="input-label">Amount ($)</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">Average Annual Inflation Rate (%)</label>
            <input type="number" step="0.1" value={inflationRate} onChange={(e) => setInflationRate(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">From Year</label>
            <input type="number" value={startYear} onChange={(e) => setStartYear(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">To Year</label>
            <input type="number" value={endYear} onChange={(e) => setEndYear(e.target.value)} className="input-field" />
          </div>
        </div>

        <div className="result-box">
          <div className="result-label">${formatCurrency(currentAmount)} in {fromYear} is equivalent to</div>
          <div className="result-value">{formatCurrency(futureValue)} in {toYear}</div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Original Value</div>
            <div className="text-lg font-semibold">{formatCurrency(currentAmount)}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Inflation-Adjusted Value</div>
            <div className="text-lg font-semibold">{formatCurrency(futureValue)}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Cumulative Inflation</div>
            <div className="text-lg font-semibold text-red-600">+{formatPercent(percentChange)}</div>
          </div>
        </div>

        <div className="card">
          <h3 className="font-semibold mb-2">Purchasing Power Over Time</h3>
          <p className="text-sm text-gray-600">
            At {formatPercent(rate)} annual inflation, $1.00 in {fromYear} has the same purchasing power
            as ${formatNumber(Math.pow(1 + rate / 100, years), 2)} in {toYear}.
            That&apos;s a {formatPercent(percentChange)} increase in prices over {years} years.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  )
}
