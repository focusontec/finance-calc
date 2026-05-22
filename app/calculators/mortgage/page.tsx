'use client'

import { useState } from 'react'
import CalculatorLayout from '@/components/CalculatorLayout'
import { formatCurrency, formatPercent, formatNumber } from '@/lib/format'
import { loanPayment, amortizationSchedule } from '@/lib/financial'

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState('400000')
  const [downPayment, setDownPayment] = useState('80000')
  const [downPaymentPercent, setDownPaymentPercent] = useState('20')
  const [interestRate, setInterestRate] = useState('6.5')
  const [loanTerm, setLoanTerm] = useState('30')
  const [propertyTax, setPropertyTax] = useState('5000')
  const [homeInsurance, setHomeInsurance] = useState('1500')
  const [pmi, setPmi] = useState('0')
  const [usePercent, setUsePercent] = useState(true)

  const price = parseFloat(homePrice) || 0
  const dp = usePercent
    ? price * (parseFloat(downPaymentPercent) || 0) / 100
    : parseFloat(downPayment) || 0
  const rate = parseFloat(interestRate) || 0
  const term = parseFloat(loanTerm) || 0
  const tax = parseFloat(propertyTax) || 0
  const insurance = parseFloat(homeInsurance) || 0
  const pmiMonthly = parseFloat(pmi) || 0

  const loanAmount = price - dp
  const { monthlyPayment, totalPayment, totalInterest } = loanPayment(loanAmount, rate, term)
  const monthlyTax = tax / 12
  const monthlyInsurance = insurance / 12
  const totalMonthly = monthlyPayment + monthlyTax + monthlyInsurance + pmiMonthly

  const dpPercent = price > 0 ? (dp / price) * 100 : 0
  const needsPMI = dpPercent < 20

  const schedule = amortizationSchedule(loanAmount, rate, term)

  const relatedCalculators = [
    { label: 'Loan Calculator', href: '/calculators/loan' },
    { label: 'Amortization Calculator', href: '/calculators/amortization' },
    { label: 'Mortgage Payoff Calculator', href: '/calculators/mortgage-payoff' },
    { label: 'Refinance Calculator', href: '/calculators/refinance' },
    { label: 'Auto Loan Calculator', href: '/calculators/auto-loan' },
  ]

  return (
    <CalculatorLayout
      title="Mortgage Calculator"
      description="Calculate your monthly mortgage payment, total interest, and see a full amortization schedule. Includes property tax, insurance, and PMI estimates."
      relatedCalculators={relatedCalculators}
      educationalContent={
        <div className="card prose prose-sm max-w-none">
          <h2>How Mortgage Payments Work</h2>
          <p>
            A mortgage payment typically consists of four components, often called PITI:
          </p>
          <ul>
            <li><strong>Principal:</strong> The amount borrowed that reduces your loan balance over time.</li>
            <li><strong>Interest:</strong> The cost of borrowing money, expressed as an annual rate.</li>
            <li><strong>Taxes:</strong> Property taxes assessed by your local government, collected monthly.</li>
            <li><strong>Insurance:</strong> Homeowner&apos;s insurance to protect against damage or loss.</li>
          </ul>
          <h3>The Mortgage Payment Formula</h3>
          <p>
            The standard mortgage payment formula is: <code>M = P × [r(1+r)^n] / [(1+r)^n - 1]</code>,
            where P is the loan amount, r is the monthly interest rate, and n is the number of payments.
          </p>
          <h3>What is PMI?</h3>
          <p>
            Private Mortgage Insurance (PMI) is typically required when your down payment is less than 20%
            of the home&apos;s value. PMI protects the lender if you default on the loan. Once you reach
            20% equity, you can usually request to have PMI removed.
          </p>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="input-label">Home Price ($)</label>
            <input
              type="number"
              value={homePrice}
              onChange={(e) => setHomePrice(e.target.value)}
              className="input-field"
              placeholder="400000"
            />
          </div>
          <div>
            <label className="input-label">Down Payment</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={usePercent ? downPaymentPercent : downPayment}
                onChange={(e) => {
                  if (usePercent) {
                    setDownPaymentPercent(e.target.value)
                    setDownPayment(String(price * (parseFloat(e.target.value) || 0) / 100))
                  } else {
                    setDownPayment(e.target.value)
                    setDownPaymentPercent(price > 0 ? String(((parseFloat(e.target.value) || 0) / price) * 100) : '0')
                  }
                }}
                className="input-field flex-1"
                placeholder={usePercent ? '20' : '80000'}
              />
              <button
                onClick={() => setUsePercent(!usePercent)}
                className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200"
              >
                {usePercent ? '%' : '$'}
              </button>
            </div>
          </div>
          <div>
            <label className="input-label">Interest Rate (%)</label>
            <input
              type="number"
              step="0.125"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="input-field"
              placeholder="6.5"
            />
          </div>
          <div>
            <label className="input-label">Loan Term (years)</label>
            <select
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              className="input-field"
            >
              <option value="30">30 years</option>
              <option value="20">20 years</option>
              <option value="15">15 years</option>
              <option value="10">10 years</option>
            </select>
          </div>
          <div>
            <label className="input-label">Annual Property Tax ($)</label>
            <input
              type="number"
              value={propertyTax}
              onChange={(e) => setPropertyTax(e.target.value)}
              className="input-field"
              placeholder="5000"
            />
          </div>
          <div>
            <label className="input-label">Annual Home Insurance ($)</label>
            <input
              type="number"
              value={homeInsurance}
              onChange={(e) => setHomeInsurance(e.target.value)}
              className="input-field"
              placeholder="1500"
            />
          </div>
          {needsPMI && (
            <div>
              <label className="input-label">Monthly PMI ($)</label>
              <input
                type="number"
                value={pmi}
                onChange={(e) => setPmi(e.target.value)}
                className="input-field"
                placeholder="0"
              />
            </div>
          )}
        </div>

        {/* Results */}
        <div className="result-box">
          <div className="result-label">Estimated Monthly Payment</div>
          <div className="result-value">{formatCurrency(totalMonthly)}</div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Loan Amount</div>
            <div className="text-lg font-semibold">{formatCurrency(loanAmount)}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Monthly P&I</div>
            <div className="text-lg font-semibold">{formatCurrency(monthlyPayment)}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Total Interest</div>
            <div className="text-lg font-semibold">{formatCurrency(totalInterest)}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Total Cost</div>
            <div className="text-lg font-semibold">{formatCurrency(totalPayment)}</div>
          </div>
        </div>

        {/* Payment Breakdown */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Monthly Payment Breakdown</h3>
          <div className="space-y-2">
            {[
              { label: 'Principal & Interest', value: monthlyPayment, color: 'bg-primary-500' },
              { label: 'Property Tax', value: monthlyTax, color: 'bg-green-500' },
              { label: 'Home Insurance', value: monthlyInsurance, color: 'bg-yellow-500' },
              ...(needsPMI && pmiMonthly > 0 ? [{ label: 'PMI', value: pmiMonthly, color: 'bg-red-500' }] : []),
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <div className="flex-1 text-sm">{item.label}</div>
                <div className="text-sm font-medium">{formatCurrency(item.value)}/mo</div>
                <div className="text-xs text-gray-500 w-16 text-right">
                  {totalMonthly > 0 ? formatNumber((item.value / totalMonthly) * 100, 1) : '0'}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CalculatorLayout>
  )
}
