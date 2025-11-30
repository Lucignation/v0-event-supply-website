'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // const response = await fetch('/api/auth/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // })

      // const data = await response.json()

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "FORGOT_PASSWORD",
          user: {
            email: email,
            name: "John Doe"
          },
          admin: {
            email: "info@useresuply.com"
          }
        })
      });
      console.log(response)

      const data = await response.json()
      console.log(data)
      

      if (!response.ok) {
        throw new Error(data.message || 'Request failed')
      }

      setSuccess(true)
      setEmail('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 py-12 bg-secondary">
        <div className="container mx-auto px-4 max-w-md">
          <Card className="p-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Reset Password</h1>
            <p className="text-foreground/70 mb-6">Enter your email address and we'll send you a password reset link.</p>

            {success ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg mb-6">
                <p className="font-semibold mb-2">Check your email!</p>
                <p className="text-sm">We've sent you a password reset link. Please check your email and follow the instructions.</p>
              </div>
            ) : null}

            {error ? (
              <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-6 text-sm">
                {error}
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>

            <div className="text-center text-sm text-foreground/70 mt-6">
              <p>Remember your password? <Link href="/login" className="text-primary font-semibold hover:underline">Login here</Link></p>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
