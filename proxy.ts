import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/auth/auth";

export default async function proxy(request: NextRequest) {
  const session = await getSession();
  const isDashBoardPage = request.nextUrl.pathname.startsWith("/dashboard");

  if (isDashBoardPage && !session?.user) 
   return NextResponse.redirect(new URL("/sign-in", request.url));


   return NextResponse.next();
}
