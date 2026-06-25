'use client'

import { useState } from 'react'
import CalculatorLayout from '@/components/CalculatorLayout'
import { formatCurrency } from '@/lib/format'

const faqs = [
  {
    question: 'What is net worth?',
    answer: 'Net worth is the total value of everything you own (assets) minus everything you owe (liabilities). It is a snapshot of your financial health at a specific point in time. A positive net worth means you own more than you owe.',
  },
  {
    question: 'How do I calculate my net worth?',
    answer: 'Add up all your assets (cash, investments, property values, vehicles) and subtract all your liabilities (mortgage, loans, credit card debt). The result is your net worth. This calculator does the math for you.',
  },
  {
    question: 'What is a good net worth by age?',
    answer: 'A common guideline is to have your age multiplied by your gross income divided by 10 in net worth. For example, a 35-year-old earning $80,000 should aim for $280,000 in net worth. However, individual circumstances vary greatly.',
  },
  {
    question: 'What is the debt-to-asset ratio?',
    answer: 'The debt-to-asset ratio shows what percentage of your assets is financed by debt. A ratio below 50% is generally considered healthy. Lower is better, as it means you own more of your assets outright.',
  },
]

interface Item {
  name: string
  value: string
}

export default function NetWorthCalculator() {
  const [assets, setAssets] = useState<Item[]>([
    { name: 'Cash & Savings', value: '15000' },
    { name: 'Investments (401k, IRA, Stocks)', value: '50000' },
    { name: 'Home Value', value: '300000' },
    { name: 'Vehicle Value', value: '20000' },
  ])
  const [liabilities, setLiabilities] = useState<Item[]>([
    { name: 'Mortgage Balance', value: '200000' },
    { name: 'Auto Loan', value: '12000' },
    { name: 'Credit Card Debt', value: '3000' },
    { name: 'Student Loans', value: '25000' },
  ])

  const totalAssets = assets.reduce((sum, item) => sum + (parseFloat(item.value) || 0), 0)
  const totalLiabilities = liabilities.reduce((sum, item) => sum + (parseFloat(item.value) || 0), 0)
  const netWorth = totalAssets - totalLiabilities
  const debtToAssetRatio = totalAssets > 0 ? (totalLiabilities / totalAssets) * 100 : 0

  const updateItem = (list: Item[], setList: (items: Item[]) => void, index: number, field: keyof Item, value: string) => {
    const newList = [...list]
    newList[index] = { ...newList[index], [field]: value }
    setList(newList)
  }

  const addItem = (list: Item[], setList: (items: Item[]) => void, defaultName: string) => {
    setList([...list, { name: defaultName, value: '' }])
  }

  const removeItem = (list: Item[], setList: (items: Item[]) => void, index: number) => {
    setList(list.filter((_, i) => i !== index))
  }

  const relatedCalculators = [
    { label: 'Savings Calculator', href: '/calculators/savings' },
    { label: 'Investment Calculator', href: '/calculators/investment' },
    { label: 'Debt Payoff Calculator', href: '/calculators/debt-payoff' },
  ]

  return (
    <CalculatorLayout
      title="Net Worth Calculator"
      description="Calculate your total net worth by listing your assets and liabilities. Track your financial health over time."
      relatedCalculators={relatedCalculators}
      educationalContent={
        <div className="card prose prose-sm max-w-none">
          <h2>Understanding Net Worth</h2>
          <p>
            Your net worth is the difference between what you own (assets) and what you owe (liabilities).
            Tracking net worth over time is one of the best ways to measure financial progress and
            build long-term wealth.
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
      <div className="space-y-8">
        {/* Assets */}
        <div>
          <h3 className="font-semibold text-lg mb-3 text-green-700">Assets (What You Own)</h3>
          {assets.map((item, i) => (
            <div key={i} className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-2 items-end">
              <div className="md:col-span-1">
                <label className="text-xs text-gray-500">Name</label>
                <input type="text" value={item.name} onChange={(e) => updateItem(assets, setAssets, i, 'name', e.target.value)} className="input-field text-sm" />
              </div>
              <div>
                <label className="text-xs text-gray-500">Value ($)</label>
                <input type="number" value={item.value} onChange={(e) => updateItem(assets, setAssets, i, 'value', e.target.value)} className="input-field text-sm" />
              </div>
              <button onClick={() => removeItem(assets, setAssets, i)} className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm">Remove</button>
            </div>
          ))}
          <button onClick={() => addItem(assets, setAssets, 'New Asset')} className="text-green-600 hover:text-green-800 text-sm font-medium">+ Add Asset</button>
        </div>

        {/* Liabilities */}
        <div>
          <h3 className="font-semibold text-lg mb-3 text-red-700">Liabilities (What You Owe)</h3>
          {liabilities.map((item, i) => (
            <div key={i} className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-2 items-end">
              <div className="md:col-span-1">
                <label className="text-xs text-gray-500">Name</label>
                <input type="text" value={item.name} onChange={(e) => updateItem(liabilities, setLiabilities, i, 'name', e.target.value)} className="input-field text-sm" />
              </div>
              <div>
                <label className="text-xs text-gray-500">Balance ($)</label>
                <input type="number" value={item.value} onChange={(e) => updateItem(liabilities, setLiabilities, i, 'value', e.target.value)} className="input-field text-sm" />
              </div>
              <button onClick={() => removeItem(liabilities, setLiabilities, i)} className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm">Remove</button>
            </div>
          ))}
          <button onClick={() => addItem(liabilities, setLiabilities, 'New Liability')} className="text-red-600 hover:text-red-800 text-sm font-medium">+ Add Liability</button>
        </div>

        {/* Results */}
        <div className="result-box text-center">
          <div className="result-label">Your Net Worth</div>
          <div className={`result-value text-4xl ${netWorth >= 0 ? 'text-green-700' : 'text-red-700'}`}>
            {netWorth >= 0 ? '' : '-'}{formatCurrency(Math.abs(netWorth))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-700">{formatCurrency(totalAssets)}</div>
            <div className="text-sm text-green-600">Total Assets</div>
          </div>
          <div className="bg-red-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-700">{formatCurrency(totalLiabilities)}</div>
            <div className="text-sm text-red-600">Total Liabilities</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-700">{debtToAssetRatio.toFixed(1)}%</div>
            <div className="text-sm text-gray-600">Debt-to-Asset Ratio</div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="flex h-8 rounded-lg overflow-hidden">
          <div
            className="bg-green-500 flex items-center justify-center text-white text-xs font-medium"
            style={{ width: `${totalAssets > 0 ? ((totalAssets - totalLiabilities) / totalAssets) * 100 : 100}%` }}
          >
            Equity
          </div>
          <div
            className="bg-red-500 flex items-center justify-center text-white text-xs font-medium"
            style={{ width: `${totalAssets > 0 ? (totalLiabilities / totalAssets) * 100 : 0}%` }}
          >
            Debt
          </div>
        </div>
      </div>
    </CalculatorLayout>
  )
}
