'use client'

import Link from 'next/link'
import { useState } from 'react'

const navItems = [
  {
    label: 'Mortgage & Loans',
    href: '#',
    children: [
      { label: 'How Much House Can I Afford', href: '/calculators/house-affordability' },
      { label: 'Rent vs Buy Calculator', href: '/calculators/rent-vs-buy' },
      { label: 'Mortgage Calculator', href: '/calculators/mortgage' },
      { label: 'Loan Calculator', href: '/calculators/loan' },
      { label: 'Auto Loan Calculator', href: '/calculators/auto-loan' },
      { label: 'Amortization Calculator', href: '/calculators/amortization' },
      { label: 'Mortgage Payoff Calculator', href: '/calculators/mortgage-payoff' },
      { label: 'Refinance Calculator', href: '/calculators/refinance' },
    ],
  },
  {
    label: 'Investment & Savings',
    href: '#',
    children: [
      { label: 'When Can I Retire (FIRE)', href: '/calculators/retirement' },
      { label: 'Compound Interest Calculator', href: '/calculators/compound-interest' },
      { label: 'Investment Calculator', href: '/calculators/investment' },
      { label: 'Savings Calculator', href: '/calculators/savings' },
      { label: 'ROI Calculator', href: '/calculators/roi' },
      { label: 'CD Calculator', href: '/calculators/cd' },
      { label: 'Inflation Calculator', href: '/calculators/inflation' },
    ],
  },
  {
    label: 'Salary & Income',
    href: '#',
    children: [
      { label: 'Salary Calculator', href: '/calculators/salary' },
      { label: 'Hourly to Salary', href: '/calculators/hourly-to-salary' },
      { label: 'Pay Raise Calculator', href: '/calculators/pay-raise' },
      { label: 'Overtime Calculator', href: '/calculators/overtime' },
    ],
  },
  {
    label: 'Other Tools',
    href: '#',
    children: [
      { label: 'Currency Converter', href: '/calculators/currency-converter' },
      { label: 'Credit Card Payoff', href: '/calculators/credit-card-payoff' },
      { label: 'Debt Payoff Calculator', href: '/calculators/debt-payoff' },
      { label: 'Net Worth Calculator', href: '/calculators/net-worth' },
    ],
  },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-600">Finance</span>
            <span className="text-2xl font-bold text-gray-900">Calc</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => setOpenDropdown(index)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-md hover:bg-gray-50 transition-colors">
                  {item.label}
                  <svg className="inline-block ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openDropdown === index && (
                  <div className="absolute left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {item.children.map((child, childIndex) => (
                      <Link
                        key={childIndex}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-gray-200">
            {navItems.map((item, index) => (
              <div key={index} className="mb-2">
                <div className="px-3 py-2 text-sm font-semibold text-gray-900">{item.label}</div>
                {item.children.map((child, childIndex) => (
                  <Link
                    key={childIndex}
                    href={child.href}
                    className="block px-6 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
