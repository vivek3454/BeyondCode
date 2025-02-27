import { connectToDatabase } from "@/lib/db";
import Content from "@/models/Content";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { contentString, menuItemId } = await request.json();

        if (!contentString) {
            return NextResponse.json(
                { error: "Add some content" },
                { status: 400 }
            )
        }

        await connectToDatabase();

        await Content.create({ contentString, menuItemId });

        return NextResponse.json(
            { message: "Content added successfully" },
            { status: 201 }
        )
    } catch (error) {
        console.log("add content error", error);

        return NextResponse.json(
            { error: "Failed to add content" },
            { status: 500 }
        )
    }
}

export async function PATCH(request) {
    try {
        const { contentString, contentId } = await request.json();

        if (!contentString) {
            return NextResponse.json(
                { error: "Add some content" },
                { status: 400 }
            );
        }

        if (!contentId) {
            return NextResponse.json(
                { error: "Content ID is required" },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const updatedContent = await Content.findByIdAndUpdate(
            contentId,
            { contentString },
            { new: true } // Returns the updated document
        );

        if (!updatedContent) {
            return NextResponse.json(
                { error: "Content not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Content updated successfully", content: updatedContent },
            { status: 200 }
        );
    } catch (error) {
        console.error("Update content error:", error);

        return NextResponse.json(
            { error: "Failed to update content" },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        let contentId = searchParams.get("contentId");

        await connectToDatabase();

        if (!mongoose.Types.ObjectId.isValid(contentId)) {
            return NextResponse.json(
                { message: "Invalid contentId" },
                { status: 400 }
            )
        }


        const deletedContent = await Content.findByIdAndDelete(contentId);

        if (!deletedContent) {
            return NextResponse.json(
                { message: "Content not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { message: "Content deleted successfully" },
            { status: 200 }
        )
    } catch (error) {
        console.error("delete content error:", error);

        return NextResponse.json(
            { error: "Failed to delete content" },
            { status: 500 }
        );
    }
}

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