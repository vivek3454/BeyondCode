import { connectToDatabase } from "@/lib/db";
import MenuItem from "@/models/MenuItem";
import { NextResponse } from "next/server";


export async function GET(request) {
    try {

        await connectToDatabase();

        const { searchParams } = new URL(request.url);
        let searchQuery = searchParams.get("searchQuery");

        console.log("searchQuery", searchQuery);

        const searchResults = await MenuItem.find({
            $or: [
                { title: { $regex: searchQuery, $options: "i" } },
            ],
            isLink: true
        })

        return NextResponse.json(
            {
                message: "Search results",
                searchResults
            },
            { status: 200 }
        )
    } catch (error) {
        console.log("get searchResults error", error);

        return NextResponse.json(
            { error: "Failed to get search results" },
            { status: 500 }
        )
    }
}