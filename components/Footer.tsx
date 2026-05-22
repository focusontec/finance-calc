import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">FinanceCalc</h3>
            <p className="text-sm text-gray-400">
              Free online financial calculators to help you make informed decisions about mortgages, loans, investments, and more.
            </p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Mortgage & Loans</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/calculators/mortgage" className="hover:text-white transition-colors">Mortgage Calculator</Link></li>
              <li><Link href="/calculators/loan" className="hover:text-white transition-colors">Loan Calculator</Link></li>
              <li><Link href="/calculators/auto-loan" className="hover:text-white transition-colors">Auto Loan Calculator</Link></li>
              <li><Link href="/calculators/amortization" className="hover:text-white transition-colors">Amortization Calculator</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Investment & Savings</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/calculators/compound-interest" className="hover:text-white transition-colors">Compound Interest</Link></li>
              <li><Link href="/calculators/investment" className="hover:text-white transition-colors">Investment Calculator</Link></li>
              <li><Link href="/calculators/savings" className="hover:text-white transition-colors">Savings Calculator</Link></li>
              <li><Link href="/calculators/roi" className="hover:text-white transition-colors">ROI Calculator</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Salary & Income</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/calculators/salary" className="hover:text-white transition-colors">Salary Calculator</Link></li>
              <li><Link href="/calculators/hourly-to-salary" className="hover:text-white transition-colors">Hourly to Salary</Link></li>
              <li><Link href="/calculators/pay-raise" className="hover:text-white transition-colors">Pay Raise Calculator</Link></li>
              <li><Link href="/calculators/overtime" className="hover:text-white transition-colors">Overtime Calculator</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} FinanceCalc. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 mt-2 md:mt-0">
              Disclaimer: Calculations are for informational purposes only. Not financial advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
