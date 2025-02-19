"use client"
import React, { ChangeEvent, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import {  Phone, Plus } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Card, CardContent } from '../ui/card';
import { mobileValidator } from '@/zod/validateUser';

export default function ContactTop({contactSize, handleCreate}: {contactSize: number, handleCreate: (username: string, mobile: string) => Promise<void>}) {
  const [open, setOpen] = useState(false);
  const [username, setUserName] = useState("")
  const [mobile, setMobile] = useState("");
  const [adding, setAdding] = useState(false);

  const handleMobile = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "") // Remove non-digit characters

    if (value.length === 0) {
      setMobile("")
      return
    }

    const firstDigit = Number.parseInt(value[0])
    if (firstDigit >= 6 && firstDigit <= 9) {
      setMobile(value.slice(0, 10)) // Limit to 10 digits
    } else if (value.length === 1) {
      // If the first digit is invalid, don't update the state
      return
    }
  }
  return (
    <>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Contacts</h1>
          <Dialog open = {open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={(e) => {e.preventDefault();setOpen(true)}}
               className={`${contactSize === 0 && 'hidden'}`}
               >
                <Plus className="mr-2 h-4 w-4" /> Add New Contact
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Contact</DialogTitle>
                <DialogDescription>
                  Create a new contact by providing atleast 4-character username and mobile number.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    className="col-span-3"
                    placeholder='Enter username'
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="mobile" className="text-right">
                    Mobile
                  </Label>
                  <Input
                    id="mobile"
                    value={mobile}
                    onChange={handleMobile}
                    className="col-span-3"
                    placeholder='Enter mobile number'
                  />
                </div> 
              </div>
              <DialogFooter>
                <Button disabled = {username.length < 4 || mobile.length < 10 || adding} onClick={async(e) => {e.preventDefault(); setAdding(true); await handleCreate(username, mobile); setAdding(false); setOpen(false); setUserName(""); setMobile("")}} >
                  {adding ? "Adding..." : "Add Contact"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        {contactSize === 0 && <Card className="w-full p-6 text-center">
            <CardContent>
              <Phone className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">No contacts available</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating a new contact.</p>
              <div className="mt-6">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={(e) => {e.preventDefault();setOpen(true)}}>
                      <Plus className="mr-2 h-4 w-4" /> Add New Contact
                    </Button>
                  </DialogTrigger>
                  {/* Dialog content same as above */}
                </Dialog>
              </div>
            </CardContent>
          </Card>}
    </>
  )
}
