'use client';
import { useGetMenuItems } from '@/hooks/useGetMenuItems';
import { ChevronUp, MoreHorizontal } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from '../ui/sidebar';
import AddMenuItemModal from './AddMenuItemModal';
import DeleteAlertModal from './DeleteAlertModal';
import { useDeleteMenuItem } from '@/hooks/useDeleteMenuItem';

const MenuItem = ({ menuItem }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [sidebarItems, setSidebarItems] = useState([])
    const [isAddMenuItemModalOpen, setIsAddMenuItemModalOpen] = useState(false);
    const [isUpdateMenuItemModalOpen, setIsUpdateMenuItemModalOpen] = useState(false);
    const [isDeleteMenuItemModalOpen, setIsDeleteMenuItemModalOpen] = useState(false);
    const pathname = usePathname();
    const currentPathValue = useMemo(() => pathname.split("/")[3], [pathname]);
    const router = useRouter();
    const title = menuItem?.title.toLowerCase()
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetMenuItems(menuItem._id, `menuItems-${menuItem._id}`);
    const { mutate, isLoading } = useDeleteMenuItem();

    const handleDelete = () => {
        setIsDeleteMenuItemModalOpen(true);
        mutate({ menuItemId: menuItem?._id }, { onSuccess: () => setIsDeleteMenuItemModalOpen(false) });
    }

    console.log(`AdminSidebar data ${menuItem.title}`, data);

    useEffect(() => {
        if (data?.menuItems) {
            setSidebarItems(data.menuItems);
        }
    }, [data]);


    const handleClick = () => {
        if (menuItem?.isLink) {
            sessionStorage.setItem("menuItem", JSON.stringify({ name: menuItem?.title, id: menuItem?._id }));
            router.push(`/admin/details/${title}`);
        }
    }

    return (
        <>
            <SidebarMenuItem>
                <Collapsible open={isOpen} onOpenChange={setIsOpen} className="group/collapsible">
                    <SidebarMenuItem>
                        <SidebarMenuButton className="data-[active=true]:text-black data-[active=true]:dark:text-white data-[active=true]:bg-sidebar-accent" asChild isActive={decodeURIComponent(currentPathValue) === title}>
                            <div className="flex justify-between items-center w-full">
                                <button onClick={handleClick} className={`flex flex-1 items-center gap-2 ${menuItem.isLink ? "" : "cursor-default"}`}>
                                    {/* <item.icon className="w-5 h-5" /> */}
                                    <span>{menuItem?.title}</span>
                                </button>
                                <div className="flex items-center gap-1">
                                    {/* <Plus onClick={() => setIsAddMenuItemModalOpen(true)} className="cursor-pointer" /> */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            {/* <SidebarMenuAction> */}
                                            <MoreHorizontal />
                                            {/* </SidebarMenuAction> */}
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent side="left" align="start">
                                            {menuItem?.type === "multiple" &&
                                                <DropdownMenuItem>
                                                    <button onClick={() => setIsAddMenuItemModalOpen(true)}>Add Menu Item</button>
                                                </DropdownMenuItem>}
                                            <DropdownMenuItem>
                                                <button onClick={() => setIsUpdateMenuItemModalOpen(true)}>Edit Menu Item</button>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <button onClick={() => setIsDeleteMenuItemModalOpen(true)}>Delete Menu Item</button>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    {menuItem?.type === "multiple" && <CollapsibleTrigger asChild>
                                        <ChevronUp onClick={() => setIsOpen(!isOpen)} className={`cursor-pointer trasnsition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                                    </CollapsibleTrigger>}
                                </div>
                            </div>
                        </SidebarMenuButton>
                        <CollapsibleContent className='mt-2'>
                            <SidebarMenuSub className="p-0 mr-0">
                                {sidebarItems?.map((item) => (
                                    <MenuItem
                                        key={item?._id}
                                        menuItem={item}
                                    />
                                ))}
                            </SidebarMenuSub>
                        </CollapsibleContent>
                    </SidebarMenuItem>
                </Collapsible>
            </SidebarMenuItem>
            {isAddMenuItemModalOpen &&
                <AddMenuItemModal
                    isAddMenuItemModalOpen={isAddMenuItemModalOpen}
                    setIsAddMenuItemModalOpen={setIsAddMenuItemModalOpen}
                    parentId={menuItem?._id}
                />
            }

            {isUpdateMenuItemModalOpen &&
                <AddMenuItemModal
                    isAddMenuItemModalOpen={isUpdateMenuItemModalOpen}
                    setIsAddMenuItemModalOpen={setIsUpdateMenuItemModalOpen}
                    parentId={menuItem?._id}
                    menuItem={menuItem}
                />
            }

            {isDeleteMenuItemModalOpen &&
                <DeleteAlertModal
                    isDeleteModalOpen={isDeleteMenuItemModalOpen}
                    setIsDeleteModalOpen={setIsDeleteMenuItemModalOpen}
                    handleDelete={handleDelete}
                    isLoading={isLoading}
                />
            }
        </>
    )
}

export default MenuItem