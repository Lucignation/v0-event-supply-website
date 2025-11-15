import { NextRequest, NextResponse } from 'next/server';
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

    // ✨ Clean and simple
    const products = await ProductRepository.findAll();

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching products.' },
      { status: 500 }
    );
  }
}
