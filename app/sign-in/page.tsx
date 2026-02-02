import React from 'react'
import { getSession } from '@/lib/auth/auth';
import SignIn from "@/components/sign-inForm";
import { redirect } from 'next/navigation';



export default async function signIn() {
  const session = await getSession();
  if(session?.user){
    redirect('/');
  }
  return (
    <SignIn />
  )
}
