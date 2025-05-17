import { createPost } from "@/api/post";
import queryClient from "@/api/queryClient";
import { queryKeys } from "@/constants";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

function useCreatePost() {
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: `게시글이 정상적으로 등록되었습니다.`,
      });

      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
      router.replace("/");
    },
  });
}

export default useCreatePost;
