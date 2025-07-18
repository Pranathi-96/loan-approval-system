"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { predictLoanApproval } from "../utils/mock-ml-model"

interface WhatIfCalculatorProps {
  initialData: Record<string, string | number>
}

export default function WhatIfCalculator({ initialData }: WhatIfCalculatorProps) {
  const [formData, setFormData] = useState(initialData)
  const [whatIfResult, setWhatIfResult] = useState<number | null>(null)

  const handleChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCalculate = () => {
    const result = predictLoanApproval(formData)
    setWhatIfResult(result)
  }

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">What-If Calculator</h2>
      <p className="mb-4 text-gray-600">Adjust the values to see how they affect your loan approval chances.</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="income">Income (Monthly)</Label>
          <Slider
            id="income"
            min={1000}
            max={10000}
            step={100}
            value={[Number(formData.income)]}
            onValueChange={(value) => handleChange("income", value[0])}
          />
          <div className="mt-2 text-sm text-gray-600">${formData.income}</div>
        </div>
        <div>
          <Label htmlFor="loanAmount">Loan Amount</Label>
          <Slider
            id="loanAmount"
            min={10000}
            max={500000}
            step={10000}
            value={[Number(formData.loanAmount)]}
            onValueChange={(value) => handleChange("loanAmount", value[0])}
          />
          <div className="mt-2 text-sm text-gray-600">${formData.loanAmount}</div>
        </div>
        <div>
          <Label htmlFor="creditHistory">Credit History</Label>
          <Select
            value={formData.creditHistory.toString()}
            onValueChange={(value) => handleChange("creditHistory", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select credit history" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">No credit history</SelectItem>
              <SelectItem value="1">Has credit history</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="education">Education</Label>
          <Select value={formData.education.toString()} onValueChange={(value) => handleChange("education", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select education level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Graduate">Graduate</SelectItem>
              <SelectItem value="Not Graduate">Not Graduate</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={handleCalculate} className="mt-4">
        Calculate
      </Button>
      {whatIfResult !== null && (
        <div className="mt-4">
          <p className="font-semibold">New Approval Probability:</p>
          <p className="text-2xl font-bold">{(whatIfResult * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  )
}

