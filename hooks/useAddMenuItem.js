import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const addMenuItem = async (menuItemData) => {
    const { data } = await axiosInstance.post("/menu-items", menuItemData);
    return data;
};

export function useAddMenuItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addMenuItem,
        onSuccess: () => {
            queryClient.invalidateQueries(["menuItems"]); // Refetch menu items after adding
        },
    });
}
