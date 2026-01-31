import { Briefcase } from "lucide-react";
import React from "react";
import ThemeToggle from "./../components/ThemeToggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function Navbar() {
  return (
    <nav className="bg-background border-gray-700  border-b flex justify-between pb-3">
      <div className="flex items-center gap-2 font-semibold text-foreground px-4  ">
        <Briefcase />
        <p>Job Tracker</p>
      </div>

      <div className="mt-5 flex justify-between gap-6">
        <Link href="/sign-in">
          <Button variant="ghost" className="hover:bg-muted-foreground ">
            login
          </Button>
        </Link>

        <Link href="/sign-up">
          <Button className="bg-foreground">sign Up</Button>
        </Link>
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
