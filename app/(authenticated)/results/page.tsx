"use client"

import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import PredictionResult from "@/components/prediction-result"
import WhatIfCalculator from "@/components/what-if-calculator"
import { Button } from "@/components/ui/button"

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const probability = Number.parseFloat(searchParams.get("probability") || "0")
  const formData = JSON.parse(searchParams.get("data") || "{}")

  const handleNewApplication = () => {
    router.push("/predictor")
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-center text-indigo-800">Loan Application Result</h1>
      <PredictionResult probability={probability} />
      <WhatIfCalculator initialData={formData} />
      <div className="text-center">
        <Button onClick={handleNewApplication}>Start New Application</Button>
      </div>
    </div>
  )
}

