import { connectToDatabase } from "@/lib/db";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            )
        }

        await connectToDatabase();
        
        const existingAdmin = await Admin.findOne({ email });
        
        if (existingAdmin) {
            return NextResponse.json(
                { error: "Email is already registered" },
                { status: 400 }
            )
        }
        
        const admin = await Admin.create({
            email,
            password
        })

        return NextResponse.json(
            { message: "Admin registered successfully" },
            { status: 201 }
        )
    } catch (error) {
        console.log("register admin error",error);
        
        return NextResponse.json(
            { error: "Failed to register Admin" },
            { status: 500 }
        )
    }
}