'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from './ui/button'
import Image from 'next/image'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { Session } from 'next-auth'

interface Props {
  session: Session | null
}

export function ProfileCard({ session }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 hover:text-white px-3 text-white h-12 border-none focus-visible:ring-offset-1 focus-visible:ring-2 focus-visible:ring-offset-gray-800  focus-visible:ring-purple-400"
          variant="outline"
        >
          <Image
            referrerPolicy="no-referrer"
            className="rounded-full w-10 h-10"
            src={session?.user.image as string}
            width={40}
            height={40}
            alt="User"
          />
          <span className="text-md">{session?.user?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-56 bg-gray-900 border-purple-400 text-white"
      >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-purple-400" />
        <DropdownMenuItem
          className="hover:cursor-pointer focus:bg-gray-700 focus:text-white"
          onClick={() => signOut()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
