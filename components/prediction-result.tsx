"use client"

import { motion } from "framer-motion"
import { CheckCircle, XCircle } from "lucide-react"

interface PredictionResultProps {
  probability: number
}

export default function PredictionResult({ probability }: PredictionResultProps) {
  const approvalStatus = probability >= 0.5 ? "Approved" : "Denied"
  const statusColor = probability >= 0.5 ? "text-green-600" : "text-red-600"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 p-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-semibold mb-4">Prediction Result</h2>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg">Loan Approval Probability:</p>
          <p className="text-3xl font-bold">{(probability * 100).toFixed(2)}%</p>
        </div>
        <div className={`text-center ${statusColor}`}>
          {probability >= 0.5 ? <CheckCircle className="w-16 h-16 mb-2" /> : <XCircle className="w-16 h-16 mb-2" />}
          <p className="text-xl font-semibold">{approvalStatus}</p>
        </div>
      </div>
      <motion.div
        className="mt-4 h-4 bg-gray-200 rounded-full overflow-hidden"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
          initial={{ width: 0 }}
          animate={{ width: `${probability * 100}%` }}
          transition={{ duration: 0.5, delay: 1 }}
        ></motion.div>
      </motion.div>
    </motion.div>
  )
}

