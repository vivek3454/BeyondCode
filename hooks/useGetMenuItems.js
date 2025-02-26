import axiosInstance from "@/lib/axiosInstance";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const fetchMenuItems = async ({ pageParam = null, parentId = null, limit = 16 }) => {
    const { data } = await axiosInstance.get("/menu-items", {
        params: { cursor: pageParam, parentId, limit },
    });

    return data;
};

export function useGetMenuItems(parentId, queryKey, limit,enabled = true) {
    return useInfiniteQuery({
        queryKey: [queryKey, parentId],
        queryFn: ({ pageParam }) => fetchMenuItems({ pageParam, parentId, limit }),
        getNextPageParam: (lastPage) => lastPage?.nextCursor || null,
        enabled
    });
    // return useQuery({
    //     queryKey: [queryKey],
    //     queryFn: ({ pageParam }) => fetchMenuItems({ pageParam, parentId }),
    // });
}
