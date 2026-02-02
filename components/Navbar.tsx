import { Briefcase } from "lucide-react";
import React from "react";
import Logout from "./logout";
import ModeToggle  from "./../components/ThemeToggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Profile from "./profile";
import { getSession } from "@/lib/auth/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default async function Navbar() {

  const session=await getSession(); 
  return (

    <nav className="bg-background border-gray-700  border-b flex justify-between pb-3 items-center">
      <div className="flex items-center gap-2 font-semibold text-foreground px-4  ">
        <Briefcase />
        <p>Job Tracker</p>
      </div>

      <div className="mt-5 flex justify-between gap-6 items-center" >
         <Link href="/">
          <Button variant="ghost" className="font-bold">home</Button>
        </Link>
        {session?.user ? (
          <div className="flex gap-4">
              <Link href="/dashboard">
              <Button className="font-bold" variant="ghost">
                Dashboard
              </Button>
            </Link>
                <Profile /> 
          </div>
        ) : (
        <div className="flex gap-3 items-center justify-between">
          <div>
            <Link href="/sign-in">
              <Button variant="ghost" className="hover:bg-muted-foreground ">
                login
              </Button>
            </Link>
          </div>
            <div>
              <Link href="/sign-up">
                <Button className="bg-foreground  hover:bg-foreground/80">sign Up</Button>
              </Link>
            </div>
        </div>
        )}

      
      </div>

      <div className="m-4">
        <ModeToggle/>
      </div>
    </nav>
  );
}
