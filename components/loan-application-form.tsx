"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { InfoIcon } from "lucide-react"
import { predictLoanApproval } from "@/utils/mock-ml-model"

type FormData = Record<string, string | number>

interface LoanApplicationFormProps {
  onSubmit: (formData: FormData) => void
}

const steps = ["Personal Info", "Employment Details", "Loan Details", "Financial Info"]

export default function LoanApplicationForm({ onSubmit }: LoanApplicationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    // Personal Info
    age: 30,
    maritalStatus: "",
    dependents: 0,
    education: "",
    // Employment Details
    employmentType: "",
    employmentLength: 0,
    income: 3000,
    // Loan Details
    loanAmount: 100000,
    loanTerm: 120,
    loanPurpose: "",
    // Financial Info
    creditHistory: "",
    existingLoans: 0,
    monthlyDebt: 0,
    propertyValue: 0,
    propertyArea: "",
  })
  const [currentStep, setCurrentStep] = useState(0)
  const [realTimeApproval, setRealTimeApproval] = useState(0)

  const handleChange = (name: string, value: string | number) => {
    const newFormData = { ...formData, [name]: value }
    setFormData(newFormData)
    updateRealTimeApproval(newFormData)
  }

  const updateRealTimeApproval = (data: FormData) => {
    if (Object.values(data).every((value) => value !== "")) {
      const result = predictLoanApproval(data)
      setRealTimeApproval(result)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onSubmit(formData)
    }
  }

  const renderTooltip = (content: string) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <InfoIcon className="w-4 h-4 ml-1 text-gray-500" />
        </TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between mb-4">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index <= currentStep ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              {index + 1}
            </div>
            <span className="ml-2 text-sm">{step}</span>
          </div>
        ))}
      </div>

      {currentStep === 0 && (
        <>
          <div>
            <Label htmlFor="age" className="flex items-center">
              Age {renderTooltip("Your age may affect loan eligibility")}
            </Label>
            <Slider
              id="age"
              min={18}
              max={80}
              step={1}
              value={[Number(formData.age)]}
              onValueChange={(value) => handleChange("age", value[0])}
            />
            <div className="mt-2 text-sm text-gray-600">{formData.age} years old</div>
          </div>
          <div>
            <Label htmlFor="maritalStatus" className="flex items-center">
              Marital Status {renderTooltip("Your marital status may affect loan terms")}
            </Label>
            <Select onValueChange={(value) => handleChange("maritalStatus", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select marital status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Single">Single</SelectItem>
                <SelectItem value="Married">Married</SelectItem>
                <SelectItem value="Divorced">Divorced</SelectItem>
                <SelectItem value="Widowed">Widowed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="dependents" className="flex items-center">
              Number of Dependents {renderTooltip("Number of people financially dependent on you")}
            </Label>
            <Slider
              id="dependents"
              min={0}
              max={5}
              step={1}
              value={[Number(formData.dependents)]}
              onValueChange={(value) => handleChange("dependents", value[0])}
            />
            <div className="mt-2 text-sm text-gray-600">{formData.dependents}</div>
          </div>
          <div>
            <Label htmlFor="education" className="flex items-center">
              Education {renderTooltip("Your education level may affect loan approval")}
            </Label>
            <Select onValueChange={(value) => handleChange("education", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select education level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Illiterate">Illiterate</SelectItem>
                <SelectItem value="HighSchool">High School</SelectItem>
                <SelectItem value="Bachelor">Bachelor's Degree</SelectItem>
                <SelectItem value="Master">Master's Degree</SelectItem>
                <SelectItem value="PhD">PhD</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {currentStep === 1 && (
        <>
          <div>
            <Label htmlFor="employmentType" className="flex items-center">
              Employment Type {renderTooltip("Your type of employment may affect loan eligibility")}
            </Label>
            <Select onValueChange={(value) => handleChange("employmentType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select employment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FullTime">Full-time</SelectItem>
                <SelectItem value="PartTime">Part-time</SelectItem>
                <SelectItem value="SelfEmployed">Self-employed</SelectItem>
                <SelectItem value="Unemployed">Unemployed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="employmentLength" className="flex items-center">
              Years in Current Job {renderTooltip("Length of time in your current job")}
            </Label>
            <Slider
              id="employmentLength"
              min={0}
              max={40}
              step={1}
              value={[Number(formData.employmentLength)]}
              onValueChange={(value) => handleChange("employmentLength", value[0])}
            />
            <div className="mt-2 text-sm text-gray-600">{formData.employmentLength} years</div>
          </div>
          <div>
            <Label htmlFor="income" className="flex items-center">
              Monthly Income {renderTooltip("Your monthly income affects your loan eligibility")}
            </Label>
            <Slider
              id="income"
              min={0}
              max={20000}
              step={100}
              value={[Number(formData.income)]}
              onValueChange={(value) => handleChange("income", value[0])}
            />
            <div className="mt-2 text-sm text-gray-600">${formData.income}</div>
          </div>
        </>
      )}

      {currentStep === 2 && (
        <>
          <div>
            <Label htmlFor="loanAmount" className="flex items-center">
              Loan Amount {renderTooltip("The amount you wish to borrow")}
            </Label>
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
            <Label htmlFor="loanTerm" className="flex items-center">
              Loan Term (months) {renderTooltip("The duration of the loan in months")}
            </Label>
            <Slider
              id="loanTerm"
              min={12}
              max={360}
              step={12}
              value={[Number(formData.loanTerm)]}
              onValueChange={(value) => handleChange("loanTerm", value[0])}
            />
            <div className="mt-2 text-sm text-gray-600">{formData.loanTerm} months</div>
          </div>
          <div>
            <Label htmlFor="loanPurpose" className="flex items-center">
              Loan Purpose {renderTooltip("The reason for taking the loan")}
            </Label>
            <Select onValueChange={(value) => handleChange("loanPurpose", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select loan purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HomePurchase">Home Purchase</SelectItem>
                <SelectItem value="HomeImprovement">Home Improvement</SelectItem>
                <SelectItem value="DebtConsolidation">Debt Consolidation</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Education">Education</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {currentStep === 3 && (
        <>
          <div>
            <Label htmlFor="creditHistory" className="flex items-center">
              Credit History {renderTooltip("Your credit history is crucial for loan approval")}
            </Label>
            <Select onValueChange={(value) => handleChange("creditHistory", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select credit history" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">No credit history</SelectItem>
                <SelectItem value="1">Good credit history</SelectItem>
                <SelectItem value="2">Fair credit history</SelectItem>
                <SelectItem value="3">Poor credit history</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="existingLoans" className="flex items-center">
              Number of Existing Loans {renderTooltip("The number of loans you currently have")}
            </Label>
            <Slider
              id="existingLoans"
              min={0}
              max={5}
              step={1}
              value={[Number(formData.existingLoans)]}
              onValueChange={(value) => handleChange("existingLoans", value[0])}
            />
            <div className="mt-2 text-sm text-gray-600">{formData.existingLoans}</div>
          </div>
          <div>
            <Label htmlFor="monthlyDebt" className="flex items-center">
              Monthly Debt Payments {renderTooltip("Your total monthly debt payments")}
            </Label>
            <Slider
              id="monthlyDebt"
              min={0}
              max={5000}
              step={100}
              value={[Number(formData.monthlyDebt)]}
              onValueChange={(value) => handleChange("monthlyDebt", value[0])}
            />
            <div className="mt-2 text-sm text-gray-600">${formData.monthlyDebt}</div>
          </div>
          <div>
            <Label htmlFor="propertyValue" className="flex items-center">
              Property Value {renderTooltip("The estimated value of the property")}
            </Label>
            <Slider
              id="propertyValue"
              min={50000}
              max={1000000}
              step={10000}
              value={[Number(formData.propertyValue)]}
              onValueChange={(value) => handleChange("propertyValue", value[0])}
            />
            <div className="mt-2 text-sm text-gray-600">${formData.propertyValue}</div>
          </div>
          <div>
            <Label htmlFor="propertyArea" className="flex items-center">
              Property Area {renderTooltip("The area where the property is located")}
            </Label>
            <Select onValueChange={(value) => handleChange("propertyArea", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select property area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Urban">Urban</SelectItem>
                <SelectItem value="Suburban">Suburban</SelectItem>
                <SelectItem value="Rural">Rural</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      <div className="flex justify-between items-center">
        <Button
          type="button"
          variant="outline"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        <div className="text-center">
          <div className="text-sm font-semibold mb-1">Real-time Approval Chance</div>
          <div className="w-32 h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
              style={{ width: `${realTimeApproval * 100}%` }}
            ></div>
          </div>
          <div className="text-sm mt-1">{(realTimeApproval * 100).toFixed(0)}%</div>
        </div>
        <Button type="submit">{currentStep < steps.length - 1 ? "Next" : "Submit"}</Button>
      </div>
    </form>
  )
}

