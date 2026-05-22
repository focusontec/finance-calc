import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Free Financial Calculators - FinanceCalc',
    template: '%s - FinanceCalc',
  },
  description: 'Free online financial calculators for mortgages, loans, investments, retirement, and more. Easy-to-use tools to help you make informed financial decisions.',
  keywords: ['financial calculator', 'mortgage calculator', 'loan calculator', 'investment calculator', 'retirement calculator', 'tax calculator'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'FinanceCalc',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
