"use client";

import { authClient } from "@/lib/auth/auth-client";
import { Button } from "./ui/button";
import { useRouter } from "next/dist/client/components/navigation";


export default function Logout() {
    const router = useRouter();

    async function handleLogout() {
        await authClient.signOut();
        router.push('/sign-in');
        router.refresh();
        
        // Optionally, you can add additional logic here, such as redirecting the user
      }

  return (
    <span 
      className="font-bol size=sm mx-0 cursor-pointer"
      onClick={() => handleLogout()}
    >
      logout
    </span>
  );
}
