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

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '10', 10)
    const search = searchParams.get('search') || ''

    // Validate pagination params
    if (page < 1 || limit < 1 || limit > 100) {
      return NextResponse.json(
        { message: 'Invalid pagination parameters' },
        { status: 400 }
      )
    }

    const offset = (page - 1) * limit

    // Build search condition
    const searchCondition = search
      ? `AND (
          u.full_name ILIKE $3 OR 
          u.business_name ILIKE $3 OR
          b.event_type ILIKE $3 OR
          b.status ILIKE $3
        )`
      : ''

    const searchParam = search ? `%${search}%` : ''

    // Count total bookings
    const countQuery = `
      SELECT COUNT(*) as count
      FROM public.bookings b
      JOIN public.users u ON b.user_id = u.id
      WHERE b.user_id = $1
      ${searchCondition}
    `
    const countParams = search ? [userId, searchParam] : [userId]
    const countResult = await query(countQuery, countParams)
    const total = parseInt(countResult.rows[0]?.count || '0', 10)

    // Get paginated bookings
    const bookingsQuery = `
      SELECT b.*, 
             u.full_name as caterer_name, 
             u.business_name
      FROM public.bookings b
      JOIN public.users u ON b.user_id = u.id
      WHERE b.user_id = $1
      ${searchCondition}
      ORDER BY b.created_at DESC
      LIMIT $${search ? '3' : '2'} OFFSET $${search ? '4' : '3'}
    `
    
    const bookingsParams = search 
      ? [userId, searchParam, limit, offset]
      : [userId, limit, offset]
    
    const result = await query(bookingsQuery, bookingsParams)

    // Calculate pagination metadata
    const totalPages = Math.ceil(total / limit)

    return NextResponse.json(
      {
        bookings: result.rows,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      },
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
