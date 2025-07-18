type LoanApplicationData = Record<string, string | number>

export function predictLoanApproval(data: LoanApplicationData): number {
  let score = 0

  // Age factor
  const age = Number(data.age)
  if (age >= 25 && age <= 45) score += 0.1
  else if (age > 45) score += 0.05

  // Marital Status factor
  if (data.maritalStatus === "Married") score += 0.05

  // Dependents factor
  const dependents = Number(data.dependents)
  if (dependents <= 2) score += 0.05

  // Education factor
  if (data.education === "Bachelor" || data.education === "Master" || data.education === "PhD") {
    score += 0.1
  } else if (data.education === "HighSchool") {
    score += 0.05
  } else if (data.education === "Illiterate") {
    // No additional score, but we might want to adjust other factors
  }

  // Employment Type factor
  if (data.employmentType === "FullTime") score += 0.1
  else if (data.employmentType === "PartTime" || data.employmentType === "SelfEmployed") score += 0.05

  // Employment Length factor
  const employmentLength = Number(data.employmentLength)
  if (employmentLength > 2) score += 0.1

  // Income factor
  const income = Number(data.income)
  if (income > 7000) score += 0.2
  else if (income > 5000) score += 0.15
  else if (income > 3000) score += 0.1

  // Loan Amount factor
  const loanAmount = Number(data.loanAmount)
  if (loanAmount < 100000) score += 0.1
  else if (loanAmount < 300000) score += 0.05

  // Loan Term factor
  const loanTerm = Number(data.loanTerm)
  if (loanTerm <= 120) score += 0.05

  // Loan Purpose factor
  if (data.loanPurpose === "HomePurchase" || data.loanPurpose === "DebtConsolidation") score += 0.05

  // Credit History factor
  if (data.creditHistory === "1") score += 0.15
  else if (data.creditHistory === "2") score += 0.1

  // Existing Loans factor
  const existingLoans = Number(data.existingLoans)
  if (existingLoans === 0) score += 0.1
  else if (existingLoans <= 2) score += 0.05

  // Monthly Debt factor
  const monthlyDebt = Number(data.monthlyDebt)
  const debtToIncomeRatio = monthlyDebt / income
  if (debtToIncomeRatio < 0.3) score += 0.1
  else if (debtToIncomeRatio < 0.4) score += 0.05

  // Property Value factor
  const propertyValue = Number(data.propertyValue)
  const loanToValueRatio = loanAmount / propertyValue
  if (loanToValueRatio < 0.7) score += 0.1
  else if (loanToValueRatio < 0.8) score += 0.05

  // Property Area factor
  if (data.propertyArea === "Urban" || data.propertyArea === "Suburban") score += 0.05

  // Ensure the score is between 0 and 1
  return Math.min(Math.max(score, 0), 1)
}

