// lib/repositories/products.ts
import { queryRows, queryOne } from '@/lib/db';

export interface Product {
  id: string;
  name: string;
  description?: string;
  category: string;
  price: number;
  stock: number;
  image_url?: string;
  created_at: Date;
  updated_at: Date;
}

export const ProductRepository = {
  async findAll(page: number = 1, limit: number = 10): Promise<{ products: Product[], total: number }> {
    const offset = (page - 1) * limit;
    
    // Count total products (not bookings!)
    const countResult = await queryRows<{ count: string }>(
      `SELECT COUNT(*) as count FROM public.products`
    );
    const total = parseInt(countResult[0]?.count || '0', 10);
    
    // Get paginated products
    const products = await queryRows<Product>(
      `SELECT * FROM public.products 
       ORDER BY name 
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    return { products, total };
  },

  // Optional: Add a method to get all products without pagination
  async findAllNoPagination(): Promise<Product[]> {
    return queryRows<Product>(
      'SELECT * FROM public.products ORDER BY name'
    );
  },

  async findByCategory(category: string): Promise<Product[]> {
    return queryRows<Product>(
      'SELECT * FROM public.products WHERE category = $1 ORDER BY name',
      [category]
    );
  },

  async findById(productId: string): Promise<Product | null> {
    return queryOne<Product>(
      'SELECT * FROM public.products WHERE id = $1',
      [productId]
    );
  },

  async search(searchTerm: string): Promise<Product[]> {
    return queryRows<Product>(
      `SELECT * FROM public.products 
       WHERE name ILIKE $1 OR description ILIKE $1
       ORDER BY name`,
      [`%${searchTerm}%`]
    );
  },

  async create(data: {
    name: string;
    description?: string;
    category: string;
    price: number;
    stock: number;
    image_url?: string;
  }): Promise<Product> {
    return queryOne<Product>(
      `INSERT INTO public.products (name, description, category, price, stock, image_url, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
       RETURNING *`,
      [data.name, data.description, data.category, data.price, data.stock, data.image_url]
    ) as Promise<Product>;
  },

  async updateStock(productId: string, quantity: number): Promise<Product | null> {
    return queryOne<Product>(
      `UPDATE public.products 
       SET stock = stock + $1, updated_at = NOW()
       WHERE id = $2
       RETURNING *`,
      [quantity, productId]
    );
  },

  async delete(productId: string): Promise<boolean> {
    const result = await queryRows(
      'DELETE FROM public.products WHERE id = $1 RETURNING id',
      [productId]
    );
    return result.length > 0;
  },

  async updatePricing(data: {
    id: string;
    price: number;
    stock: number;
    name: string;
  }): Promise<Product | null> {
    return queryOne<Product>(
      `UPDATE public.products 
       SET price = $1, stock = $2, name = $3, updated_at = NOW()
       WHERE id = $4
       RETURNING *`,
      [data.price, data.stock, data.name, data.id]
    );
  },
};