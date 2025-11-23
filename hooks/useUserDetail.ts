// hooks/useBookings.ts
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useUserDetail() {
  const router = useRouter()
  return useQuery({
    queryKey: ["userDetail"],
    queryFn: async () => {
      const res = await fetch("/api/user");
      if(res.status === 401){
        router.push('/login')
      }
      if (!res.ok) toast.error("Failed to fetch user detail");
      return res.json();
    }
  });
}
