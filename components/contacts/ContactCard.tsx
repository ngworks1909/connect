import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Trash2 } from "lucide-react"
import { Contact } from "./ContactMain"

export function ContactCard({ contact}: {contact: Contact}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center space-x-4">
          <input type="image"
            src={contact.image || "/placeholder.svg?height=60&width=60"}
            alt={contact.contactId}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold">{contact.contactName}</h3>
            <p className="text-sm text-gray-500">{contact.mobile}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        {/* <Button variant="outline" size="icon" onClick={() => setIsEditing(true)}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => onDelete(contact.id)}>
          <Trash2 className="h-4 w-4" />
        </Button> */}
      </CardFooter>
    </Card>
  )
}

