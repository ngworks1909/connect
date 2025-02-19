import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import prisma from "@/lib/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { contactId: string } } ){
    try {
        const contactId = params.contactId;
        const session = await getServerSession(NEXT_AUTH_CONFIG);
        const userId = session.user.id as string
        if(!session){
            return NextResponse.json({success: false, message: "Unauthorized"}, {status: 401})
        }
        const contact = await prisma.contact.findUnique({where: {contactId}, select: {userId: true}});
        if(!contact){
            return NextResponse.json({success: false, message: "Contact not found"}, {status: 400})
        }
        if(contact.userId !==userId) {
            return NextResponse.json({success: false, message: "Not authorized to delete contact"}, {status: 401})
        }
        await prisma.contact.delete({where: {contactId}});
        return NextResponse.json({success: true, message: "Contact deleted"}, {status: 200})
    } catch (error) {
        return NextResponse.json({success: false, message: "Internal server error"}, {status: 500})
    }
}