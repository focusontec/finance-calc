'use client'

import { useState } from 'react'
import CalculatorLayout from '@/components/CalculatorLayout'
import { formatCurrency } from '@/lib/format'

const faqs = [
  {
    question: 'What is the debt avalanche method?',
    answer: 'The debt avalanche method prioritizes paying off debts with the highest interest rates first while making minimum payments on all other debts. This method saves the most money in total interest paid over time.',
  },
  {
    question: 'What is the debt snowball method?',
    answer: 'The debt snowball method focuses on paying off the smallest balances first, regardless of interest rate. This provides quick psychological wins that can help maintain motivation, though it may cost more in total interest.',
  },
  {
    question: 'Which is better: snowball or avalanche?',
    answer: 'The avalanche method saves more money mathematically. However, the snowball method has a higher success rate because quick wins provide motivation. Choose the method that you will stick with consistently.',
  },
  {
    question: 'Should I consolidate my debt?',
    answer: 'Debt consolidation can simplify payments and potentially lower your interest rate. It works best when you can secure a lower rate than your average current rate and commit to not accumulating new debt.',
  },
]

interface Debt {
  name: string
  balance: string
  rate: string
  minPayment: string
}

export default function DebtPayoffCalculator() {
  const [debts, setDebts] = useState<Debt[]>([
    { name: 'Credit Card 1', balance: '5000', rate: '22.99', minPayment: '100' },
    { name: 'Credit Card 2', balance: '3000', rate: '18.99', minPayment: '75' },
    { name: 'Personal Loan', balance: '8000', rate: '12.5', minPayment: '200' },
  ])
  const [extraPayment, setExtraPayment] = useState('200')
  const [strategy, setStrategy] = useState<'avalanche' | 'snowball'>('avalanche')

  const extra = parseFloat(extraPayment) || 0

  const parsedDebts = debts.map((d) => ({
    name: d.name,
    balance: parseFloat(d.balance) || 0,
    rate: parseFloat(d.rate) || 0,
    minPayment: parseFloat(d.minPayment) || 0,
  })).filter((d) => d.balance > 0)

  const totalDebt = parsedDebts.reduce((sum, d) => sum + d.balance, 0)
  const totalMinPayment = parsedDebts.reduce((sum, d) => sum + d.minPayment, 0)

  // Simulate payoff
  const simulate = () => {
    const debtList = parsedDebts.map((d) => ({ ...d, remaining: d.balance, paidOff: false, paidOffMonth: 0 }))
    let totalPaid = 0
    let totalInterest = 0
    let month = 0

    while (debtList.some((d) => !d.paidOff) && month < 600) {
      month++
      let availableExtra = extra

      // Sort: avalanche = highest rate first, snowball = lowest balance first
      const active = debtList.filter((d) => !d.paidOff)
      if (strategy === 'avalanche') {
        active.sort((a, b) => b.rate - a.rate)
      } else {
        active.sort((a, b) => a.remaining - b.remaining)
      }

      // Pay minimums
      for (const debt of active) {
        const interest = debt.remaining * (debt.rate / 100 / 12)
        totalInterest += interest
        const principal = Math.min(debt.minPayment - interest, debt.remaining)
        debt.remaining -= Math.max(0, principal)
        totalPaid += Math.min(debt.minPayment, debt.remaining + interest)
      }

      // Apply extra to target
      if (active.length > 0 && availableExtra > 0) {
        const target = active[0]
        const extraApplied = Math.min(availableExtra, target.remaining)
        target.remaining -= extraApplied
        totalPaid += extraApplied
      }

      // Check for paid off debts
      for (const debt of debtList) {
        if (!debt.paidOff && debt.remaining <= 0) {
          debt.paidOff = true
          debt.paidOffMonth = month
          debt.remaining = 0
        }
      }
    }

    return { totalPaid, totalInterest, months: month, debts: debtList }
  }

  const result = simulate()
  const years = Math.floor(result.months / 12)
  const extraMonths = result.months % 12

  const updateDebt = (index: number, field: keyof Debt, value: string) => {
    const newDebts = [...debts]
    newDebts[index] = { ...newDebts[index], [field]: value }
    setDebts(newDebts)
  }

  const addDebt = () => {
    setDebts([...debts, { name: `Debt ${debts.length + 1}`, balance: '', rate: '', minPayment: '' }])
  }

  const removeDebt = (index: number) => {
    setDebts(debts.filter((_, i) => i !== index))
  }

  const relatedCalculators = [
    { label: 'Credit Card Payoff', href: '/calculators/credit-card-payoff' },
    { label: 'Loan Calculator', href: '/calculators/loan' },
  ]

  return (
    <CalculatorLayout
      title="Debt Payoff Calculator"
      description="Create a debt payoff plan using the avalanche (highest interest first) or snowball (lowest balance first) method."
      relatedCalculators={relatedCalculators}
      educationalContent={
        <div className="card prose prose-sm max-w-none">
          <h2>How Debt Payoff Strategies Work</h2>
          <p>
            Two popular strategies exist for paying off multiple debts: the Avalanche method
            (highest interest first) and the Snowball method (lowest balance first). Both
            work by focusing extra payments on one debt while maintaining minimums on others.
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
        {/* Strategy Selection */}
        <div className="flex gap-4">
          <button
            onClick={() => setStrategy('avalanche')}
            className={`flex-1 p-4 rounded-lg border-2 text-left transition-colors ${strategy === 'avalanche' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}
          >
            <div className="font-semibold">Avalanche Method</div>
            <div className="text-sm text-gray-600">Pay highest interest rate first (saves most money)</div>
          </button>
          <button
            onClick={() => setStrategy('snowball')}
            className={`flex-1 p-4 rounded-lg border-2 text-left transition-colors ${strategy === 'snowball' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}
          >
            <div className="font-semibold">Snowball Method</div>
            <div className="text-sm text-gray-600">Pay lowest balance first (quick wins)</div>
          </button>
        </div>

        {/* Debts */}
        <div>
          <h3 className="font-semibold mb-3">Your Debts</h3>
          {debts.map((debt, i) => (
            <div key={i} className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-2 items-end">
              <div>
                <label className="text-xs text-gray-500">Name</label>
                <input type="text" value={debt.name} onChange={(e) => updateDebt(i, 'name', e.target.value)} className="input-field text-sm" />
              </div>
              <div>
                <label className="text-xs text-gray-500">Balance ($)</label>
                <input type="number" value={debt.balance} onChange={(e) => updateDebt(i, 'balance', e.target.value)} className="input-field text-sm" />
              </div>
              <div>
                <label className="text-xs text-gray-500">Rate (%)</label>
                <input type="number" step="0.01" value={debt.rate} onChange={(e) => updateDebt(i, 'rate', e.target.value)} className="input-field text-sm" />
              </div>
              <div>
                <label className="text-xs text-gray-500">Min Payment ($)</label>
                <input type="number" value={debt.minPayment} onChange={(e) => updateDebt(i, 'minPayment', e.target.value)} className="input-field text-sm" />
              </div>
              <button onClick={() => removeDebt(i)} className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm">Remove</button>
            </div>
          ))}
          <button onClick={addDebt} className="mt-2 text-primary-600 hover:text-primary-800 text-sm font-medium">+ Add Another Debt</button>
        </div>

        <div>
          <label className="input-label">Extra Monthly Payment ($)</label>
          <input type="number" value={extraPayment} onChange={(e) => setExtraPayment(e.target.value)} className="input-field" />
        </div>

        {/* Results */}
        <div className="result-box">
          <div className="result-label">Debt-Free In</div>
          <div className="result-value">
            {years > 0 ? `${years} year${years !== 1 ? 's' : ''} ` : ''}{extraMonths} month${extraMonths !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Total Debt</div>
            <div className="text-lg font-semibold">{formatCurrency(totalDebt)}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Total Interest Paid</div>
            <div className="text-lg font-semibold text-red-600">{formatCurrency(result.totalInterest)}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Total Paid</div>
            <div className="text-lg font-semibold">{formatCurrency(result.totalPaid)}</div>
          </div>
        </div>

        {/* Payoff Order */}
        <div>
          <h3 className="font-semibold mb-3">Payoff Order ({strategy === 'avalanche' ? 'Highest Interest First' : 'Lowest Balance First'})</h3>
          <div className="space-y-2">
            {result.debts
              .sort((a, b) => a.paidOffMonth - b.paidOffMonth)
              .map((debt, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-xs font-semibold">{i + 1}</span>
                    <span className="font-medium">{debt.name}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Paid off in month {debt.paidOffMonth} ({Math.floor(debt.paidOffMonth / 12)}y {debt.paidOffMonth % 12}m)
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </CalculatorLayout>
  )
}
