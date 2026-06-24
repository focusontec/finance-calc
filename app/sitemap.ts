import type { MetadataRoute } from 'next'

const baseUrl = 'https://financecalculatoronline.pro'

export default function sitemap(): MetadataRoute.Sitemap {
  const calculators = [
    'amortization',
    'auto-loan',
    'cd',
    'compound-interest',
    'credit-card-payoff',
    'currency-converter',
    'debt-payoff',
    'hourly-to-salary',
    'house-affordability',
    'inflation',
    'investment',
    'loan',
    'mortgage',
    'mortgage-payoff',
    'net-worth',
    'overtime',
    'pay-raise',
    'refinance',
    'rent-vs-buy',
    'retirement',
    'roi',
    'salary',
    'savings',
  ]

  const calculatorEntries: MetadataRoute.Sitemap = calculators.map((slug) => ({
    url: `${baseUrl}/calculators/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...calculatorEntries,
  ]
}
