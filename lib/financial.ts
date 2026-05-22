// Compound Interest: A = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) - 1) / (r/n)]
export function compoundInterest(
  principal: number,
  annualRate: number,
  years: number,
  compoundingPerYear: number,
  monthlyContribution: number
): { totalBalance: number; totalContributions: number; totalInterest: number } {
  const r = annualRate / 100
  const n = compoundingPerYear
  const t = years
  const periodsPerMonth = n / 12

  let balance = principal
  const totalMonths = t * 12

  for (let month = 0; month < totalMonths; month++) {
    // Apply interest for this month
    const monthlyRate = r / n
    for (let p = 0; p < periodsPerMonth; p++) {
      balance *= (1 + monthlyRate)
    }
    // Add monthly contribution
    balance += monthlyContribution
  }

  const totalContributions = principal + monthlyContribution * totalMonths
  const totalInterest = balance - totalContributions

  return { totalBalance: balance, totalContributions, totalInterest }
}

// Monthly payment for a loan: M = P × [r(1+r)^n] / [(1+r)^n - 1]
export function loanPayment(
  principal: number,
  annualRate: number,
  termYears: number
): { monthlyPayment: number; totalPayment: number; totalInterest: number } {
  const r = annualRate / 100 / 12
  const n = termYears * 12

  if (r === 0) {
    const monthlyPayment = principal / n
    return { monthlyPayment, totalPayment: principal, totalInterest: 0 }
  }

  const monthlyPayment = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
  const totalPayment = monthlyPayment * n
  const totalInterest = totalPayment - principal

  return { monthlyPayment, totalPayment, totalInterest }
}

// Amortization schedule
export function amortizationSchedule(
  principal: number,
  annualRate: number,
  termYears: number,
  extraPayment = 0
): Array<{
  month: number
  payment: number
  principal: number
  interest: number
  balance: number
}> {
  const r = annualRate / 100 / 12
  const n = termYears * 12
  const schedule = []

  let balance = principal
  const basePayment = r === 0
    ? principal / n
    : principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)

  for (let month = 1; month <= n && balance > 0.01; month++) {
    const interest = balance * r
    let principalPayment = basePayment - interest + extraPayment
    if (principalPayment > balance) {
      principalPayment = balance
    }
    const payment = interest + principalPayment
    balance -= principalPayment

    schedule.push({
      month,
      payment: Math.round(payment * 100) / 100,
      principal: Math.round(principalPayment * 100) / 100,
      interest: Math.round(interest * 100) / 100,
      balance: Math.max(0, Math.round(balance * 100) / 100),
    })
  }

  return schedule
}

// ROI calculation
export function calculateROI(
  initialInvestment: number,
  finalValue: number
): { roi: number; netProfit: number } {
  const netProfit = finalValue - initialInvestment
  const roi = (netProfit / initialInvestment) * 100
  return { roi, netProfit }
}

// Salary conversions
export function hourlyToAnnual(hourlyRate: number, hoursPerWeek = 40, weeksPerYear = 52): number {
  return hourlyRate * hoursPerWeek * weeksPerYear
}

export function annualToHourly(annualSalary: number, hoursPerWeek = 40, weeksPerYear = 52): number {
  return annualSalary / (hoursPerWeek * weeksPerYear)
}

export function annualToMonthly(annual: number): number {
  return annual / 12
}

export function annualToWeekly(annual: number): number {
  return annual / 52
}

export function annualToDaily(annual: number, daysPerWeek = 5): number {
  return annual / (52 * daysPerWeek)
}

// Inflation adjustment
export function inflationAdjusted(
  amount: number,
  inflationRate: number,
  years: number
): number {
  return amount / Math.pow(1 + inflationRate / 100, years)
}

// Pay raise calculation
export function payRaise(
  currentSalary: number,
  raisePercent: number
): { newSalary: number; increase: number; monthlyIncrease: number; annualIncrease: number } {
  const increase = currentSalary * (raisePercent / 100)
  const newSalary = currentSalary + increase
  return {
    newSalary,
    increase,
    monthlyIncrease: increase / 12,
    annualIncrease: increase,
  }
}

// Overtime calculation
export function overtimePay(
  hourlyRate: number,
  regularHours: number,
  overtimeHours: number,
  overtimeMultiplier = 1.5
): {
  regularPay: number
  overtimePayAmount: number
  totalPay: number
  weeklyRegular: number
  weeklyOvertime: number
  weeklyTotal: number
} {
  const regularPay = hourlyRate * regularHours
  const overtimePayAmount = hourlyRate * overtimeMultiplier * overtimeHours
  const totalPay = regularPay + overtimePayAmount

  return {
    regularPay,
    overtimePayAmount,
    totalPay,
    weeklyRegular: regularPay,
    weeklyOvertime: overtimePayAmount,
    weeklyTotal: totalPay,
  }
}
