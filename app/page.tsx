import Link from 'next/link'

const calculatorCategories = [
  {
    title: 'Mortgage & Loans',
    icon: '🏠',
    calculators: [
      { name: 'How Much House Can I Afford', href: '/calculators/house-affordability', description: 'Calculate the maximum home price you can afford based on your income and debts.' },
      { name: 'Rent vs Buy Calculator', href: '/calculators/rent-vs-buy', description: 'Compare the total cost of renting vs buying a home over time.' },
      { name: 'Mortgage Calculator', href: '/calculators/mortgage', description: 'Calculate monthly mortgage payments, total interest, and amortization schedules.' },
      { name: 'Loan Calculator', href: '/calculators/loan', description: 'Estimate payments for any loan type with customizable terms and rates.' },
      { name: 'Auto Loan Calculator', href: '/calculators/auto-loan', description: 'Calculate car payments including trade-in value and down payment.' },
      { name: 'Amortization Calculator', href: '/calculators/amortization', description: 'View detailed amortization schedules with payment breakdowns.' },
      { name: 'Mortgage Payoff Calculator', href: '/calculators/mortgage-payoff', description: 'See how extra payments can shorten your mortgage term.' },
      { name: 'Refinance Calculator', href: '/calculators/refinance', description: 'Determine if refinancing saves you money.' },
    ],
  },
  {
    title: 'Investment & Savings',
    icon: '📈',
    calculators: [
      { name: 'When Can I Retire (FIRE)', href: '/calculators/retirement', description: 'Calculate when you can achieve financial independence and retire early.' },
      { name: 'Compound Interest Calculator', href: '/calculators/compound-interest', description: 'See how your money grows with compound interest over time.' },
      { name: 'Investment Calculator', href: '/calculators/investment', description: 'Project investment growth with regular contributions.' },
      { name: 'Savings Calculator', href: '/calculators/savings', description: 'Plan your savings goals with monthly contributions.' },
      { name: 'ROI Calculator', href: '/calculators/roi', description: 'Calculate return on investment for any venture.' },
      { name: 'CD Calculator', href: '/calculators/cd', description: 'Calculate certificate of deposit earnings and yields.' },
      { name: 'Inflation Calculator', href: '/calculators/inflation', description: 'Calculate the impact of inflation on purchasing power.' },
    ],
  },
  {
    title: 'Salary & Income',
    icon: '💰',
    calculators: [
      { name: 'Salary Calculator', href: '/calculators/salary', description: 'Convert between hourly, weekly, monthly, and annual pay.' },
      { name: 'Hourly to Salary', href: '/calculators/hourly-to-salary', description: 'Convert hourly wages to annual salary and vice versa.' },
      { name: 'Pay Raise Calculator', href: '/calculators/pay-raise', description: 'Calculate the impact of a salary increase.' },
      { name: 'Overtime Calculator', href: '/calculators/overtime', description: 'Calculate overtime pay at 1.5x and 2x rates.' },
    ],
  },
  {
    title: 'Other Financial Tools',
    icon: '🔧',
    calculators: [
      { name: 'Currency Converter', href: '/calculators/currency-converter', description: 'Convert between major world currencies.' },
      { name: 'Credit Card Payoff', href: '/calculators/credit-card-payoff', description: 'Plan your credit card debt payoff strategy.' },
      { name: 'Debt Payoff Calculator', href: '/calculators/debt-payoff', description: 'Create a debt payoff plan using snowball or avalanche method.' },
      { name: 'Net Worth Calculator', href: '/calculators/net-worth', description: 'Calculate your total net worth by listing assets and liabilities.' },
    ],
  },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Free Financial Calculators
          </h1>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl">
            Easy-to-use calculators for mortgages, loans, investments, retirement, and more.
            Make informed financial decisions with our free tools.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/calculators/house-affordability" className="btn-secondary">
              How Much House Can I Afford
            </Link>
            <Link href="/calculators/rent-vs-buy" className="btn-secondary">
              Rent vs Buy
            </Link>
            <Link href="/calculators/retirement" className="btn-secondary">
              When Can I Retire
            </Link>
            <Link href="/calculators/mortgage" className="btn-secondary">
              Mortgage Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* Calculator Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {calculatorCategories.map((category, catIndex) => (
          <div key={catIndex} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-3xl">{category.icon}</span>
              {category.title}
            </h2>
            <div className="calculator-grid">
              {category.calculators.map((calc, calcIndex) => (
                <Link key={calcIndex} href={calc.href} className="calculator-card">
                  <h3 className="calculator-card-title">{calc.name}</h3>
                  <p className="calculator-card-desc">{calc.description}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* SEO Content */}
      <section className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use Our Financial Calculators?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Free & Easy to Use</h3>
              <p className="text-sm text-gray-600">
                All our calculators are completely free with no registration required.
                Simply enter your values and get instant results.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Accurate & Reliable</h3>
              <p className="text-sm text-gray-600">
                Our calculators use standard financial formulas and are regularly reviewed
                for accuracy. Results include detailed breakdowns.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Educational Content</h3>
              <p className="text-sm text-gray-600">
                Each calculator includes explanations of the formulas used and helpful
                tips to understand your financial situation better.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
