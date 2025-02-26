"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


const Details = () => {
    const menuItem = sessionStorage.getItem("menuItem")
    const parsedMenuItem = menuItem ? JSON.parse(menuItem) : null;
    const title = parsedMenuItem?.name?.toLowerCase();
    const router = useRouter();

    return (
        <div>
            <div className="flex justify-between items-center gap-3">
                <h1 className='text-xl font-semibold capitalize'>{parsedMenuItem?.name}</h1>
                <Button onClick={() => router.push(`/admin/details/${title}/add-details`)}>Add Details</Button>
            </div>
        </div>
    )
}

export default Details