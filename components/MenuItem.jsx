'use client';
import { useApiInfiniteQuery } from '@/hooks/useApiInfiniteQuery';
import { ChevronUp } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import Loader from './Loader';
import { Button } from './ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from './ui/sidebar';

const MenuItem = ({ menuItem }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [sidebarItems, setSidebarItems] = useState([])
    const pathname = usePathname();
    const currentPathValue = useMemo(() => pathname.split("/")[2], [pathname]);
    console.log("currentPathValue",currentPathValue);
    console.log("pathname",pathname);
    
    const router = useRouter();
    const title = menuItem?.title?.toLowerCase() || "";
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading: isLoadingMenuItems } = useApiInfiniteQuery({ url: "/user/menu-items", parentId: menuItem?._id, queryKey: `menuItems-${menuItem?._id}`, limit: 10, enabled: isOpen });

    useEffect(() => {
        if (data) {
            const allData = data?.pages?.map(page => page?.menuItems)
            setSidebarItems(allData?.flat());
        }
    }, [data]);


    const handleClick = () => {
        if (menuItem?.isLink) {
            sessionStorage.setItem("menuItem", JSON.stringify({ name: menuItem?.title, id: menuItem?._id }));
            router.push(`/details/${title}`);
        }
    }


    return (
        <SidebarMenuItem>
            <Collapsible open={isOpen} onOpenChange={setIsOpen} className="group/collapsible">
                <SidebarMenuButton className="data-[active=true]:text-black data-[active=true]:dark:text-white data-[active=true]:bg-sidebar-accent" asChild isActive={decodeURIComponent(currentPathValue) === title}>
                    <div className="flex justify-between items-center w-full">
                        <button onClick={handleClick} className={`flex flex-1 items-center gap-2 ${menuItem?.isLink ? "" : "cursor-default"}`}>
                            {/* <item.icon className="w-5 h-5" /> */}
                            <span>{menuItem?.title}</span>
                        </button>
                        <div className="flex items-center gap-1">
                            {menuItem?.type === "multiple" && <CollapsibleTrigger asChild>
                                <ChevronUp onClick={() => setIsOpen(!isOpen)} className={`cursor-pointer trasnsition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                            </CollapsibleTrigger>}
                        </div>
                    </div>
                </SidebarMenuButton>
                <CollapsibleContent className='mt-2'>
                    <SidebarMenuSub className="p-0 mr-0">
                        {isLoadingMenuItems && <Loader />}
                        {sidebarItems?.map((item) => (
                            <MenuItem
                                key={item?._id}
                                menuItem={item}
                            />
                        ))}
                        {hasNextPage && <Button className="h-7 px-2 bg-transparent hover:bg-transparent justify-start" variant="secondary" size="sm" disabled={isFetchingNextPage} onClick={fetchNextPage}>{isFetchingNextPage ? "Loading..." : "Load More"}</Button>}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
        </SidebarMenuItem>
    )
}

export default MenuItem