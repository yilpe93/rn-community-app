import { getPost } from "@/api/post";
import { queryKeys } from "@/constants";
import { useQuery } from "@tanstack/react-query";

export function useGetPost(postId: number) {
  return useQuery({
    queryFn: () => getPost(Number(postId)),
    queryKey: [queryKeys.POST, queryKeys.GET_POST, postId],
    enabled: Boolean(postId),
    refetchOnMount: "always",
  });
}
