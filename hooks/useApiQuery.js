import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchApi = async ({ url, params }) => {
    try {
        const response = await axiosInstance.get(url, { params });
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

export function useApiQuery({ url, queryKey, params = {}, options = {} }) {
    return useQuery({
        queryKey: [queryKey, params], // Ensures caching based on query params
        queryFn: () => fetchApi({ url, params }),
        ...options, // Allows passing additional options like staleTime, enabled, etc.
    });
}
