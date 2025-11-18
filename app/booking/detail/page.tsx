'use client'

import { Suspense } from 'react'
import BookingDetailContent from '@/components/BookingDetailContent/BookingDetailContent'

export default function BookingDetailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingDetailContent />
    </Suspense>
  )
}