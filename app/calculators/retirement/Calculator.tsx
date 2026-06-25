'use client'

import { useState } from 'react'
import CalculatorLayout from '@/components/CalculatorLayout'
import { formatCurrency, formatPercent } from '@/lib/format'

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState('30')
  const [currentSavings, setCurrentSavings] = useState('50000')
  const [monthlyContribution, setMonthlyContribution] = useState('2000')
  const [expectedReturn, setExpectedReturn] = useState('7')
  const [annualSpending, setAnnualSpending] = useState('50000')
  const [withdrawalRate, setWithdrawalRate] = useState('4')
  const [inflationRate, setInflationRate] = useState('3')
  const [desiredAge, setDesiredAge] = useState('55')

  const age = parseInt(currentAge) || 30
  const savings = parseFloat(currentSavings) || 0
  const contribution = parseFloat(monthlyContribution) || 0
  const returnRate = parseFloat(expectedReturn) || 0
  const spending = parseFloat(annualSpending) || 0
  const withdrawRate = parseFloat(withdrawalRate) || 4
  const inflation = parseFloat(inflationRate) || 0
  const targetAge = parseInt(desiredAge) || 55

  // FIRE number = Annual Spending / Withdrawal Rate
  const fireNumber = spending / (withdrawRate / 100)

  // Inflation-adjusted return
  const realReturn = ((1 + returnRate / 100) / (1 + inflation / 100) - 1) * 100

  // Calculate years to FIRE
  let balance = savings
  let yearsToFire = 0
  const yearlyData: Array<{
    year: number
    age: number
    balance: number
    contribution: number
    growth: number
    reachedFire: boolean
  }> = []

  for (let y = 1; y <= 50; y++) {
    const growth = balance * (returnRate / 100)
    const yearContribution = contribution * 12
    balance += growth + yearContribution

    const reachedFire = balance >= fireNumber
    if (reachedFire && yearsToFire === 0) {
      yearsToFire = y
    }

    yearlyData.push({
      year: y,
      age: age + y,
      balance,
      contribution: yearContribution,
      growth,
      reachedFire,
    })

    if (y >= 50) break
  }

  const fireAge = age + yearsToFire
  const targetYearBalance = yearlyData.find((d) => d.age >= targetAge)?.balance || 0

  // Coast FIRE - amount needed now to reach FIRE by target age without more contributions
  const yearsToTarget = targetAge - age
  const coastFire = yearsToTarget > 0 ? fireNumber / Math.pow(1 + returnRate / 100, yearsToTarget) : 0

  // Barista FIRE - cover expenses with part-time work
  const partTimeIncome = 20000 // Assumed part-time income
  const baristaFireNumber = (spending - partTimeIncome) / (withdrawRate / 100)

  const relatedCalculators = [
    { label: 'Investment Calculator', href: '/calculators/investment' },
    { label: 'Compound Interest Calculator', href: '/calculators/compound-interest' },
    { label: 'Savings Calculator', href: '/calculators/savings' },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much money do I need to retire early (FIRE)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The FIRE number is typically 25 times your annual expenses, based on the 4% safe withdrawal rule. For example, if you spend $50,000 per year, you need $1,250,000. This allows you to withdraw 4% annually with a high probability of your money lasting 30+ years.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the 4% rule for retirement?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The 4% rule states that you can withdraw 4% of your retirement portfolio in the first year, then adjust for inflation each year after, with a high probability your money will last at least 30 years. It is based on historical stock and bond returns backtested over various retirement periods.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is Coast FIRE?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Coast FIRE is when you have enough invested that compound growth alone (without additional contributions) will grow to your full FIRE number by your target retirement age. At that point, you only need to earn enough to cover current expenses.',
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
        title="When Can I Retire? FIRE Calculator"
        description="Calculate when you can achieve financial independence and retire early (FIRE). See your FIRE number, years to retirement, and Coast FIRE milestone."
        relatedCalculators={relatedCalculators}
        educationalContent={
          <div className="card prose prose-sm max-w-none">
            <h2>What is FIRE?</h2>
            <p>
              FIRE stands for Financial Independence, Retire Early. It is a movement focused on
              aggressive saving and investing to achieve financial freedom decades before traditional
              retirement age.
            </p>
            <h3>The 4% Rule (Safe Withdrawal Rate)</h3>
            <p>
              The 4% rule suggests you can safely withdraw 4% of your portfolio annually in retirement.
              This means your FIRE number is 25x your annual expenses. If you spend $40,000/year,
              you need $1,000,000.
            </p>
            <h3>Types of FIRE</h3>
            <ul>
              <li><strong>Lean FIRE:</strong> Retire with minimal expenses ($25-40k/year)</li>
              <li><strong>Fat FIRE:</strong> Retire with comfortable spending ($100k+/year)</li>
              <li><strong>Coast FIRE:</strong> Stop saving, let compound growth do the work</li>
              <li><strong>Barista FIRE:</strong> Semi-retire with part-time work for benefits</li>
            </ul>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Current Age</label>
              <input type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="input-label">Current Savings ($)</label>
              <input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="input-label">Monthly Contribution ($)</label>
              <input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="input-label">Expected Annual Return (%)</label>
              <input type="number" step="0.5" value={expectedReturn} onChange={(e) => setExpectedReturn(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="input-label">Annual Spending in Retirement ($)</label>
              <input type="number" value={annualSpending} onChange={(e) => setAnnualSpending(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="input-label">Safe Withdrawal Rate (%)</label>
              <input type="number" step="0.1" value={withdrawalRate} onChange={(e) => setWithdrawalRate(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="input-label">Inflation Rate (%)</label>
              <input type="number" step="0.5" value={inflationRate} onChange={(e) => setInflationRate(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="input-label">Desired Retirement Age</label>
              <input type="number" value={desiredAge} onChange={(e) => setDesiredAge(e.target.value)} className="input-field" />
            </div>
          </div>

          {/* FIRE Number */}
          <div className="result-box text-center">
            <div className="result-label">Your FIRE Number</div>
            <div className="result-value text-4xl">{formatCurrency(fireNumber)}</div>
            <div className="text-sm text-gray-500 mt-1">25x your annual spending</div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-700">{yearsToFire > 0 ? fireAge : 'N/A'}</div>
              <div className="text-sm text-green-600">FIRE Age</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-700">{yearsToFire > 0 ? yearsToFire : 'N/A'}</div>
              <div className="text-sm text-blue-600">Years to FIRE</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-700">{formatPercent(realReturn, 1)}</div>
              <div className="text-sm text-purple-600">Real Return</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-700">{formatCurrency(contribution * 12)}</div>
              <div className="text-sm text-orange-600">Annual Savings</div>
            </div>
          </div>

          {/* FIRE Variants */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card text-center">
              <h4 className="font-semibold text-gray-900 mb-2">Coast FIRE</h4>
              <div className="text-2xl font-bold text-blue-600">{formatCurrency(coastFire)}</div>
              <p className="text-xs text-gray-500 mt-1">Amount needed now to reach FIRE by age {targetAge}</p>
              <p className="text-xs text-gray-500">{savings >= coastFire ? 'You have reached Coast FIRE!' : `${formatCurrency(coastFire - savings)} more needed`}</p>
            </div>
            <div className="card text-center">
              <h4 className="font-semibold text-gray-900 mb-2">Barista FIRE</h4>
              <div className="text-2xl font-bold text-orange-600">{formatCurrency(baristaFireNumber)}</div>
              <p className="text-xs text-gray-500 mt-1">With ${formatCurrency(partTimeIncome)}/yr part-time income</p>
            </div>
            <div className="card text-center">
              <h4 className="font-semibold text-gray-900 mb-2">Portfolio at Age {targetAge}</h4>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(targetYearBalance)}</div>
              <p className="text-xs text-gray-500 mt-1">
                {targetYearBalance >= fireNumber ? 'You\'ll reach FIRE by then!' : `${formatPercent(((targetYearBalance / fireNumber) * 100), 0)} of FIRE number`}
              </p>
            </div>
          </div>

          {/* Year by Year */}
          <div>
            <h3 className="font-semibold mb-3">Portfolio Growth Projection</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-3 py-2 text-left font-medium text-gray-700">Year</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-700">Age</th>
                    <th className="px-3 py-2 text-right font-medium text-gray-700">Contributions</th>
                    <th className="px-3 py-2 text-right font-medium text-gray-700">Growth</th>
                    <th className="px-3 py-2 text-right font-medium text-gray-700">Balance</th>
                    <th className="px-3 py-2 text-center font-medium text-gray-700">FIRE?</th>
                  </tr>
                </thead>
                <tbody>
                  {yearlyData.filter((_, i) => i % 5 === 0 || yearlyData[i].reachedFire).map((row) => (
                    <tr key={row.year} className={`border-t border-gray-100 ${row.reachedFire ? 'bg-green-50' : ''}`}>
                      <td className="px-3 py-2">{row.year}</td>
                      <td className="px-3 py-2">{row.age}</td>
                      <td className="px-3 py-2 text-right">{formatCurrency(row.contribution)}</td>
                      <td className="px-3 py-2 text-right text-green-600">{formatCurrency(row.growth)}</td>
                      <td className="px-3 py-2 text-right font-semibold">{formatCurrency(row.balance)}</td>
                      <td className="px-3 py-2 text-center">
                        {row.reachedFire ? <span className="text-green-600 font-bold">Yes</span> : <span className="text-gray-400">-</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Savings Rate */}
          <div className="card">
            <h3 className="font-semibold mb-3">Savings Rate Analysis</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{formatPercent(spending > 0 ? (contribution * 12 / (contribution * 12 + spending)) * 100 : 0, 0)}</div>
                <div className="text-sm text-gray-500">Savings Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{formatCurrency(contribution * 12)}</div>
                <div className="text-sm text-gray-500">Annual Savings</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{formatCurrency(spending)}</div>
                <div className="text-sm text-gray-500">Annual Spending</div>
              </div>
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </>
  )
}
