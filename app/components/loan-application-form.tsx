import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { InfoIcon } from "lucide-react"
import { predictLoanApproval } from "../utils/mock-ml-model"

type FormData = Record<string, string | number>

interface LoanApplicationFormProps {
  onSubmit: (formData: FormData) => void
}

const steps = ["Personal Info", "Loan Details", "Additional Info"]

export default function LoanApplicationForm({ onSubmit }: LoanApplicationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    income: 3000,
    creditHistory: "",
    loanAmount: 100000,
    loanTerm: 120,
    education: "",
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
            <Label htmlFor="income" className="flex items-center">
              Income (Monthly) {renderTooltip("Your monthly income affects your loan eligibility")}
            </Label>
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
            <Label htmlFor="creditHistory" className="flex items-center">
              Credit History {renderTooltip("Your credit history is crucial for loan approval")}
            </Label>
            <Select onValueChange={(value) => handleChange("creditHistory", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select credit history" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">No credit history</SelectItem>
                <SelectItem value="1">Has credit history</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {currentStep === 1 && (
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
        </>
      )}

      {currentStep === 2 && (
        <>
          <div>
            <Label htmlFor="education" className="flex items-center">
              Education {renderTooltip("Your education level may affect loan approval")}
            </Label>
            <Select onValueChange={(value) => handleChange("education", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select education level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Graduate">Graduate</SelectItem>
                <SelectItem value="Not Graduate">Not Graduate</SelectItem>
              </SelectContent>
            </Select>
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
                <SelectItem value="Semiurban">Semiurban</SelectItem>
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

