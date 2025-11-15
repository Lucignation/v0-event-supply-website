// app/api/customers/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { CustomerRepository } from '@/lib/repositories/customers';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const authToken = request.cookies.get('authToken')?.value;
    if (!authToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = await verifyToken(authToken);
    if (!decoded) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    // Get customers with their bookings
    const customers = await CustomerRepository.findAllWithBookings();

    return NextResponse.json({ customers }, { status: 200 });
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching customers' },
      { status: 500 }
    );
  }
}