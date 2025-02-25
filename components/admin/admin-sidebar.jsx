'use client';

import { BadgePlus, Book, ChevronLeft, ChevronRight, Lightbulb, Link as LucideLink, Wrench } from "lucide-react";

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
import { useEffect, useState } from "react";
import AddMenuItemModal from "./AddMenuItemModal";
import MenuItem from "./MenuItem";

const items = [
    {
        title: "Learning Log",
        url: "/learning-log",
        icon: Book,
    },
    {
        title: "Packages & Tools",
        url: "/packages-tools",
        icon: Wrench,
    },
    {
        title: "Tips & Tricks",
        url: "/tips-tricks",
        icon: Lightbulb,
    },
    {
        title: "Test",
        url: "/test",
        icon: LucideLink,
    },
];

export function AdminSidebar() {
    const [sidebarItems, setSidebarItems] = useState([])
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetMenuItems(null);
    console.log("AdminSidebar data", data);

    const { state } = useSidebar();
    const [isAddMenuItemModalOpen, setIsAddMenuItemModalOpen] = useState(false);

    useEffect(() => {
        setSidebarItems(data?.menuItems || []);
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
                            {sidebarItems?.map((item) => (
                                <MenuItem
                                    key={item?._id}
                                    menuItem={item}
                                />
                            ))}
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
