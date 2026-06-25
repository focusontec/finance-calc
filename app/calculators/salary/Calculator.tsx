'use client'

import { useState } from 'react'
import CalculatorLayout from '@/components/CalculatorLayout'
import { formatCurrency, formatNumber } from '@/lib/format'

const faqs = [
  {
    question: 'How do I convert hourly wage to annual salary?',
    answer: 'Multiply your hourly rate by hours per week, then by weeks per year. For example: $25/hour × 40 hours × 52 weeks = $52,000/year. This calculator does the conversion for any pay frequency.',
  },
  {
    question: 'What is the difference between gross and net pay?',
    answer: 'Gross pay is your total earnings before deductions. Net pay (take-home pay) is after taxes, insurance, retirement contributions, and other deductions. Net pay is typically 65-80% of gross pay.',
  },
  {
    question: 'How many hours are in a full-time work year?',
    answer: 'Full-time is typically 40 hours/week × 52 weeks = 2,080 hours per year. Some employers use 2,000 hours (accounting for holidays) or other variations.',
  },
  {
    question: 'What is the difference between biweekly and semimonthly?',
    answer: 'Biweekly means every 2 weeks (26 paychecks/year). Semimonthly means twice a month (24 paychecks/year). Biweekly results in 2 extra paychecks per year but each check is slightly smaller.',
  },
]

export default function SalaryCalculator() {
  const [amount, setAmount] = useState('75000')
  const [inputType, setInputType] = useState('annual')
  const [hoursPerWeek, setHoursPerWeek] = useState('40')
  const [weeksPerYear, setWeeksPerYear] = useState('52')

  const value = parseFloat(amount) || 0
  const hours = parseFloat(hoursPerWeek) || 40
  const weeks = parseFloat(weeksPerYear) || 52

  let annual: number
  switch (inputType) {
    case 'hourly': annual = value * hours * weeks; break
    case 'daily': annual = value * (hours / 8) * 5 * weeks; break
    case 'weekly': annual = value * weeks; break
    case 'biweekly': annual = value * (weeks / 2); break
    case 'monthly': annual = value * 12; break
    default: annual = value
  }

  const hourly = annual / (hours * weeks)
  const daily = hourly * 8
  const weekly = hourly * hours
  const biweekly = weekly * 2
  const monthly = annual / 12

  const relatedCalculators = [
    { label: 'Hourly to Salary', href: '/calculators/hourly-to-salary' },
    { label: 'Pay Raise Calculator', href: '/calculators/pay-raise' },
    { label: 'Overtime Calculator', href: '/calculators/overtime' },
  ]

  return (
    <CalculatorLayout
      title="Salary Calculator"
      description="Convert between hourly, daily, weekly, biweekly, monthly, and annual salary. Quickly see all equivalent pay rates."
      relatedCalculators={relatedCalculators}
      educationalContent={
        <div className="card prose prose-sm max-w-none">
          <h2>Converting Between Pay Frequencies</h2>
          <p>
            Understanding different pay frequencies helps you compare job offers and budget effectively.
            This calculator converts between hourly, daily, weekly, biweekly, monthly, and annual pay,
            giving you a complete picture of your compensation.
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
            <label className="input-label">Pay Frequency</label>
            <select value={inputType} onChange={(e) => setInputType(e.target.value)} className="input-field">
              <option value="annual">Annual</option>
              <option value="monthly">Monthly</option>
              <option value="biweekly">Biweekly</option>
              <option value="weekly">Weekly</option>
              <option value="daily">Daily</option>
              <option value="hourly">Hourly</option>
            </select>
          </div>
          <div>
            <label className="input-label">Hours per Week</label>
            <input type="number" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">Weeks per Year</label>
            <input type="number" value={weeksPerYear} onChange={(e) => setWeeksPerYear(e.target.value)} className="input-field" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left font-medium text-gray-700">Pay Period</th>
                <th className="px-4 py-3 text-right font-medium text-gray-700">Amount</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'Annual Salary', value: annual, highlight: inputType === 'annual' },
                { label: 'Monthly', value: monthly, highlight: inputType === 'monthly' },
                { label: 'Biweekly', value: biweekly, highlight: inputType === 'biweekly' },
                { label: 'Weekly', value: weekly, highlight: inputType === 'weekly' },
                { label: 'Daily', value: daily, highlight: inputType === 'daily' },
                { label: 'Hourly', value: hourly, highlight: inputType === 'hourly' },
              ].map((row, i) => (
                <tr key={i} className={`border-t border-gray-100 ${row.highlight ? 'bg-primary-50' : ''}`}>
                  <td className="px-4 py-3 font-medium">{row.label}</td>
                  <td className="px-4 py-3 text-right font-semibold">{formatCurrency(row.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </CalculatorLayout>
  )
}
