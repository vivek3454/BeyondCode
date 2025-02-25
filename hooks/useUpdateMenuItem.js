import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateMenuItem = async (menuItemData) => {
    const { data } = await axiosInstance.patch("/menu-items", menuItemData);
    return data;
};

export function useUpdateMenuItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateMenuItem,
        onSuccess: () => {
            queryClient.invalidateQueries(["menuItems"]); // Refetch menu items after adding
        },
    });
}
