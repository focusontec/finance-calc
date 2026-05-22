'use client'

import { useState } from 'react'
import CalculatorLayout from '@/components/CalculatorLayout'
import { formatCurrency } from '@/lib/format'
import { loanPayment } from '@/lib/financial'

export default function AutoLoanCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState('35000')
  const [downPayment, setDownPayment] = useState('5000')
  const [tradeInValue, setTradeInValue] = useState('0')
  const [interestRate, setInterestRate] = useState('6.9')
  const [loanTerm, setLoanTerm] = useState('60')
  const [salesTax, setSalesTax] = useState('7')

  const price = parseFloat(vehiclePrice) || 0
  const down = parseFloat(downPayment) || 0
  const tradeIn = parseFloat(tradeInValue) || 0
  const rate = parseFloat(interestRate) || 0
  const term = (parseFloat(loanTerm) || 0) / 12
  const tax = parseFloat(salesTax) || 0

  const taxAmount = (price - tradeIn) * (tax / 100)
  const loanAmount = price + taxAmount - down - tradeIn
  const { monthlyPayment, totalPayment, totalInterest } = loanPayment(Math.max(0, loanAmount), rate, term)

  const relatedCalculators = [
    { label: 'Loan Calculator', href: '/calculators/loan' },
    { label: 'Mortgage Calculator', href: '/calculators/mortgage' },
    { label: 'Amortization Calculator', href: '/calculators/amortization' },
  ]

  return (
    <CalculatorLayout
      title="Auto Loan Calculator"
      description="Calculate your monthly car payment including trade-in value, down payment, and sales tax. Find out how much car you can afford."
      relatedCalculators={relatedCalculators}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="input-label">Vehicle Price ($)</label>
            <input type="number" value={vehiclePrice} onChange={(e) => setVehiclePrice(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">Down Payment ($)</label>
            <input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">Trade-in Value ($)</label>
            <input type="number" value={tradeInValue} onChange={(e) => setTradeInValue(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">Sales Tax Rate (%)</label>
            <input type="number" step="0.1" value={salesTax} onChange={(e) => setSalesTax(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">Interest Rate (%)</label>
            <input type="number" step="0.125" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">Loan Term</label>
            <select value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className="input-field">
              <option value="24">24 months (2 years)</option>
              <option value="36">36 months (3 years)</option>
              <option value="48">48 months (4 years)</option>
              <option value="60">60 months (5 years)</option>
              <option value="72">72 months (6 years)</option>
              <option value="84">84 months (7 years)</option>
            </select>
          </div>
        </div>

        <div className="result-box">
          <div className="result-label">Monthly Payment</div>
          <div className="result-value">{formatCurrency(monthlyPayment)}</div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Vehicle Price</div>
            <div className="text-lg font-semibold">{formatCurrency(price)}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Sales Tax</div>
            <div className="text-lg font-semibold">{formatCurrency(taxAmount)}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Loan Amount</div>
            <div className="text-lg font-semibold">{formatCurrency(Math.max(0, loanAmount))}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Total Interest</div>
            <div className="text-lg font-semibold">{formatCurrency(totalInterest)}</div>
          </div>
        </div>

        <div className="card">
          <h3 className="font-semibold mb-3">Cost Breakdown</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Vehicle Price</span><span>{formatCurrency(price)}</span></div>
            <div className="flex justify-between"><span>+ Sales Tax ({tax}%)</span><span>{formatCurrency(taxAmount)}</span></div>
            <div className="flex justify-between"><span>- Down Payment</span><span className="text-green-600">-{formatCurrency(down)}</span></div>
            <div className="flex justify-between"><span>- Trade-in Value</span><span className="text-green-600">-{formatCurrency(tradeIn)}</span></div>
            <div className="flex justify-between border-t pt-2 font-semibold"><span>= Loan Amount</span><span>{formatCurrency(Math.max(0, loanAmount))}</span></div>
            <div className="flex justify-between border-t pt-2"><span>Total Interest</span><span>{formatCurrency(totalInterest)}</span></div>
            <div className="flex justify-between font-semibold"><span>Total Cost</span><span>{formatCurrency(totalPayment)}</span></div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  )
}
