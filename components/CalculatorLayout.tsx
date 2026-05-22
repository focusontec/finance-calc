import Link from 'next/link'

interface RelatedCalculator {
  label: string
  href: string
}

interface CalculatorLayoutProps {
  title: string
  description: string
  children: React.ReactNode
  relatedCalculators?: RelatedCalculator[]
  educationalContent?: React.ReactNode
}

export default function CalculatorLayout({
  title,
  description,
  children,
  relatedCalculators,
  educationalContent,
}: CalculatorLayoutProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <ol className="flex items-center space-x-2 text-gray-500">
          <li><Link href="/" className="hover:text-primary-600">Home</Link></li>
          <li><span className="mx-2">/</span></li>
          <li className="text-gray-900 font-medium">{title}</li>
        </ol>
      </nav>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-3">{title}</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-3xl">{description}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calculator */}
        <div className="lg:col-span-2">
          <div className="card">
            {children}
          </div>

          {/* Educational Content */}
          {educationalContent && (
            <div className="mt-8">
              {educationalContent}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-amber-800 mb-2">Disclaimer</h3>
            <p className="text-xs text-amber-700">
              This calculator is for informational purposes only and should not be considered financial advice.
              Consult with a qualified financial professional before making any financial decisions.
            </p>
          </div>

          {/* Related Calculators */}
          {relatedCalculators && relatedCalculators.length > 0 && (
            <div className="card">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Related Calculators</h3>
              <ul className="space-y-2">
                {relatedCalculators.map((calc, index) => (
                  <li key={index}>
                    <Link
                      href={calc.href}
                      className="text-sm text-primary-600 hover:text-primary-800 hover:underline"
                    >
                      {calc.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
