import { NextRequest, NextResponse } from 'next/server'
import { execute, query } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const authToken = request.cookies.get('authToken')?.value
    if (!authToken) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const decoded = await verifyToken(authToken)
    if (!decoded) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      )
    }

    const userId = (decoded as any).userId
    const body = await request.json()
    const {
      eventType,
      eventDate,
      eventTime,
      guestCount,
      location,
      address,
      notes,
      items,
      totalAmount,
    } = body

    if (!eventType || !eventDate || !guestCount || !items || !totalAmount) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    const bookingResult = await execute(
      `INSERT INTO public.bookings 
       (user_id, event_type, event_date, event_time, guest_count, location, address, notes, total_amount, status, payment_status, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'pending', 'unpaid', NOW(), NOW())
       RETURNING id`,
      [userId, eventType, eventDate, eventTime, guestCount, location, address, notes, totalAmount]
    )

    const bookingId = bookingResult.rows[0].id

    if (items && items.length > 0) {
      for (const item of items) {
        await execute(
          `INSERT INTO public.booking_items (booking_id, product_id, quantity, unit_price, subtotal, created_at)
           VALUES ($1, $2, $3, $4, $5, NOW())`,
          [bookingId, item.productId, item.quantity, item.unitPrice, item.subtotal]
        )
      }
    }

    return NextResponse.json(
      {
        message: 'Booking created successfully',
        bookingId,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json(
      { message: 'An error occurred while creating the booking' },
      { status: 500 }
    )
  }
}
