"use client";
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
import { signUp } from "@/lib/auth/auth-client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signUp.email({
        email,
        password,
        name,
      });
      if (result.error) {
        setError(
          result.error.message ?? "Failed to sign up. Please try again.",
        );
      } else {
        // Sign-up successful, you can redirect or show a success message here
        router.push("/dashboard"); // Redirect to dashboard after successful sign-up
      }
    } catch (error) {
      setError("Failed to sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex  min-h-[calc(100vh-4rem)] justify-center items-center bg-background p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-bold text-xl">Sign Up</CardTitle>
          <CardDescription>Sign up for an account</CardDescription>
        </CardHeader>
        <form action="" className="space-y-4 p-4" onSubmit={handleSubmit}>
          {error && <p className="text-red-500">{error}</p>}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="moaml"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="moaml@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <CardFooter className="flex flex-col items-center gap-2">
            <Button type="submit" className="min-w-[300px]" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
            <p>
              Already have an account?{" "}
              <Link href="/sign-in" className="font-bold">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
