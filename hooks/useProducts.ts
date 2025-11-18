// hooks/useProducts.ts
import { useQuery } from "@tanstack/react-query";


interface UseProductsParams {
  page?: number;
  limit?: number;
}

export function useProducts({ page = 1, limit = 10 }: UseProductsParams = {}) {
  return useQuery({
    queryKey: ["products", page, limit],
    queryFn: async () => {
      const res = await fetch(`/api/products?page=${page}&limit=${limit}`);
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    }
  });
}
