// hooks/useProducts.ts
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface UseProductsParams {
  page?: number;
  limit?: number;
}

export function useProducts({ page = 1, limit = 10 }: UseProductsParams = {}) {
    const router = useRouter()
  return useQuery({
    queryKey: ["products", page, limit],
    queryFn: async () => {
      const res = await fetch(`/api/products?page=${page}&limit=${limit}`);
      if(res.status === 401){
        router.push('/login')
      }
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    }
  });
}
