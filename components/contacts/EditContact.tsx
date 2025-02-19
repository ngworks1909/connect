"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Contact } from "./ContactMain"

type EditContactProps = {
  contact: Contact
  onUpdate: (contact: Contact) => Promise<void>
  onCancel: () => void
}

export default function EditContact({ contact, onUpdate, onCancel }: EditContactProps) {
  const [username, setUsername] = useState(contact.contactName)
  const [mobile, setMobile] = useState(contact.mobile)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const updatedContact: Contact = {
      ...contact,
      contactName: username,
      mobile,
    }
    await onUpdate(updatedContact);
    setLoading(false)
  }

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Contact</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit-username">Username</Label>
            <Input id="edit-username" disabled={loading} value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="edit-mobile">Mobile</Label>
            <Input id="edit-mobile" disabled={loading} value={mobile} onChange={(e) => setMobile(e.target.value)} required />
          </div>
          <div className="flex justify-end space-x-2">
            {!loading && <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>}
            <Button type="submit" disabled={loading}>{loading ? "Saving...": "Save"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

