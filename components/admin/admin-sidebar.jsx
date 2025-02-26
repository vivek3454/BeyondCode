'use client';

import { BadgePlus, ChevronLeft, ChevronRight } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from "@/components/ui/sidebar";
import { useGetMenuItems } from "@/hooks/useGetMenuItems";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import AddMenuItemModal from "./AddMenuItemModal";
import MenuItem from "./MenuItem";
import Loader from "../Loader";


export function AdminSidebar() {
    const [sidebarItems, setSidebarItems] = useState([])
    const [isAddMenuItemModalOpen, setIsAddMenuItemModalOpen] = useState(false);
    const { state } = useSidebar();
    const observerRef = useRef();

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useGetMenuItems(null, "menuItems");
    console.log("AdminSidebar data", data);

    useEffect(() => {
        const allData = data?.pages?.map(page => page?.menuItems)
        setSidebarItems(allData?.flat());
    }, [data])


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
                            <SidebarMenuItem>
                                <SidebarMenuButton className="mb-5" onClick={() => setIsAddMenuItemModalOpen(true)} variant="outline">
                                    <BadgePlus className="w-6 h-6" />
                                    Add Menu Item
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            {isLoading && <Loader />}
                            {sidebarItems?.map((item) => (
                                <MenuItem
                                    key={item?._id}
                                    menuItem={item}
                                />
                            ))}
                            {hasNextPage && <Button variant="secondary" size="sm" disabled={isFetchingNextPage} onClick={fetchNextPage}>{isFetchingNextPage ? "Loading..." : "Load More"}</Button>}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {isAddMenuItemModalOpen &&
                <AddMenuItemModal
                    isAddMenuItemModalOpen={isAddMenuItemModalOpen}
                    setIsAddMenuItemModalOpen={setIsAddMenuItemModalOpen}
                />
            }
        </Sidebar>
    )
}
