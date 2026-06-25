'use client'

import { useState } from 'react'
import CalculatorLayout from '@/components/CalculatorLayout'
import { formatCurrency, formatPercent } from '@/lib/format'

export default function HouseAffordabilityCalculator() {
  const [annualIncome, setAnnualIncome] = useState('80000')
  const [monthlyDebts, setMonthlyDebts] = useState('500')
  const [downPayment, setDownPayment] = useState('60000')
  const [interestRate, setInterestRate] = useState('6.5')
  const [loanTerm, setLoanTerm] = useState('30')
  const [propertyTaxRate, setPropertyTaxRate] = useState('1.2')
  const [insuranceRate, setInsuranceRate] = useState('0.5')
  const [dtiRatio, setDtiRatio] = useState('36')

  const income = parseFloat(annualIncome) || 0
  const debts = parseFloat(monthlyDebts) || 0
  const down = parseFloat(downPayment) || 0
  const rate = parseFloat(interestRate) || 0
  const term = parseInt(loanTerm) || 30
  const taxRate = parseFloat(propertyTaxRate) || 0
  const insRate = parseFloat(insuranceRate) || 0
  const maxDTI = parseFloat(dtiRatio) || 36

  const monthlyIncome = income / 12
  const monthlyRate = rate / 100 / 12
  const totalPayments = term * 12

  // Max monthly housing payment based on DTI
  const maxMonthlyPayment = monthlyIncome * (maxDTI / 100) - debts

  // Calculate max home price
  // Monthly payment = P&I + Tax + Insurance
  // P&I = Loan * [r(1+r)^n] / [(1+r)^n - 1]
  // Tax = HomePrice * taxRate / 12
  // Insurance = HomePrice * insRate / 12
  // Loan = HomePrice - DownPayment

  let maxHomePrice = 0
  if (rate > 0 && maxMonthlyPayment > 0) {
    // Iterative calculation
    for (let price = 100000; price <= 5000000; price += 1000) {
      const loan = price - down
      if (loan <= 0) continue
      const pi = loan * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1)
      const tax = price * (taxRate / 100) / 12
      const ins = price * (insRate / 100) / 12
      const total = pi + tax + ins
      if (total > maxMonthlyPayment) {
        maxHomePrice = price - 1000
        break
      }
    }
    if (maxHomePrice === 0) maxHomePrice = 5000000
  }

  const loanAmount = Math.max(0, maxHomePrice - down)
  const monthlyPI = loanAmount > 0 && rate > 0
    ? loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1)
    : 0
  const monthlyTax = maxHomePrice * (taxRate / 100) / 12
  const monthlyIns = maxHomePrice * (insRate / 100) / 12
  const totalMonthly = monthlyPI + monthlyTax + monthlyIns
  const frontEndDTI = monthlyIncome > 0 ? (totalMonthly / monthlyIncome) * 100 : 0
  const backEndDTI = monthlyIncome > 0 ? ((totalMonthly + debts) / monthlyIncome) * 100 : 0

  const relatedCalculators = [
    { label: 'Mortgage Calculator', href: '/calculators/mortgage' },
    { label: 'Rent vs Buy Calculator', href: '/calculators/rent-vs-buy' },
    { label: 'Mortgage Payoff Calculator', href: '/calculators/mortgage-payoff' },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much house can I afford based on my salary?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most lenders use the 28/36 rule: your monthly housing payment should not exceed 28% of your gross monthly income, and total debt payments should not exceed 36%. For example, with an $80,000 salary, you could afford a home with a monthly payment of about $1,867 (28% of $6,667 monthly income).',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the 28/36 rule for home affordability?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The 28/36 rule is a guideline used by lenders. The "28" means your housing costs (mortgage, property tax, insurance) should not exceed 28% of your gross monthly income. The "36" means your total debt payments (housing + car loans, credit cards, student loans) should not exceed 36% of gross monthly income.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much down payment do I need to buy a house?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Conventional loans typically require 3-20% down. FHA loans require as little as 3.5% down. VA loans and USDA loans may require 0% down. Putting down less than 20% usually requires Private Mortgage Insurance (PMI), which adds to your monthly cost.',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CalculatorLayout
        title="How Much House Can I Afford?"
        description="Calculate the maximum home price you can afford based on your income, debts, and down payment. Uses the 28/36 rule that lenders use."
        relatedCalculators={relatedCalculators}
        educationalContent={
          <div className="card prose prose-sm max-w-none">
            <h2>The 28/36 Rule Explained</h2>
            <p>
              Lenders use the 28/36 rule to determine how much you can borrow. The front-end ratio (28%)
              limits housing costs, while the back-end ratio (36%) limits total debt obligations.
            </p>
            <h3>What Counts as Housing Costs?</h3>
            <ul>
              <li>Mortgage principal and interest</li>
              <li>Property taxes</li>
              <li>Homeowners insurance</li>
              <li>PMI (if down payment is less than 20%)</li>
              <li>HOA fees (if applicable)</li>
            </ul>
            <h3>Tips to Afford More Home</h3>
            <ul>
              <li>Increase your down payment to reduce the loan amount</li>
              <li>Pay off existing debts to lower your DTI ratio</li>
              <li>Improve your credit score for a lower interest rate</li>
              <li>Consider a longer loan term (30-year vs 15-year)</li>
            </ul>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Annual Household Income ($)</label>
              <input type="number" value={annualIncome} onChange={(e) => setAnnualIncome(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="input-label">Monthly Debt Payments ($)</label>
              <input type="number" value={monthlyDebts} onChange={(e) => setMonthlyDebts(e.target.value)} className="input-field" />
              <p className="text-xs text-gray-500 mt-1">Car loans, student loans, credit cards, etc.</p>
            </div>
            <div>
              <label className="input-label">Down Payment ($)</label>
              <input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="input-label">Interest Rate (%)</label>
              <input type="number" step="0.125" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="input-label">Loan Term</label>
              <select value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className="input-field">
                <option value="30">30 years</option>
                <option value="20">20 years</option>
                <option value="15">15 years</option>
              </select>
            </div>
            <div>
              <label className="input-label">Max DTI Ratio (%)</label>
              <select value={dtiRatio} onChange={(e) => setDtiRatio(e.target.value)} className="input-field">
                <option value="43">43% (FHA max)</option>
                <option value="36">36% (conventional)</option>
                <option value="50">50% (aggressive)</option>
              </select>
            </div>
            <div>
              <label className="input-label">Property Tax Rate (%/year)</label>
              <input type="number" step="0.1" value={propertyTaxRate} onChange={(e) => setPropertyTaxRate(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="input-label">Insurance Rate (%/year)</label>
              <input type="number" step="0.1" value={insuranceRate} onChange={(e) => setInsuranceRate(e.target.value)} className="input-field" />
            </div>
          </div>

          <div className="result-box text-center">
            <div className="result-label">You Can Afford Up To</div>
            <div className="result-value text-4xl">{formatCurrency(maxHomePrice, 'USD')}</div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-xs text-gray-500 mb-1">Loan Amount</div>
              <div className="text-lg font-semibold">{formatCurrency(loanAmount)}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-xs text-gray-500 mb-1">Monthly Payment</div>
              <div className="text-lg font-semibold">{formatCurrency(totalMonthly)}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-xs text-gray-500 mb-1">Front-End DTI</div>
              <div className={`text-lg font-semibold ${frontEndDTI <= 28 ? 'text-green-600' : 'text-red-600'}`}>
                {formatPercent(frontEndDTI, 1)}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-xs text-gray-500 mb-1">Back-End DTI</div>
              <div className={`text-lg font-semibold ${backEndDTI <= 36 ? 'text-green-600' : 'text-red-600'}`}>
                {formatPercent(backEndDTI, 1)}
              </div>
            </div>
          </div>

          {/* Payment Breakdown */}
          <div className="card">
            <h3 className="font-semibold mb-3">Monthly Payment Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Principal & Interest</span>
                <span className="font-semibold">{formatCurrency(monthlyPI)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Property Tax</span>
                <span className="font-semibold">{formatCurrency(monthlyTax)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Homeowners Insurance</span>
                <span className="font-semibold">{formatCurrency(monthlyIns)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between items-center font-semibold">
                <span>Total Monthly</span>
                <span>{formatCurrency(totalMonthly)}</span>
              </div>
            </div>
          </div>

          {/* Visual bar */}
          <div>
            <h3 className="font-semibold mb-3">DTI Breakdown</h3>
            <div className="flex h-8 rounded-lg overflow-hidden mb-2">
              <div
                className="bg-green-500 flex items-center justify-center text-white text-xs font-medium"
                style={{ width: `${Math.min(frontEndDTI, 100)}%` }}
              >
                Housing
              </div>
              <div
                className="bg-orange-500 flex items-center justify-center text-white text-xs font-medium"
                style={{ width: `${Math.min(backEndDTI - frontEndDTI, 100)}%` }}
              >
                Other Debts
              </div>
              <div
                className="bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-medium"
                style={{ width: `${Math.max(100 - backEndDTI, 0)}%` }}
              >
                Available
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>0%</span>
              <span className="text-green-600">28% guideline</span>
              <span className="text-orange-600">36% guideline</span>
              <span>100%</span>
            </div>
          </div>

          {/* Down Payment Analysis */}
          <div className="card">
            <h3 className="font-semibold mb-3">Down Payment Analysis</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{formatPercent(maxHomePrice > 0 ? (down / maxHomePrice) * 100 : 0, 1)}</div>
                <div className="text-sm text-gray-500">Down Payment %</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{formatCurrency(down)}</div>
                <div className="text-sm text-gray-500">Down Payment</div>
              </div>
              <div>
                <div className={`text-2xl font-bold ${down >= maxHomePrice * 0.2 ? 'text-green-600' : 'text-orange-600'}`}>
                  {down >= maxHomePrice * 0.2 ? 'No PMI' : 'PMI Required'}
                </div>
                <div className="text-sm text-gray-500">PMI Status</div>
              </div>
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </>
  )
}
