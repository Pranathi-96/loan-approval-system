"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock authentication - in a real app, you'd validate against a backend
    if (username === "user" && password === "password") {
      // Set a mock token in localStorage
      localStorage.setItem("authToken", "mock-jwt-token")
      router.push("/predictor")
    } else {
      alert("Invalid credentials")
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 space-y-8">
        <h1 className="text-3xl font-bold text-center text-indigo-800">AI Loan Approval System</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </main>
  )
}

