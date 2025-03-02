'use client';

import { ChevronLeft, ChevronRight } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    useSidebar
} from "@/components/ui/sidebar";
import { useApiInfiniteQuery } from "@/hooks/useApiInfiniteQuery";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import MenuItem from "./MenuItem";
import { Button } from "./ui/button";


export function AppSidebar() {
    const [sidebarItems, setSidebarItems] = useState([])
    const { state } = useSidebar();

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useApiInfiniteQuery({ url: "/user/menu-items", parentId: null, queryKey: "menuItems" });

    useEffect(() => {
        const allData = data?.pages?.map(page => page?.menuItems)
        setSidebarItems(allData?.flat());
    }, [data])
    console.log("data", data);


    return (
        <Sidebar variant="sidebar" collapsible="icon">
            <SidebarHeader className="h-16 border-b-2 justify-center">
                <Link href="/" className='text-2xl text-black dark:text-white font-semibold flex gap-[2px] items-center'>
                    <div className='flex text-black dark:text-white gap-0 items-center'>
                        <ChevronLeft className='-mr-2' />
                        <ChevronRight />
                    </div>
                    {state === "expanded" && "BeyondCode"}
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent className="mt-0">
                        <SidebarMenu>
                            {isLoading && <Loader />}
                            {sidebarItems?.map((item) => (
                                <MenuItem
                                    key={item?._id}
                                    menuItem={item}
                                />
                            ))}
                            {hasNextPage && <Button className="bg-transparent hover:bg-transparent px-2 justify-start" variant="secondary" size="sm" disabled={isFetchingNextPage} onClick={fetchNextPage}>{isFetchingNextPage ? "Loading..." : "Load More"}</Button>}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
