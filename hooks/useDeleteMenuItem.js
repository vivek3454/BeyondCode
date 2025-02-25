import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteMenuItem = async (menuItemId) => {
    const { data } = await axiosInstance.delete(`/menu-items?menuItemId=${menuItemId}`);
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
