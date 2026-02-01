import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React from "react";

export default function signIn() {
  return (
    <div className="flex  min-h-[calc(100vh-4rem)] justify-center items-center bg-background p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-bold text-xl">Sign In</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <form action=""  className="space-y-4 p-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="moaml@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="********" required minLength={8} />
          </div>
          <CardFooter className="space-x-3 flex flex-col items-center gap-2">
            <Button type="submit" className="min-w-[300px]">Sign In</Button>
             <p>Don't have an account? <Link href="/sign-up" className="font-bold">Sign up</Link></p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
