// app/api/bookings/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { BookingRepository } from '@/lib/repositories/bookings';
import { verifyToken } from '@/lib/auth';
import { ProductRepository } from '@/lib/repositories/products';

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

    const userId = (decoded as any).userId;

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

    // ✨ Clean and simple
    const { bookings, total } = await BookingRepository.findAll(page, limit);

    // Calculate pagination metadata
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return NextResponse.json({ bookings, 
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      } 
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching bookings.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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

    const allProducts = await ProductRepository.findAll(1, 500);

    const itemsArray = Object.entries(body.products).map(([productId, quantity]) => ({
        productId,
        quantity: Number(quantity),
        unitPrice: allProducts.products.find(p => p.id === productId)?.price || 0 // map from your product price list
      }));

    const booking = await BookingRepository.create({
      userId,
      eventType: body.eventType,
      eventDate: body.eventDate,
      eventTime: body.eventTime,
      guestCount: body.guestCount,
      location: body.location,
      address: body.address,
      totalAmount: body.totalAmount,
      notes: body.notes,
      items: itemsArray,
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { message: 'An error occurred while creating booking' },
      { status: 500 }
    );
  }
}