import { connectToDatabase } from "@/lib/db";
import Admin from "@/models/Admin";
import MenuItem from "@/models/MenuItem";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { title, isLink, type, parentId = null } = await request.json();

        if (!title) {
            return NextResponse.json(
                { error: "Title is required" },
                { status: 400 }
            )
        }

        await connectToDatabase();

        await MenuItem.create({ title, isLink, type, parentId });

        return NextResponse.json(
            { message: "Menu item created successfully" },
            { status: 201 }
        )
    } catch (error) {
        console.log("menu item creation error", error);

        return NextResponse.json(
            { error: "Failed to create menu item" },
            { status: 500 }
        )
    }
}

export async function PATCH(request) {
    try {
        const { menuItemId, title, isLink, type } = await request.json();

        if (!title) {
            return NextResponse.json(
                { error: "Title is required" },
                { status: 400 }
            )
        }

        await connectToDatabase();

        await MenuItem.findByIdAndUpdate(
            menuItemId,
            {
                title,
                isLink,
                type,
            }
        );

        return NextResponse.json(
            { message: "Menu item updated successfully" },
            { status: 201 }
        )
    } catch (error) {
        console.log("menu item update error", error);

        return NextResponse.json(
            { error: "Failed to update menu item" },
            { status: 500 }
        )
    }
}
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        let menuItemId = searchParams.get("menuItemId");

        await connectToDatabase();

        await MenuItem.findByIdAndDelete(menuItemId);

        return NextResponse.json(
            { message: "Menu item deleted successfully" },
            { status: 201 }
        )
    } catch (error) {
        console.log("menu item delete error", error);

        return NextResponse.json(
            { error: "Failed to delete menu item" },
            { status: 500 }
        )
    }
}

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
        )
    } catch (error) {
        console.log("get menu items error", error);

        return NextResponse.json(
            { error: "Failed to get menu items" },
            { status: 500 }
        )
    }
}