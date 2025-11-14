import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // TODO: Fetch admin data from database
    
    const mockOrders = [
      {
        id: 'BK-001',
        caterer: 'Premium Catering',
        eventType: 'Wedding',
        totalAmount: 50000,
        eventDate: '2025-12-15',
        status: 'pending',
      },
      {
        id: 'BK-002',
        caterer: 'Elite Events',
        eventType: 'Corporate',
        totalAmount: 35000,
        eventDate: '2025-11-20',
        status: 'completed',
      },
      {
        id: 'BK-003',
        caterer: 'Luxury Parties',
        eventType: 'Birthday',
        totalAmount: 25000,
        eventDate: '2025-12-10',
        status: 'pending',
      },
    ]

    const mockProducts = [
      {
        id: 1,
        name: 'Water 500ml',
        price: 100,
        category: 'Water',
        stock: 5000,
      },
      {
        id: 2,
        name: 'Cola 500ml',
        price: 150,
        category: 'Soft Drinks',
        stock: 3000,
      },
      {
        id: 3,
        name: 'Ice Block Large',
        price: 2000,
        category: 'Ice',
        stock: 500,
      },
    ]

    return NextResponse.json(
      { orders: mockOrders, products: mockProducts },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching admin data:', error)
    return NextResponse.json(
      { message: 'An error occurred' },
      { status: 500 }
    )
  }
}
