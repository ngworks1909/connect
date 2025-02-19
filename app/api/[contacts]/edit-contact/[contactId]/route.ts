import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import prisma from "@/lib/client";
import { contactValidator } from "@/zod/validateContact";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { contactId: string } }) {
    try {
        const session = await getServerSession(NEXT_AUTH_CONFIG);
        if(!session){
            return NextResponse.json({success: false, message: "Unauthorized"}, {status: 401})
        }
        const userId = session.user.id as string;
        const body = await req.json();
        const isValidUpdate = contactValidator.safeParse(body);
        if(!isValidUpdate.success){
            return NextResponse.json({success: false, message: "Invalid inputs"}, {status: 400})
        }

        const {username, mobile} = isValidUpdate.data;
        const contact = await prisma.contact.findUnique({
            where: {
                contactId: params.contactId
            },
            select: {
                userId: true
            }
        })
        if(!contact){
            return NextResponse.json({session: false, message: "Contact not found"}, {status: 400})
        }

        const isAuthorized = contact.userId === userId;
        if(!isAuthorized){
            return NextResponse.json({success: false, message: "Not autorized to update contact"}, {status: 401})
        }
        const updatedContact = await prisma.contact.update({where: {contactId: params.contactId}, data: {contactName: username, mobile}});
        return NextResponse.json({success: true, contact: updatedContact}, {status: 200})
    } catch (error) {
        return NextResponse.json({success: false, message: "Internal server error"}, {status: 500})
    }
}