"use client"

import { useRouter } from 'next/navigation'
import React from 'react'
import { DropdownMenuItem, DropdownMenuSeparator } from '../ui/dropdown-menu'
import { HelpCircle, LogOut, User } from 'lucide-react'
import { signOut } from 'next-auth/react'

export default function DropDownItems() {
  const router = useRouter()
  return (
    <>
    <DropdownMenuItem onClick={() => router.push('/profile')}>
        <User className="mr-2 h-4 w-4" />
        <span>Profile</span>
    </DropdownMenuItem>
    <DropdownMenuItem onClick={() => router.push('/help')}>
      <HelpCircle className="mr-2 h-4 w-4" />
      <span>Help & Support</span>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={async() => {await signOut()}}>
      <LogOut className="mr-2 h-4 w-4" />
      <span>Log out</span>
    </DropdownMenuItem>
    </>
  )
}