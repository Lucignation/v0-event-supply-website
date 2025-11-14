import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
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

    const result = await query(
      `SELECT b.*, u.full_name as caterer_name, u.business_name
       FROM public.bookings b
       JOIN public.users u ON b.user_id = u.id
       WHERE b.user_id = $1
       ORDER BY b.created_at DESC`,
      [userId]
    )

    return NextResponse.json(
      { bookings: result.rows },
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
