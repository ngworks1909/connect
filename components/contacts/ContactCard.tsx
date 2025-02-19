import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Trash2 } from "lucide-react"
import { Contact } from "./ContactMain"
import { useState } from "react"
import EditContact from "./EditContact"

export function ContactCard({ contact, onUpdate, onDelete }: {contact: Contact, onUpdate: (contact: Contact) => Promise<void>, onDelete: (contactId: string) => Promise<void>}) {
  const [isEditing, setIsEditing] = useState(false)
  return (
    <Card className="bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
      <CardContent className="pt-6">
        <div className="flex items-center space-x-4">
          <div className="inline-flex items-center justify-center rounded-full bg-gray-200 p-0.5">
            <input type="image"
            src={contact.image || "/placeholder.svg?height=60&width=60"}
            alt={contact.contactId}
            className="w-10 h-10 rounded-full object-cover border-2 border-white"
          /> 
            </div>
          <div>
            <h3 className="text-lg font-semibold">{contact.contactName}</h3>
            <p className="text-sm text-gray-500">{contact.mobile}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button onClick={(e) => {e.preventDefault(); setIsEditing(true)}} variant="outline" size="icon" >
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={async(e) => {e.preventDefault(); await onDelete(contact.contactId)}}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
      {isEditing && (
        <EditContact
          contact={contact}
          onUpdate={async(updatedContact) => {
            await onUpdate(updatedContact)
            setIsEditing(false)
          }}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </Card>
  )
}

