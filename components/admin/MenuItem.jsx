'use client';
import { DELETE } from '@/constants/apiMethods';
import { useApiInfiniteQuery } from '@/hooks/useApiInfiniteQuery';
import { useApiMutation } from '@/hooks/useApiMutation';
import { ChevronUp, MoreHorizontal, Pencil, Plus, Trash2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import Loader from '../Loader';
import { Button } from '../ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from '../ui/sidebar';
import AddMenuItemModal from './AddMenuItemModal';
import DeleteAlertModal from './DeleteAlertModal';

const MenuItem = ({ menuItem }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [sidebarItems, setSidebarItems] = useState([])
    const [isAddMenuItemModalOpen, setIsAddMenuItemModalOpen] = useState(false);
    const [isUpdateMenuItemModalOpen, setIsUpdateMenuItemModalOpen] = useState(false);
    const [isDeleteMenuItemModalOpen, setIsDeleteMenuItemModalOpen] = useState(false);
    const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState(false);
    const pathname = usePathname();
    const currentPathValue = useMemo(() => pathname.split("/")[3], [pathname]);
    const router = useRouter();
    const title = menuItem?.title.toLowerCase();
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading: isLoadingMenuItems } = useApiInfiniteQuery({ url: "/menu-items", parentId: menuItem._id, queryKey: `menuItems-${menuItem._id}`, limit: 10, enabled: isOpen });
    const { mutate: deleteMenuItem, isLoading } = useApiMutation({
        url: "/menu-items",
        method: DELETE,
        invalidateKey: ["menuItems"],
    });

    const handleDelete = () => {
        setIsDeleteMenuItemModalOpen(true);
        deleteMenuItem({ menuItemId: menuItem?._id }, { onSuccess: () => setIsDeleteMenuItemModalOpen(false) });
    }


    useEffect(() => {
        if (data) {
            const allData = data?.pages?.map(page => page?.menuItems)
            setSidebarItems(allData?.flat());
        }
    }, [data]);


    const handleClick = () => {
        if (menuItem?.isLink) {
            sessionStorage.setItem("menuItem", JSON.stringify({ name: menuItem?.title, id: menuItem?._id }));
            router.push(`/admin/details/${title}`);
        }
    }

    const handleDeleteModal = () => {
        setIsDeleteMenuItemModalOpen(true);
        setIsDropDownMenuOpen(false);
    }

    const handleEditModal = () => {
        setIsUpdateMenuItemModalOpen(true);
        setIsDropDownMenuOpen(false);
    }

    const handleAddModal = () => {
        setIsAddMenuItemModalOpen(true);
        setIsDropDownMenuOpen(false);
    }

    return (
        <>
            <SidebarMenuItem>
                <Collapsible open={isOpen} onOpenChange={setIsOpen} className="group/collapsible">
                    <SidebarMenuButton className="data-[active=true]:text-black data-[active=true]:dark:text-white data-[active=true]:bg-sidebar-accent" asChild isActive={decodeURIComponent(currentPathValue) === title}>
                        <div className="flex justify-between items-center w-full">
                            <button onClick={handleClick} className={`flex flex-1 items-center gap-2 ${menuItem.isLink ? "" : "cursor-default"}`}>
                                {/* <item.icon className="w-5 h-5" /> */}
                                <span>{menuItem?.title}</span>
                            </button>
                            <div className="flex items-center gap-1">
                                {/* <Plus onClick={() => setIsAddMenuItemModalOpen(true)} className="cursor-pointer" /> */}
                                <DropdownMenu open={isDropDownMenuOpen} onOpenChange={setIsDropDownMenuOpen}>
                                    <DropdownMenuTrigger asChild>
                                        {/* <SidebarMenuAction> */}
                                        <MoreHorizontal onClick={() => setIsDropDownMenuOpen(!isDropDownMenuOpen)} />
                                        {/* </SidebarMenuAction> */}
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent side="right" align="start">
                                        {menuItem?.type === "multiple" &&
                                            <DropdownMenuItem>
                                                <button className='flex items-center gap-3' onClick={handleAddModal}>
                                                    <Plus />
                                                    Add Menu Item
                                                </button>
                                            </DropdownMenuItem>}
                                        <DropdownMenuItem>
                                            <button className='flex items-center gap-3' onClick={handleEditModal}>
                                                <Pencil />
                                                Edit Menu Item
                                            </button>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <button className='flex items-center gap-3' onClick={handleDeleteModal}>
                                                <Trash2 />
                                                Delete Menu Item
                                            </button>
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