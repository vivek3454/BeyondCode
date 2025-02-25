import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteMenuItem = async (menuItemData) => {
    console.log("menuItemId",menuItemData?.menuItemId);
    
    const { data } = await axiosInstance.delete(`/menu-items?menuItemId=${menuItemData.menuItemId}`);
    return data;
};

export function useDeleteMenuItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteMenuItem,
        onSuccess: () => {
            queryClient.invalidateQueries(["menuItems"]); // Refetch menu items after adding
        },
    });
}
