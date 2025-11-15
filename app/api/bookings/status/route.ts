import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { BookingRepository } from '@/lib/repositories/bookings';

export async function PATCH(request: NextRequest) {
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
    const body = await request.json();

    const booking = await BookingRepository.updateStatus(body.bookingId, body.status);

    return NextResponse.json({ booking }, { status: 200 });
  } catch (error) {
    console.error('Error updating booking status:', error);
    return NextResponse.json(
      { message: 'An error occurred while updating booking status' },
      { status: 500 }
    );
  }
}