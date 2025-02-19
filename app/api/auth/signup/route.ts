import prisma from "@/lib/client";
import { signupInput } from "@/zod/validateUser";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest){
    try {
        const body = await req.json();
        const signupSuccess = signupInput.safeParse(body);
        if(!signupSuccess.success){
            return NextResponse.json({success: false, message: "Invalid inputs"}, {status: 400})
        }
        const {email, password, mobile, username} = signupSuccess.data;
        const normalizedEmail = email.toLowerCase();
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email: normalizedEmail }, { mobile }]
            },
            select: {
                email: true,
                mobile: true
            }
        });
        if(existingUser){
            return NextResponse.json({success: false, message: "User already exists"}, {status: 400})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);
        await prisma.user.create({
            data: {
                username, email: normalizedEmail, password: hashedpassword, mobile
            }
        })
        return NextResponse.json({success: true, message: "User created"}, {status: 200})

    } catch (error) {
        return NextResponse.json({success: false, message: "Internal server error"}, {status: 500})
    }
}