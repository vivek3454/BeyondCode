import axiosInstance from "@/lib/axiosInstance";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const fetchMenuItems = async ({ pageParam = null, parentId = null }) => {
    const { data } = await axiosInstance.get("/menu-items", {
        params: { cursor: pageParam, parentId, limit: 10 },
    });

    return data;
};

export function useGetMenuItems(parentId,queryKey) {
    // return useInfiniteQuery({
    //     queryKey: ["menuItems", parentId],
    //     queryFn: ({ pageParam }) => fetchMenuItems({ pageParam, parentId }),
    //     getNextPageParam: (lastPage) => lastPage?.nextCursor || null,
    // });
    return useQuery({
        queryKey: [queryKey],
        queryFn: ({ pageParam }) => fetchMenuItems({ pageParam, parentId }),
    });
}
