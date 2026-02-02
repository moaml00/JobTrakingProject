"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth/auth-client"; 
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth/auth-client";
import { useRouter } from "next/dist/client/components/navigation";
import Link from "next/link";
import React, { use, useState } from "react";
 
export default function SignIn() {
  const { data } = useSession();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signIn.email({
        email,
        password,
      });
      if (result.error) {
        setError(result.error.message ?? "Failed to sign in");
      } else {
        // Sign-in successful, you can redirect or show a success message here
        router.push("/"); // Redirect to home after successful sign-in
        router.refresh();
      }
    } catch (error) {
      setError("Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex  min-h-[calc(100vh-4rem)] justify-center items-center bg-background p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-bold text-xl">Sign In</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <form action="" className="space-y-4 p-4" onSubmit={handleSubmit}>
          {error && <p className="text-red-500">{error}</p>}
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
          <CardFooter className="space-x-3 flex flex-col items-center gap-2">
            <Button type="submit" className="min-w-[300px]" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </Button>
            <p>
              Don't have an account?{" "}
              <Link href="/sign-up" className="font-bold">
                {" "}
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
