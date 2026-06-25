'use client'

import { useState, useEffect } from 'react'
import CalculatorLayout from '@/components/CalculatorLayout'
import { formatNumber } from '@/lib/format'

const faqs = [
  {
    question: 'How do exchange rates work?',
    answer: 'Exchange rates represent the value of one currency relative to another. They fluctuate based on economic factors like inflation, interest rates, trade balance, and market sentiment. A higher rate means one unit of the base currency buys more of the target currency.',
  },
  {
    question: 'What is the difference between buy and sell rates?',
    answer: 'Banks and exchange services offer two rates: the buy rate (what they pay you for foreign currency) and the sell rate (what they charge you). The difference is the spread, which is how they make money. Always compare rates before exchanging.',
  },
  {
    question: 'Why do exchange rates change?',
    answer: 'Exchange rates change due to supply and demand in the foreign exchange market. Factors include economic indicators, political stability, interest rate differences between countries, and market speculation.',
  },
  {
    question: 'What is the best way to exchange currency?',
    answer: 'For the best rates, use a bank or online exchange service rather than airport kiosks. Credit cards with no foreign transaction fees are convenient for travel. Always check the mid-market rate as a benchmark.',
  },
]

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
]

// Default rates (fallback if JSON fails to load)
const defaultRates: Record<string, number> = {
  USD: 1, EUR: 0.92, GBP: 0.79, JPY: 149.50, CAD: 1.36, AUD: 1.53,
  CHF: 0.88, CNY: 7.24, INR: 83.12, MXN: 17.15, BRL: 4.97, KRW: 1328.50,
}

export default function CurrencyConverterPage() {
  const [amount, setAmount] = useState('1000')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>(defaultRates)
  const [lastUpdated, setLastUpdated] = useState('')

  useEffect(() => {
    fetch('/exchange-rates.json')
      .then(res => res.json())
      .then(data => {
        if (data.rates) {
          setExchangeRates(data.rates)
          setLastUpdated(data.updated || '')
        }
      })
      .catch(() => {
        // Use default rates if fetch fails
      })
  }, [])

  const value = parseFloat(amount) || 0
  const fromRate = exchangeRates[fromCurrency] || 1
  const toRate = exchangeRates[toCurrency] || 1

  const convertedAmount = (value / fromRate) * toRate
  const rate = toRate / fromRate

  const relatedCalculators = [
    { label: 'Inflation Calculator', href: '/calculators/inflation' },
    { label: 'Salary Calculator', href: '/calculators/salary' },
  ]

  return (
    <CalculatorLayout
      title="Currency Converter"
      description="Convert between major world currencies. See real-time exchange rates and calculate equivalent amounts."
      relatedCalculators={relatedCalculators}
      educationalContent={
        <div className="card prose prose-sm max-w-none">
          <h2>How Currency Conversion Works</h2>
          <p>
            Currency conversion uses exchange rates to determine how much one currency is worth
            in terms of another. Rates fluctuate constantly based on economic factors, political
            events, and market sentiment. This converter uses daily-updated rates.
          </p>
          {lastUpdated && (
            <p className="text-xs text-gray-500">
              Last updated: {lastUpdated}
            </p>
          )}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="input-label">Amount</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="input-label">From</label>
            <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} className="input-field">
              {currencies.map((c) => (
                <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="input-label">To</label>
            <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} className="input-field">
              {currencies.map((c) => (
                <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="result-box text-center">
          <div className="text-lg text-gray-600 mb-2">
            {formatNumber(value, 2)} {fromCurrency} =
          </div>
          <div className="result-value text-4xl">
            {formatNumber(convertedAmount, 2)} {toCurrency}
          </div>
        </div>

        <div className="card text-center">
          <p className="text-sm text-gray-600">
            Exchange Rate: 1 {fromCurrency} = {formatNumber(rate, 4)} {toCurrency}
          </p>
          {lastUpdated && (
            <p className="text-xs text-gray-400 mt-2">
              Updated: {lastUpdated}
            </p>
          )}
        </div>

        {/* Quick conversion table */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Conversion</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left font-medium text-gray-700">{fromCurrency}</th>
                  <th className="px-4 py-2 text-right font-medium text-gray-700">{toCurrency}</th>
                </tr>
              </thead>
              <tbody>
                {[1, 5, 10, 25, 50, 100, 500, 1000, 5000, 10000].map((val) => (
                  <tr key={val} className="border-t border-gray-100">
                    <td className="px-4 py-2">{formatNumber(val, 0)} {fromCurrency}</td>
                    <td className="px-4 py-2 text-right font-medium">{formatNumber((val / fromRate) * toRate, 2)} {toCurrency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  )
}
