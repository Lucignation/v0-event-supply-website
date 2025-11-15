// lib/repositories/products.ts
import { queryRows, queryOne } from '@/lib/db';

export interface Product {
  id: string;
  name: string;
  description?: string;
  category: string;
  price: number;
  stock: number;
  created_at: Date;
  updated_at: Date;
}

export const ProductRepository = {
  async findAll(): Promise<Product[]> {
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
  }): Promise<Product> {
    return queryOne<Product>(
      `INSERT INTO public.products (name, description, category, price, stock, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
       RETURNING *`,
      [data.name, data.description, data.category, data.price, data.stock]
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