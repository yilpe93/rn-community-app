import { updatePost } from "@/api/post";
import queryClient from "@/api/queryClient";
import { queryKeys } from "@/constants";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export function useUpdatePost() {
  return useMutation({
    mutationFn: updatePost,
    onSuccess: (postId: number) => {
      Toast.show({
        type: "success",
        text1: `게시글이 정상적으로 수정되었습니다.`,
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
