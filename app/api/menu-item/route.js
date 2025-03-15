import { connectToDatabase } from "@/lib/db";
import MenuItem from "@/models/MenuItem";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {

    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    let menuItemId = searchParams.get("menuItemId");


    const menuItem = await MenuItem.findById(menuItemId);

    return NextResponse.json(
      {
        message: "Menu item",
        menuItem
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("get menu item error", error);

    return NextResponse.json(
      { error: "Failed to get menu item" },
      { status: 500 }
    );
  }
}