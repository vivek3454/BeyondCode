import { DELETE } from "@/constants/apiMethods";
import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const apiCall = async ({ url, method, data }) => {
    try {
        const config = method === DELETE ? { params: data } : { data: data || {} };
        const response = await axiosInstance({ url, method, ...config });
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};


export function useApiMutation({ url, method, invalidateKey }) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => apiCall({ url, method, data }),
        onSuccess: (data) => {
            toast.success(data?.message);
            if (invalidateKey) {
                queryClient.invalidateQueries(invalidateKey);
            }
        },
        onError: (error) => {
            toast.error(error?.response?.data?.error);
        }
    });
}
