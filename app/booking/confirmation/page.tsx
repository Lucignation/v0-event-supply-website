'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import ProtectedNavigation from '@/components/protected-navigation'

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get('id')

  return (
    <div className="min-h-screen flex flex-col">
      <ProtectedNavigation title="Aquoryx Dashboard" subtitle="Booking Confirmation" />
      <main className="flex-1 py-12 bg-secondary">
        <div className="container mx-auto px-4 max-w-md">
          <Card className="p-8 text-center">
            <div className="text-6xl mb-6">✓</div>
            <h1 className="text-3xl font-bold text-primary mb-2">Booking Confirmed!</h1>
            <p className="text-foreground/70 mb-6">Your order has been successfully placed.</p>

            <div className="bg-accent/10 border border-accent p-4 rounded-lg mb-8">
              <p className="text-sm text-foreground/70 mb-1">Booking Reference:</p>
              <p className="font-mono text-lg font-bold text-primary">{bookingId}</p>
            </div>

            <div className="space-y-3 mb-8 text-left text-sm">
              <div className="flex justify-between">
                <span className="text-foreground/70">Status:</span>
                <span className="font-semibold text-green-600">Pending</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/70">Next Step:</span>
                <span className="font-semibold">Awaiting Confirmation</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Link href="/dashboard" className="flex-1">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  View Dashboard
                </Button>
              </Link>
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full">
                  Go Home
                </Button>
              </Link>
            </div>

            <p className="text-xs text-foreground/60 mt-6">A confirmation email has been sent to your registered email address.</p>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ConfirmationContent />
    </Suspense>
  )
}
