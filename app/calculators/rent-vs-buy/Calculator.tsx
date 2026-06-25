'use client'

import { useState } from 'react'
import CalculatorLayout from '@/components/CalculatorLayout'
import { formatCurrency, formatPercent } from '@/lib/format'

export default function RentVsBuyCalculator() {
  // Rent inputs
  const [monthlyRent, setMonthlyRent] = useState('1500')
  const [rentIncrease, setRentIncrease] = useState('3')

  // Buy inputs
  const [homePrice, setHomePrice] = useState('350000')
  const [downPaymentPct, setDownPaymentPct] = useState('20')
  const [interestRate, setInterestRate] = useState('6.5')
  const [loanTerm, setLoanTerm] = useState('30')
  const [propertyTax, setPropertyTax] = useState('1.2')
  const [homeInsurance, setHomeInsurance] = useState('1200')
  const [maintenancePct, setMaintenancePct] = useState('1')
  const [closingCostsPct, setClosingCostsPct] = useState('3')
  const [homeAppreciation, setHomeAppreciation] = useState('3')
  const [sellingCostsPct, setSellingCostsPct] = useState('6')

  // Shared
  const [timeHorizon, setTimeHorizon] = useState('10')
  const [investmentReturn, setInvestmentReturn] = useState('7')
  const [taxRate, setTaxRate] = useState('24')

  const rent = parseFloat(monthlyRent) || 0
  const rentInc = parseFloat(rentIncrease) || 0
  const price = parseFloat(homePrice) || 0
  const downPct = parseFloat(downPaymentPct) || 0
  const rate = parseFloat(interestRate) || 0
  const term = parseInt(loanTerm) || 30
  const propTax = parseFloat(propertyTax) || 0
  const insurance = parseFloat(homeInsurance) || 0
  const maintPct = parseFloat(maintenancePct) || 0
  const closingPct = parseFloat(closingCostsPct) || 0
  const appreciation = parseFloat(homeAppreciation) || 0
  const sellingPct = parseFloat(sellingCostsPct) || 0
  const years = parseInt(timeHorizon) || 10
  const investReturn = parseFloat(investmentReturn) || 0
  const tax = parseFloat(taxRate) || 0

  const downPayment = price * (downPct / 100)
  const loanAmount = price - downPayment
  const closingCosts = price * (closingPct / 100)
  const monthlyRate = rate / 100 / 12
  const totalPayments = term * 12

  const monthlyMortgage = loanAmount > 0 && rate > 0
    ? loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1)
    : 0

  // Calculate year-by-year
  let totalRentCost = 0
  let totalBuyCost = 0
  let homeValue = price
  let mortgageBalance = loanAmount
  let totalMortgagePaid = 0
  let totalInterestPaid = 0
  let totalTaxPaid = 0
  let totalMaintenance = 0
  let breakEvenYear = -1
  let renterInvestment = downPayment + closingCosts // Renter invests the upfront costs
  let currentRent = rent

  const yearData: Array<{
    year: number
    rentCost: number
    buyCost: number
    homeEquity: number
    renterNetWorth: number
  }> = []

  for (let y = 1; y <= years; y++) {
    // Rent costs
    const yearRent = currentRent * 12
    totalRentCost += yearRent
    currentRent *= (1 + rentInc / 100)

    // Renter invests savings (difference between buy cost and rent cost, if positive)
    renterInvestment *= (1 + investReturn / 100)
    // Add monthly savings (if renting is cheaper)
    const avgBuyMonthly = monthlyMortgage + (price * propTax / 100 / 12) + (insurance / 12) + (price * maintPct / 100 / 12)
    const rentSavings = avgBuyMonthly - currentRent
    if (rentSavings > 0) {
      renterInvestment += rentSavings * 12
    }

    // Buy costs for this year
    const yearMortgage = monthlyMortgage * 12
    let yearInterest = 0
    let yearPrincipal = 0
    for (let m = 0; m < 12; m++) {
      const interest = mortgageBalance * monthlyRate
      const principal = monthlyMortgage - interest
      yearInterest += interest
      yearPrincipal += principal
      mortgageBalance -= principal
    }
    const yearPropertyTax = price * (propTax / 100)
    const yearInsurance = insurance
    const yearMaintenance = price * (maintPct / 100)
    const yearDeduction = (yearInterest + yearPropertyTax) * (tax / 100)

    totalMortgagePaid += yearMortgage
    totalInterestPaid += yearInterest
    totalTaxPaid += yearPropertyTax
    totalMaintenance += yearMaintenance

    const yearBuyCost = yearMortgage + yearPropertyTax + yearInsurance + yearMaintenance - yearDeduction
    totalBuyCost += yearBuyCost + (y === 1 ? closingCosts : 0)

    // Home value
    homeValue *= (1 + appreciation / 100)
    const homeEquity = homeValue - Math.max(0, mortgageBalance) - (homeValue * sellingPct / 100)

    // Break even
    if (breakEvenYear === -1 && homeEquity > renterInvestment) {
      breakEvenYear = y
    }

    yearData.push({
      year: y,
      rentCost: totalRentCost,
      buyCost: y === 1 ? totalBuyCost + closingCosts : totalBuyCost,
      homeEquity,
      renterNetWorth: renterInvestment,
    })
  }

  const futureHomeValue = homeValue
  const finalEquity = futureHomeValue - Math.max(0, mortgageBalance) - (futureHomeValue * sellingPct / 100)
  const netBuyCost = totalBuyCost + closingCosts - finalEquity
  const netRentCost = totalRentCost - renterInvestment
  const winner = netBuyCost < netRentCost ? 'buy' : 'rent'

  const relatedCalculators = [
    { label: 'Mortgage Calculator', href: '/calculators/mortgage' },
    { label: 'How Much House Can I Afford', href: '/calculators/house-affordability' },
    { label: 'Refinance Calculator', href: '/calculators/refinance' },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is it better to rent or buy a home?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The answer depends on your local market, how long you plan to stay, and your financial situation. Generally, buying becomes more favorable the longer you stay (5+ years), while renting may be better for short-term stays or in very expensive markets. Our calculator compares total costs over your chosen time horizon.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long do I need to stay for buying to be worth it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The break-even point varies by market but is typically 5-7 years. This depends on home appreciation rates, closing costs, mortgage rates, and rent prices in your area. Our calculator shows the exact break-even year for your situation.',
        },
      },
      {
        '@type': 'Question',
        name: 'What hidden costs should I consider when buying a home?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Beyond the mortgage payment, homeowners pay property taxes, homeowners insurance, maintenance (typically 1-2% of home value annually), HOA fees, and closing costs (2-5% of purchase price). When selling, expect to pay 5-6% in agent commissions and closing costs.',
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
        title="Rent vs Buy Calculator"
        description="Should you rent or buy a home? Compare the total cost of renting vs buying over time, including equity, opportunity cost, and tax benefits."
        relatedCalculators={relatedCalculators}
        educationalContent={
          <div className="card prose prose-sm max-w-none">
            <h2>Renting vs Buying: Key Factors</h2>
            <p>
              The rent vs buy decision is one of the biggest financial choices you&apos;ll make.
              This calculator helps you compare the true cost of each option over time.
            </p>
            <h3>Factors Favoring Buying</h3>
            <ul>
              <li>Home values appreciate over time</li>
              <li>Mortgage interest and property taxes may be tax-deductible</li>
              <li>Fixed-rate mortgages protect against inflation</li>
              <li>Building equity instead of paying a landlord</li>
            </ul>
            <h3>Factors Favoring Renting</h3>
            <ul>
              <li>No maintenance or repair costs</li>
              <li>Flexibility to relocate</li>
              <li>Invest the down payment difference</li>
              <li>No exposure to housing market downturns</li>
            </ul>
          </div>
        }
      >
        <div className="space-y-6">
          {/* Rent Inputs */}
          <div className="card">
            <h3 className="font-semibold mb-3">Renting Costs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="input-label">Monthly Rent ($)</label>
                <input type="number" value={monthlyRent} onChange={(e) => setMonthlyRent(e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="input-label">Annual Rent Increase (%)</label>
                <input type="number" step="0.5" value={rentIncrease} onChange={(e) => setRentIncrease(e.target.value)} className="input-field" />
              </div>
            </div>
          </div>

          {/* Buy Inputs */}
          <div className="card">
            <h3 className="font-semibold mb-3">Buying Costs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="input-label">Home Price ($)</label>
                <input type="number" value={homePrice} onChange={(e) => setHomePrice(e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="input-label">Down Payment (%)</label>
                <input type="number" step="1" value={downPaymentPct} onChange={(e) => setDownPaymentPct(e.target.value)} className="input-field" />
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
                <label className="input-label">Property Tax Rate (%/year)</label>
                <input type="number" step="0.1" value={propertyTax} onChange={(e) => setPropertyTax(e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="input-label">Home Insurance ($/year)</label>
                <input type="number" value={homeInsurance} onChange={(e) => setHomeInsurance(e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="input-label">Maintenance (% of value/year)</label>
                <input type="number" step="0.5" value={maintenancePct} onChange={(e) => setMaintenancePct(e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="input-label">Closing Costs (%)</label>
                <input type="number" step="0.5" value={closingCostsPct} onChange={(e) => setClosingCostsPct(e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="input-label">Home Appreciation (%/year)</label>
                <input type="number" step="0.5" value={homeAppreciation} onChange={(e) => setHomeAppreciation(e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="input-label">Selling Costs (%)</label>
                <input type="number" step="0.5" value={sellingCostsPct} onChange={(e) => setSellingCostsPct(e.target.value)} className="input-field" />
              </div>
            </div>
          </div>

          {/* Shared Inputs */}
          <div className="card">
            <h3 className="font-semibold mb-3">Analysis Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="input-label">Time Horizon (years)</label>
                <input type="number" value={timeHorizon} onChange={(e) => setTimeHorizon(e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="input-label">Investment Return (%)</label>
                <input type="number" step="0.5" value={investmentReturn} onChange={(e) => setInvestmentReturn(e.target.value)} className="input-field" />
                <p className="text-xs text-gray-500 mt-1">Renter&apos;s alternative investment return</p>
              </div>
              <div>
                <label className="input-label">Tax Rate (%)</label>
                <input type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} className="input-field" />
                <p className="text-xs text-gray-500 mt-1">For mortgage interest deduction</p>
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="result-box text-center">
            <div className="result-label">After {years} years, {winner === 'buy' ? 'Buying' : 'Renting'} Wins By</div>
            <div className="result-value text-4xl">
              {formatCurrency(Math.abs(netBuyCost - netRentCost))}
            </div>
          </div>

          {/* Break even */}
          {breakEvenYear > 0 && (
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-green-800 font-semibold">Break-Even Point: Year {breakEvenYear}</div>
              <div className="text-sm text-green-600">Buying becomes better than renting after {breakEvenYear} years</div>
            </div>
          )}

          {/* Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`card ${winner === 'rent' ? 'border-2 border-green-500' : ''}`}>
              <h3 className="font-semibold mb-3">Total Renting Cost</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Total Rent Paid</span><span>{formatCurrency(totalRentCost)}</span></div>
                <div className="flex justify-between"><span>Investment Gains</span><span className="text-green-600">+{formatCurrency(renterInvestment - (downPayment + closingCosts))}</span></div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Net Cost</span>
                  <span>{formatCurrency(netRentCost)}</span>
                </div>
              </div>
            </div>
            <div className={`card ${winner === 'buy' ? 'border-2 border-green-500' : ''}`}>
              <h3 className="font-semibold mb-3">Total Buying Cost</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Mortgage Payments</span><span>{formatCurrency(totalMortgagePaid)}</span></div>
                <div className="flex justify-between"><span>Total Interest</span><span>{formatCurrency(totalInterestPaid)}</span></div>
                <div className="flex justify-between"><span>Property Taxes</span><span>{formatCurrency(totalTaxPaid)}</span></div>
                <div className="flex justify-between"><span>Maintenance</span><span>{formatCurrency(totalMaintenance)}</span></div>
                <div className="flex justify-between"><span>Closing Costs</span><span>{formatCurrency(closingCosts)}</span></div>
                <div className="flex justify-between"><span>Home Equity</span><span className="text-green-600">+{formatCurrency(finalEquity)}</span></div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Net Cost</span>
                  <span>{formatCurrency(netBuyCost)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Year by year table */}
          <div>
            <h3 className="font-semibold mb-3">Year-by-Year Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-3 py-2 text-left font-medium text-gray-700">Year</th>
                    <th className="px-3 py-2 text-right font-medium text-gray-700">Total Rent Paid</th>
                    <th className="px-3 py-2 text-right font-medium text-gray-700">Total Buy Cost</th>
                    <th className="px-3 py-2 text-right font-medium text-gray-700">Home Equity</th>
                    <th className="px-3 py-2 text-right font-medium text-gray-700">Renter Net Worth</th>
                  </tr>
                </thead>
                <tbody>
                  {yearData.map((row) => (
                    <tr key={row.year} className={`border-t border-gray-100 ${row.year === breakEvenYear ? 'bg-green-50' : ''}`}>
                      <td className="px-3 py-2">{row.year}</td>
                      <td className="px-3 py-2 text-right">{formatCurrency(row.rentCost)}</td>
                      <td className="px-3 py-2 text-right">{formatCurrency(row.buyCost)}</td>
                      <td className="px-3 py-2 text-right">{formatCurrency(row.homeEquity)}</td>
                      <td className="px-3 py-2 text-right">{formatCurrency(row.renterNetWorth)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </>
  )
}
