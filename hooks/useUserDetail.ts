// hooks/useBookings.ts
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUserDetail() {
  return useQuery({
    queryKey: ["userDetail"],
    queryFn: async () => {
      const res = await fetch("/api/user");
      if (!res.ok) toast.error("Failed to fetch user detail");
      return res.json();
    }
  });
}
