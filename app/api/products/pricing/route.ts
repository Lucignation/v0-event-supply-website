import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { ProductRepository } from '@/lib/repositories/products';

export async function PUT(request: NextRequest) {
    try {
      const authToken = request.cookies.get('authToken')?.value;
      if (!authToken) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }
  
      const decoded = await verifyToken(authToken);
      if (!decoded) {
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
      }
      const body = await request.json();
      const userId = (decoded as any).userId;
      console.log(body)

      const price = Number(body.price);
      const stock = Number(body.stock); 
      console.log(price, stock)

      if (isNaN(price) || isNaN(stock)) {
        return NextResponse.json({ error: "Price or stock is invalid" }, { status: 400 });
      }
      // ✨ Clean and simple
      const products = await ProductRepository.updatePricing({
        id: body.id,
        price: body.price,
        stock: body.stock,
        name: body.name,
      });
  
      return NextResponse.json({ products }, { status: 200 });
    } catch (error) {
      console.error('Error fetching products:', error);
      return NextResponse.json(
        { message: 'An error occurred while fetching products.' },
        { status: 500 }
      );
    }
  }