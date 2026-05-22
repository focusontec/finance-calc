'use client'

import { useState } from 'react'
import CalculatorLayout from '@/components/CalculatorLayout'
import { formatCurrency, formatNumber } from '@/lib/format'

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
