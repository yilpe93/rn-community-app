import { getPosts } from "@/api/post";
import { queryKeys } from "@/constants";

import { useInfiniteQuery } from "@tanstack/react-query";

export function useGetInfinitePosts() {
  return useInfiniteQuery({
    queryFn: ({ PageParams }: any) => getPosts(PageParams),
    queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1];
      return lastPost ? allPages.length + 1 : undefined;
    },
  });
}
