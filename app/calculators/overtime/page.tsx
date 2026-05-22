'use client'

import { useState } from 'react'
import CalculatorLayout from '@/components/CalculatorLayout'
import { formatCurrency, formatNumber } from '@/lib/format'

export default function OvertimeCalculator() {
  const [hourlyRate, setHourlyRate] = useState('25')
  const [regularHours, setRegularHours] = useState('40')
  const [overtimeHours, setOvertimeHours] = useState('10')
  const [overtimeRate, setOvertimeRate] = useState('1.5')
  const [daysPerWeek, setDaysPerWeek] = useState('5')

  const rate = parseFloat(hourlyRate) || 0
  const regular = parseFloat(regularHours) || 0
  const overtime = parseFloat(overtimeHours) || 0
  const otMultiplier = parseFloat(overtimeRate) || 1.5
  const days = parseFloat(daysPerWeek) || 5

  const regularPay = rate * regular
  const overtimePay = rate * otMultiplier * overtime
  const weeklyTotal = regularPay + overtimePay
  const totalHours = regular + overtime

  const annual = weeklyTotal * 52
  const monthly = annual / 12
  const daily = weeklyTotal / days

  const effectiveHourly = totalHours > 0 ? weeklyTotal / totalHours : 0

  const relatedCalculators = [
    { label: 'Salary Calculator', href: '/calculators/salary' },
    { label: 'Hourly to Salary', href: '/calculators/hourly-to-salary' },
    { label: 'Pay Raise Calculator', href: '/calculators/pay-raise' },
  ]

  return (
    <CalculatorLayout
      title="Overtime Calculator"
      description="Calculate your overtime pay at 1.5x or 2x rates. See total weekly, monthly, and annual earnings including overtime."
      relatedCalculators={relatedCalculators}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="input-label">Hourly Rate ($)</label>
            <input type="number" step="0.50" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">Regular Hours per Week</label>
            <input type="number" value={regularHours} onChange={(e) => setRegularHours(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">Overtime Hours per Week</label>
            <input type="number" value={overtimeHours} onChange={(e) => setOvertimeHours(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">Overtime Multiplier</label>
            <select value={overtimeRate} onChange={(e) => setOvertimeRate(e.target.value)} className="input-field">
              <option value="1.5">Time and a half (1.5x)</option>
              <option value="2">Double time (2x)</option>
              <option value="1">Regular rate (1x)</option>
            </select>
          </div>
          <div>
            <label className="input-label">Work Days per Week</label>
            <input type="number" value={daysPerWeek} onChange={(e) => setDaysPerWeek(e.target.value)} className="input-field" />
          </div>
        </div>

        <div className="result-box">
          <div className="result-label">Total Weekly Pay</div>
          <div className="result-value">{formatCurrency(weeklyTotal)}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-3">Regular Pay</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Hours</span><span>{formatNumber(regular, 0)} hrs</span></div>
              <div className="flex justify-between"><span>Rate</span><span>{formatCurrency(rate)}/hr</span></div>
              <div className="flex justify-between border-t pt-2 font-semibold"><span>Weekly</span><span>{formatCurrency(regularPay)}</span></div>
            </div>
          </div>
          <div className="card bg-orange-50 border-orange-200">
            <h3 className="font-semibold text-orange-900 mb-3">Overtime Pay ({otMultiplier}x)</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Hours</span><span>{formatNumber(overtime, 0)} hrs</span></div>
              <div className="flex justify-between"><span>Rate</span><span>{formatCurrency(rate * otMultiplier)}/hr</span></div>
              <div className="flex justify-between border-t pt-2 font-semibold"><span>Weekly</span><span>{formatCurrency(overtimePay)}</span></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Weekly Total</div>
            <div className="text-lg font-semibold">{formatCurrency(weeklyTotal)}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Monthly</div>
            <div className="text-lg font-semibold">{formatCurrency(monthly)}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Annual</div>
            <div className="text-lg font-semibold">{formatCurrency(annual)}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Effective Hourly</div>
            <div className="text-lg font-semibold">{formatCurrency(effectiveHourly)}</div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  )
}
