type LoanApplicationData = Record<string, string | number>

export function predictLoanApproval(data: LoanApplicationData): number {
  let score = 0

  // Income factor
  const income = Number(data.income)
  if (income > 7000) score += 0.3
  else if (income > 5000) score += 0.25
  else if (income > 3000) score += 0.2
  else score += 0.1

  // Credit history factor
  if (data.creditHistory === "1") score += 0.2

  // Loan amount factor
  const loanAmount = Number(data.loanAmount)
  if (loanAmount < 100000) score += 0.15
  else if (loanAmount < 300000) score += 0.1
  else score += 0.05

  // Loan term factor
  const loanTerm = Number(data.loanTerm)
  if (loanTerm <= 60) score += 0.1
  else if (loanTerm <= 120) score += 0.05

  // Education factor
  if (data.education === "Graduate") score += 0.1

  // Property area factor
  if (data.propertyArea === "Urban") score += 0.1
  else if (data.propertyArea === "Semiurban") score += 0.05

  // Ensure the score is between 0 and 1
  return Math.min(Math.max(score, 0), 1)
}

