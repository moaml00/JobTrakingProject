
import React from 'react'
import { getSession } from '@/lib/auth/auth';
import  SignUp from "@/components/sign-upForm";
import { redirect } from 'next/navigation';



export default async function signUp() {
  const session = await getSession();
  if(session?.user){
    redirect('/');
  }
  return (
    <SignUp />
  )
}


