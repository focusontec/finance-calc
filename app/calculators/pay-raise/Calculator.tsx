'use client'

import { useState } from 'react'
import CalculatorLayout from '@/components/CalculatorLayout'
import { formatCurrency, formatPercent } from '@/lib/format'

const faqs = [
  {
    question: 'What is a typical annual raise?',
    answer: 'The average annual raise in the US is 3-5%, though this varies by industry, performance, and economic conditions. Cost-of-living adjustments are typically 2-3%, while merit-based raises can be higher.',
  },
  {
    question: 'How do I negotiate a raise?',
    answer: 'Research market rates for your position, document your achievements and contributions, time your request well (after successful projects or during reviews), and be prepared to discuss specific numbers. Practice your pitch beforehand.',
  },
  {
    question: 'Should I ask for a percentage or dollar amount?',
    answer: 'For smaller raises (under $5,000), a percentage is often easier for managers to approve. For larger raises or promotions, a specific dollar amount tied to market data can be more effective. Know your market value.',
  },
  {
    question: 'How does a raise affect my taxes?',
    answer: 'A raise increases your taxable income. If it pushes you into a higher tax bracket, only the income above the bracket threshold is taxed at the higher rate. Use our salary calculator to estimate your take-home pay.',
  },
]

export default function PayRaiseCalculator() {
  const [currentSalary, setCurrentSalary] = useState('60000')
  const [raiseType, setRaiseType] = useState('percent')
  const [raiseValue, setRaiseValue] = useState('5')
  const [payPeriod, setPayPeriod] = useState('annual')

  const salary = parseFloat(currentSalary) || 0
  const value = parseFloat(raiseValue) || 0

  let newAnnualSalary: number
  let raiseAmount: number
  let raisePercent: number

  if (raiseType === 'percent') {
    raisePercent = value
    raiseAmount = salary * (value / 100)
    newAnnualSalary = salary + raiseAmount
  } else {
    let annualRaise: number
    switch (payPeriod) {
      case 'hourly': annualRaise = value * 40 * 52; break
      case 'monthly': annualRaise = value * 12; break
      default: annualRaise = value
    }
    raiseAmount = annualRaise
    newAnnualSalary = salary + annualRaise
    raisePercent = salary > 0 ? (annualRaise / salary) * 100 : 0
  }

  const monthlyIncrease = raiseAmount / 12
  const weeklyIncrease = raiseAmount / 52

  const relatedCalculators = [
    { label: 'Salary Calculator', href: '/calculators/salary' },
    { label: 'Hourly to Salary', href: '/calculators/hourly-to-salary' },
    { label: 'Inflation Calculator', href: '/calculators/inflation' },
  ]

  return (
    <CalculatorLayout
      title="Pay Raise Calculator"
      description="Calculate the impact of a salary increase. See your new salary and how the raise affects your pay across all periods."
      relatedCalculators={relatedCalculators}
      educationalContent={
        <div className="card prose prose-sm max-w-none">
          <h2>Understanding Pay Raises</h2>
          <p>
            A pay raise increases your compensation and can significantly impact your long-term
            wealth. Even a small percentage increase compounds over time through higher retirement
            contributions, Social Security benefits, and future raise calculations.
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
            <label className="input-label">Current Annual Salary ($)</label>
            <input type="number" value={currentSalary} onChange={(e) => setCurrentSalary(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">Raise Type</label>
            <select value={raiseType} onChange={(e) => setRaiseType(e.target.value)} className="input-field">
              <option value="percent">Percentage (%)</option>
              <option value="amount">Dollar Amount ($)</option>
            </select>
          </div>
          <div>
            <label className="input-label">{raiseType === 'percent' ? 'Raise Percentage (%)' : 'Raise Amount ($)'}</label>
            <input type="number" step={raiseType === 'percent' ? '0.1' : '100'} value={raiseValue} onChange={(e) => setRaiseValue(e.target.value)} className="input-field" />
          </div>
          {raiseType === 'amount' && (
            <div>
              <label className="input-label">Amount is per</label>
              <select value={payPeriod} onChange={(e) => setPayPeriod(e.target.value)} className="input-field">
                <option value="annual">Year</option>
                <option value="monthly">Month</option>
                <option value="hourly">Hour</option>
              </select>
            </div>
          )}
        </div>

        <div className="result-box">
          <div className="result-label">New Annual Salary</div>
          <div className="result-value">{formatCurrency(newAnnualSalary)}</div>
          <div className="text-sm text-green-600 mt-1">+{formatPercent(raisePercent)} raise</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-3">Before Raise</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Annual</span><span>{formatCurrency(salary)}</span></div>
              <div className="flex justify-between"><span>Monthly</span><span>{formatCurrency(salary / 12)}</span></div>
              <div className="flex justify-between"><span>Weekly</span><span>{formatCurrency(salary / 52)}</span></div>
            </div>
          </div>
          <div className="card bg-green-50 border-green-200">
            <h3 className="font-semibold text-green-900 mb-3">After Raise</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Annual</span><span>{formatCurrency(newAnnualSalary)}</span></div>
              <div className="flex justify-between"><span>Monthly</span><span>{formatCurrency(newAnnualSalary / 12)}</span></div>
              <div className="flex justify-between"><span>Weekly</span><span>{formatCurrency(newAnnualSalary / 52)}</span></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-700">{formatCurrency(raiseAmount)}</div>
            <div className="text-sm text-green-600">Annual Increase</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-700">{formatCurrency(monthlyIncrease)}</div>
            <div className="text-sm text-green-600">Monthly Increase</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-700">{formatCurrency(weeklyIncrease)}</div>
            <div className="text-sm text-green-600">Weekly Increase</div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  )
}
