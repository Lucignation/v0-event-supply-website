import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // TODO: Fetch bookings from database for authenticated user
    
    const mockBookings = [
      {
        id: 'BK-1',
        eventType: 'Wedding',
        eventDate: '2025-12-15',
        totalAmount: 50000,
        status: 'pending',
      },
      {
        id: 'BK-2',
        eventType: 'Corporate Event',
        eventDate: '2025-11-20',
        totalAmount: 35000,
        status: 'completed',
      },
    ]

    return NextResponse.json(
      { bookings: mockBookings },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { message: 'An error occurred while fetching bookings' },
      { status: 500 }
    )
  }
}
