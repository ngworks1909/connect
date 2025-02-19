import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import prisma from "@/lib/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    try {
        const session = await getServerSession(NEXT_AUTH_CONFIG);
        if(!session){
            return NextResponse.json({success: false, message: "Unauthorized"}, {status: 401})
        }
        const userId = session.user.id as string;
        const contacts = await prisma.contact.findMany({
            where: {
                userId
            }
        });
        return NextResponse.json({success: true, contacts}, {status: 200})
    } catch (error) {
        return NextResponse.json({success: false, message: "Internal server error"}, {status: 500})
    }
}