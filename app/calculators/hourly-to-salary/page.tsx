'use client'

import { useState } from 'react'
import CalculatorLayout from '@/components/CalculatorLayout'
import { formatCurrency } from '@/lib/format'

export default function HourlyToSalaryCalculator() {
  const [hourlyRate, setHourlyRate] = useState('25')
  const [hoursPerWeek, setHoursPerWeek] = useState('40')
  const [weeksPerYear, setWeeksPerYear] = useState('52')
  const [vacationWeeks, setVacationWeeks] = useState('2')

  const rate = parseFloat(hourlyRate) || 0
  const hours = parseFloat(hoursPerWeek) || 0
  const weeks = parseFloat(weeksPerYear) || 0
  const vacation = parseFloat(vacationWeeks) || 0

  const workingWeeks = weeks - vacation
  const annualSalary = rate * hours * workingWeeks
  const annualWithVacation = rate * hours * weeks
  const monthly = annualSalary / 12
  const weekly = rate * hours
  const daily = rate * 8

  const relatedCalculators = [
    { label: 'Salary Calculator', href: '/calculators/salary' },
    { label: 'Pay Raise Calculator', href: '/calculators/pay-raise' },
    { label: 'Overtime Calculator', href: '/calculators/overtime' },
  ]

  return (
    <CalculatorLayout
      title="Hourly to Salary Calculator"
      description="Convert your hourly wage to an annual salary. Accounts for hours per week, weeks per year, and vacation time."
      relatedCalculators={relatedCalculators}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="input-label">Hourly Rate ($)</label>
            <input type="number" step="0.50" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">Hours per Week</label>
            <input type="number" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">Weeks per Year</label>
            <input type="number" value={weeksPerYear} onChange={(e) => setWeeksPerYear(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">Unpaid Vacation Weeks</label>
            <input type="number" value={vacationWeeks} onChange={(e) => setVacationWeeks(e.target.value)} className="input-field" />
          </div>
        </div>

        <div className="result-box">
          <div className="result-label">Annual Salary (with vacation)</div>
          <div className="result-value">{formatCurrency(annualSalary)}</div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left font-medium text-gray-700">Period</th>
                <th className="px-4 py-3 text-right font-medium text-gray-700">Gross Pay</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-100"><td className="px-4 py-2">Annual (52 weeks)</td><td className="px-4 py-2 text-right font-semibold">{formatCurrency(annualWithVacation)}</td></tr>
              <tr className="border-t border-gray-100 bg-primary-50"><td className="px-4 py-2 font-medium">Annual ({workingWeeks} weeks)</td><td className="px-4 py-2 text-right font-semibold">{formatCurrency(annualSalary)}</td></tr>
              <tr className="border-t border-gray-100"><td className="px-4 py-2">Monthly</td><td className="px-4 py-2 text-right font-semibold">{formatCurrency(monthly)}</td></tr>
              <tr className="border-t border-gray-100"><td className="px-4 py-2">Biweekly</td><td className="px-4 py-2 text-right font-semibold">{formatCurrency(weekly * 2)}</td></tr>
              <tr className="border-t border-gray-100"><td className="px-4 py-2">Weekly</td><td className="px-4 py-2 text-right font-semibold">{formatCurrency(weekly)}</td></tr>
              <tr className="border-t border-gray-100"><td className="px-4 py-2">Daily (8 hours)</td><td className="px-4 py-2 text-right font-semibold">{formatCurrency(daily)}</td></tr>
              <tr className="border-t border-gray-100"><td className="px-4 py-2">Hourly</td><td className="px-4 py-2 text-right font-semibold">{formatCurrency(rate)}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </CalculatorLayout>
  )
}
