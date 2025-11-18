import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { query } from '@/lib/db';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }  // ✅ params is now a Promise
) {
  try {
    const authToken = request.cookies.get('authToken')?.value;
    if (!authToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = await verifyToken(authToken);
    if (!decoded) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const userId = (decoded as any).userId;
    
    // ✅ Await params before accessing properties
    const params = await context.params;
    const bookingId = params.id;

    const result = await query(
      `SELECT b.*, 
              u.full_name as caterer_name, 
              u.business_name,
              u.phone,
              u.email
       FROM public.bookings b
       JOIN public.users u ON b.user_id = u.id
       WHERE b.id = $1 AND b.user_id = $2`,
      [bookingId, userId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: 'Booking not found' },
        { status: 404 }
      );
    }

    const booking = result.rows[0];

    // Get booking items
    const itemsResult = await query(
      `SELECT bi.*, 
              p.name as product_name,
              p.category,
              p.price as unit_price
       FROM public.booking_items bi
       LEFT JOIN public.products p ON bi.product_id = p.id
       WHERE bi.booking_id = $1
       ORDER BY bi.created_at`,
      [bookingId]
    );

    // Get deliveries
    const deliveriesResult = await query(
      `SELECT d.*,
              r.unit_price
       FROM public.deliveries d
       LEFT JOIN public.booking_items r ON d.booking_id = r.booking_id
       WHERE d.booking_id = $1
       ORDER BY d.created_at DESC`,
      [bookingId]
    );

    console.log({deliveriesResult})

   

    // return NextResponse.json(result.rows[0], { status: 200 });
    return NextResponse.json({
      ...booking,
      booking_items: itemsResult.rows,
      deliveries: deliveriesResult.rows || [],
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching the booking' },
      { status: 500 }
    );
  }
}