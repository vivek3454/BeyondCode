import { connectToDatabase } from "@/lib/db";
import Content from "@/models/Content";
import { NextResponse } from "next/server";


export async function GET(request) {
    try {

        await connectToDatabase();

        const { searchParams } = new URL(request.url);
        let menuItemId = searchParams.get("menuItemId");


        const content = await Content.find({ menuItemId })

        return NextResponse.json(
            {
                message: "Content",
                content
            },
            { status: 200 }
        )
    } catch (error) {
        console.log("get content error", error);

        return NextResponse.json(
            { error: "Failed to get content" },
            { status: 500 }
        )
    }
}