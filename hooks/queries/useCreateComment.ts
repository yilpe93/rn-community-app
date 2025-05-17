import { createComment } from "@/api/comment";
import queryClient from "@/api/queryClient";
import { queryKeys } from "@/constants";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export function useCreateComment() {
  return useMutation({
    mutationFn: createComment,
    onSuccess: (postId: number) => {
      Toast.show({
        type: "success",
        text1: `댓글이 정상적으로 등록되었습니다.`,
      });

      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, postId],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
    },
  });
}
