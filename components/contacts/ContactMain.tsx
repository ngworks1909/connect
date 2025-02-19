"use client"
import React, { useMemo, useState } from 'react'
import ContactTop from './ContactTop';
import { contactValidator } from '@/zod/validateContact';
import { useToast } from '@/hooks/use-toast';
import { useContacts } from '@/hooks/useContacts';
import  ContactCardSkeleton  from './ContactCardSkeleton';
import { ContactCard } from './ContactCard';
import SearchBar from './SearchBar';

export interface Contact{
  contactId: string,
  contactName: string,
  mobile: string,
  image: string
}

export default function ContactMain() {
  const {toast} = useToast()
  const {contacts, setContacts, loading} = useContacts();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = useMemo(() => {
    return contacts.filter(
      (contact) =>
        contact.contactName.toLowerCase().includes(searchTerm.toLowerCase()) || contact.mobile.includes(searchTerm),
    )
  }, [contacts, searchTerm])
  async function handleUpdate(updatedContact: Contact) {
    try {
    const username = updatedContact.contactName;
    const mobile = updatedContact.mobile
    const isValidContact = contactValidator.safeParse({username, mobile});
    if(!isValidContact.success) {
        toast({
            title: "Creation Failed",
            description: "Please check your inputs.",
            variant: "destructive",
        })
        return
    }
    const response = await fetch(`/api/contacts/edit-contact/${updatedContact.contactId}`, {
      method: "PUT",
      body: JSON.stringify({username, mobile})
    });
    const json = await response.json();
    if(json.success) {
      toast({
        title: "Update successful!",
        description: "Contact has been updated.",
        className: "bg-green-500 text-white"
      })
      setContacts(contacts.map((contact) => (contact.contactId === updatedContact.contactId ? updatedContact : contact)))
    }
    else{
      toast({
        title: "Creation Failed!",
        description: json.message,
        variant: "destructive"
      })
    }
    } catch (error) {
      toast({
        title: "Creation Failed!",
        description: "Something went wrong",
        variant: "destructive"
      })
    }
  }
  async function handleCreate(username: string, mobile: string){
    try {
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
          description: json.message,
          variant: "destructive"
        })
      }
    } 
    catch (error) {
      toast({
        title: "Creation Failed!",
        description: "Something went wrong.",
        variant: "destructive"
      })
    }
  }


  async function handleDelete(contactId: string){
    try {
      const response = await fetch(`/api/contacts/delete-contact/${contactId}`, {
        method: "DELETE",
      })
      const json = await response.json();
      if(json.success){
        setContacts(contacts.filter((contact) => contact.contactId !== contactId))
        toast({
          title: "Deletion successful!",
          description: "Contact has been deleted.",
          className: "bg-green-500 text-white"
        })
      }
      else{
        toast({
          title: "Deletion Failed!",
          description: json.message,
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Deletion Failed!",
        description: "Something went wrong.",
        variant: "destructive"
      })
    }
  }

  return (
    <main className="flex-1 overflow-auto p-4 md:p-6 bg-slate-50">
        {
          loading ? <>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array(10).fill(0).map((_, index) => <ContactCardSkeleton key={index} />)}
              </div>
          </> : <>
             <ContactTop contactSize={contacts.length} handleCreate={handleCreate} />
             {
              contacts.length > 0 && <>
                <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                {filteredContacts.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredContacts.map((contact) => <ContactCard key={contact.contactId} contact={contact} onUpdate={handleUpdate} onDelete={handleDelete} />)}
                </div> : <p className="text-center text-gray-500">No contacts found.</p>}
              </>
             }
          </>
        }
    </main>
  )
}
