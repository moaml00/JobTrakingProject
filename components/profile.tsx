import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { Avatar, AvatarFallback } from './ui/avatar'
import { getSession } from '@/lib/auth/auth'
import Link from 'next/dist/client/link'
import Logout from './logout'
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu'

export default  async  function Profile() {
const session=await getSession();
let name=session?.user.name.trim();
let userletter=name?name.charAt(0).toUpperCase():"U";
console.log("Session User Name:", session?.user.name);  
console.log("User Letter:", userletter);
  return (
    <div className='flex items-center gap-0'>

            <Link href="/profile" >
              <Button className="font-bold " variant="ghost">
                Profile
              </Button>
            </Link> 



             <DropdownMenu> 
               <DropdownMenuTrigger asChild>
                <Button variant="ghost" className=' px-0'> 
                    <Avatar>
                <AvatarFallback>{userletter}</AvatarFallback>
                    </Avatar>
                </Button>
                </DropdownMenuTrigger>              
                <DropdownMenuContent>
            <DropdownMenuLabel>
                    <div>
                        <p>{session?.user.name}</p>
                        <p>{session?.user.email}</p>
                    </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem> 
                <Logout />
            </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>


    </div>
  )
}
