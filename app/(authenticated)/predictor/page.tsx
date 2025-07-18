"use client"
import { useRouter } from "next/navigation"
import LoanApplicationForm from "@/components/loan-application-form"
import { predictLoanApproval } from "@/utils/mock-ml-model"

export default function PredictorPage() {
  const router = useRouter()

  const handleSubmit = (formData: Record<string, string | number>) => {
    const result = predictLoanApproval(formData)
    router.push(`/results?probability=${result}&data=${JSON.stringify(formData)}`)
  }

  return (
    <div className="bg-white rounded-xl shadow-2xl p-8 space-y-8">
      <h1 className="text-3xl font-bold text-center text-indigo-800">Loan Application</h1>
      <LoanApplicationForm onSubmit={handleSubmit} />
    </div>
  )
}

