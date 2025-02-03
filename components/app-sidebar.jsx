'use client';

import { Home, Book, Wrench, Lightbulb, Laptop, Pen, User, Mail, Search, Link as LucideLink, ChevronLeft, ChevronRight } from "lucide-react";

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

const items = [
    {
        title: "Home",
        url: "/",
        icon: <Home />,
    },
    {
        title: "Learning Log",
        url: "/learning-log",
        icon: <Book />,
    },
    {
        title: "Packages & Tools",
        url: "/packages-tools",
        icon: <Wrench />,
    },
    {
        title: "Tips & Tricks",
        url: "/tips-tricks",
        icon: <Lightbulb />,
    },
    {
        title: "Projects",
        url: "/projects",
        icon: <Laptop />,
    },
    {
        title: "Blog",
        url: "/blog",
        icon: <Pen />,
    },
    {
        title: "About Me",
        url: "/about-me",
        icon: <User />,
    },
    {
        title: "Contact",
        url: "/contact",
        icon: <Mail />,
    },
    {
        title: "Search",
        url: "/search",
        icon: <Search />,
    },
    {
        title: "Test",
        url: "/test",
        icon: <LucideLink />,
    },
];

export function AppSidebar() {
    const pathname = usePathname();
    const { state } = useSidebar();
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
                            {items.map((item, i) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                                        <Link href={item.url}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
