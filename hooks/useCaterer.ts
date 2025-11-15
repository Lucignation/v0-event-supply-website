// hooks/useProducts.ts
import { useQuery } from "@tanstack/react-query";

export function useCustomers() {
  return useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const res = await fetch("/api/customers");
      if (!res.ok) throw new Error("Failed to fetch customers");
      return res.json();
    }
  });
}
