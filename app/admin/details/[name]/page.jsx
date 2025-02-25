"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";


const Details = () => {
    const menuItem = sessionStorage.getItem("menuItem")
    const parsedMenuItem = menuItem ? JSON.parse(menuItem) : null;

    return (
        <div>
            <h1 className='text-xl font-semibold capitalize'>{parsedMenuItem?.name}</h1>
        </div>
    )
}

export default Details