import axiosInstance from "@/lib/axiosInstance";
import { useInfiniteQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const fetchApi = async ({ url, pageParam = null, parentId = null, limit = 16 }) => {
    try {
        const { data } = await axiosInstance.get(url, {
            params: { cursor: pageParam, parentId, limit },
        });

        return data;
    } catch (error) {
        toast.error(error?.response?.data?.error || "An error occurred")
        console.error("API Error:", error);
        throw error;
    }
};

export function useApiInfiniteQuery({ url, parentId, queryKey, limit, enabled = true, options = {} }) {
    return useInfiniteQuery({
        queryKey: [queryKey, parentId],
        queryFn: ({ pageParam }) => fetchApi({ url, pageParam, parentId, limit }),
        getNextPageParam: (lastPage) => lastPage?.nextCursor || null,
        enabled,
        ...options
    });
}
