"use client"
import React, { useState } from 'react'
import ContactTop from './ContactTop';
import { contactValidator } from '@/zod/validateContact';
import { useToast } from '@/hooks/use-toast';
import { useContacts } from '@/hooks/useContacts';
import  ContactCardSkeleton  from './ContactCardSkeleton';
import { ContactCard } from './ContactCard';

export interface Contact{
  contactId: string,
  contactName: string,
  mobile: string,
  image: string
}

export default function ContactMain() {
  const {toast} = useToast()
  const {contacts, setContacts, loading} = useContacts();
  async function handleCreate(username: string, mobile: string){
    const isValidContact = contactValidator.safeParse({username, mobile});
    if(!isValidContact.success) {
        toast({
            title: "Creation Failed",
            description: "Please check your inputs.",
            variant: "destructive",
        })
        return
    }
    const response = await fetch("/api/contacts/add-contact", {
      method: "POST",
      body: JSON.stringify({username, mobile})
    });

    const json = await response.json();
    if(json.success) {
      const contact = json.contact as Contact
      const newContacts = [...contacts, contact]
      setContacts(newContacts)
      toast({
        title: "Creation successful!",
        description: "A new contact has been created.",
        className: "bg-green-500 text-white"
      })
    }
    else{
      toast({
        title: "Creation Failed!",
        description: "Failed to create contact.",
        variant: "destructive"
      })
    }
  }
  return (
    <main className="flex-1 overflow-auto p-4 md:p-6">
        {
          loading ? <>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array(10).fill(0).map((_, index) => <ContactCardSkeleton key={index} />)}
              </div>
          </> : <>
             <ContactTop contactSize={contacts.length} handleCreate={handleCreate} />
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {contacts.map((contact) => (
                  <ContactCard key={contact.contactId} contact={contact} />
                ))}
              </div>
          </>
        }
    </main>
  )
}
