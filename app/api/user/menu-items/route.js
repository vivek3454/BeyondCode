import { connectToDatabase } from "@/lib/db";
import MenuItem from "@/models/MenuItem";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function GET(request) {
    try {

        await connectToDatabase();

        const { searchParams } = new URL(request.url);
        let cursor = searchParams.get("cursor"); // Cursor-based pagination (last item ID)
        let parentId = searchParams.get("parentId");
        let limit = parseInt(searchParams.get("limit")) || 10;

        let filter = {};

        if (parentId) {
            filter.parentId = parentId;
        } else {
            filter.parentId = null;
        }

        if (cursor) {
            filter._id = { $gt: cursor };
        }

        const menuItems = await MenuItem.find(filter)
            .sort({ _id: 1 }) // Fetch in ascending order by ID
            .limit(limit);

        const nextCursor = menuItems.length > 0 ? menuItems[menuItems.length - 1]._id : null;
        return NextResponse.json(
            {
                message: "Menu items",
                menuItems,
                nextCursor
            },
            { status: 200 }
        );
    } catch (error) {
        console.log("get menu items error", error);

        return NextResponse.json(
            { error: "Failed to get menu items" },
            { status: 500 }
        );
    }
}