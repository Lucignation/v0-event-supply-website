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

    const userId = (decoded as any).userId
    if(!userId){
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    // Validate pagination params
    if (page < 1 || limit < 1 || limit > 100) {
      return NextResponse.json(
        { message: 'Invalid pagination parameters' },
        { status: 400 }
      );
    }

    // Get customers with their bookings
    const {customers, total} = await CustomerRepository.findAllWithBookings(page, limit);

    // Calculate pagination metadata
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return NextResponse.json({ customers, pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    } }, { status: 200 });
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching customers' },
      { status: 500 }
    );
  }
}