import { Briefcase } from "lucide-react";
import React from "react";
import ThemeToggle from "./../components/ThemeToggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth/auth";
export default async function Navbar() {
  const session=await getSession(); 
  return (

    <nav className="bg-background border-gray-700  border-b flex justify-between pb-3">
      <div className="flex items-center gap-2 font-semibold text-foreground px-4  ">
        <Briefcase />
        <p>Job Tracker</p>
      </div>

      <div className="mt-5 flex justify-between gap-6">
        {session?.user ? (
          <div>
           <Link href="/api/auth/logout">
              <Button className="hover:bg-muted-foreground ">
                Logout
              </Button>
            </Link>
          </div>
        ) : (
        <div>
          <div>
            <Link href="/sign-in">
              <Button variant="ghost" className="hover:bg-muted-foreground ">
                login
              </Button>
            </Link>
          </div>
            <div>
              <Link href="/sign-up">
                <Button className="bg-foreground">sign Up</Button>
              </Link>
            </div>
        </div>
        )}

       <Link href="/">
          <Button>home</Button>
        </Link>
      </div>

      <div className="m-4">
        <ThemeToggle />
      </div>
    </nav>
  );
}
