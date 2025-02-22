'use client';

import { Home, Book, Wrench, Lightbulb, Laptop, Pen, User, Mail, Search, Link as LucideLink, ChevronLeft, ChevronRight, BadgePlus, Plus } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AddMenuItemModal from "./AddMenuItemModal";

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
    const pathname = usePathname();
    const { state } = useSidebar();
    const [isOpen, setIsOpen] = useState(false);
    const [isAddMenuItemModalOpen, setIsAddMenuItemModalOpen] = useState(false);
    console.log("state: ", state);

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
                                <SidebarMenuButton onClick={() => setIsAddMenuItemModalOpen(true)} variant="outline">
                                    <BadgePlus className="w-6 h-6" />
                                    Add Menu Item
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            {items.map((item, i) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton className={`${pathname === item.url && "dark:bg-white dark:text-black"}`} asChild isActive={pathname === item.url}>
                                        <div className="flex justify-between items-center w-full">
                                            <Link className="flex items-center gap-2" href={item.url}>
                                                <item.icon className="w-5 h-5" />
                                                <span>{item.title}</span>
                                            </Link>
                                            <div className="flex items-center gap-0">
                                                <Plus className="cursor-pointer" />
                                                <ChevronRight onClick={() => setIsOpen(!isOpen)} className={`cursor-pointer trasnsition-transform duration-200 ${isOpen ? "rotate-90" : ""}`} />
                                            </div>
                                        </div>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
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
