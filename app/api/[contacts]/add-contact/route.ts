import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import prisma from "@/lib/client";
import { contactValidator } from "@/zod/validateContact";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try {
        const session = await getServerSession(NEXT_AUTH_CONFIG);
        if(!session){
            return NextResponse.json({success: false, message: "Unauthorized"}, {status: 401})
        }
        const userId = session.user.id as string;
        const body = await req.json();
        const isValidContact = contactValidator.safeParse(body);
        if(!isValidContact.success){
            return NextResponse.json({success: false, message: "Invalid inputs"}, {status: 400})
        }
        const {username, mobile} = isValidContact.data;
        const contact = await prisma.contact.create({data: {contactName: username, mobile, userId}});
        return NextResponse.json({success: true, contact}, {status: 200})
    } catch (error) {
        return NextResponse.json({success: false, message: "Internal server error"}, {status: 500})
    }
}