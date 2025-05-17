import AuthRouter from "@/components/AuthRouter";
import CommentItem from "@/components/CommentItem";
import FeedItem from "@/components/FeedItem";
import InputField from "@/components/InputField";
import { colors } from "@/constants";
import { useCreateComment } from "@/hooks/queries/useCreateComment";
import { useGetPost } from "@/hooks/queries/useGetPost";
import { CreateCommentDto } from "@/types";
import { useLocalSearchParams } from "expo-router";
import React, { Fragment, useRef, useState } from "react";
import { Keyboard, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data: post, isPending, isError } = useGetPost(Number(id));
  const [content, setContent] = useState<string>("");
  const createComment = useCreateComment();
  const scrollRef = useRef<ScrollView | null>(null);
  const [parentCommentId, setParentCommentId] = useState<number | null>(null);
  const inputRef = useRef<TextInput | null>(null);

  if (isPending || isError) {
    return <></>;
  }

  const handleReply = (commentId: number) => {
    setParentCommentId(commentId);
    inputRef.current?.focus();
  };

  const handleCancelReply = () => {
    setParentCommentId(null);
    Keyboard.dismiss(); // 키보드 내리기
  };

  const handleSubmitComment = () => {
    const commentData: CreateCommentDto = {
      postId: post.id,
      content,
    };

    if (parentCommentId) {
      createComment.mutate({ ...commentData, parentCommentId });
      setContent("");
      handleCancelReply();
      return;
    }

    createComment.mutate(commentData);
    setContent("");

    setTimeout(() => {
      scrollRef.current?.scrollToEnd();
    }, 500);
  };

  return (
    <AuthRouter>
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView contentContainerStyle={styles.awareScrollViewContainer}>
          <ScrollView ref={scrollRef} style={{ marginBottom: 75 }} contentContainerStyle={styles.scrollViewContainer}>
            <View style={{ marginTop: 12 }}>
              <FeedItem post={post} isDetail={true} />
              <Text style={styles.commentCount}>댓글 {post.commentCount}</Text>
            </View>

            {post.comments?.map((comment) => (
              <Fragment key={comment.id}>
                <CommentItem
                  parentCommentId={parentCommentId}
                  onReply={() => handleReply(comment.id)}
                  onCancelReply={handleCancelReply}
                  comment={comment}
                />

                {comment.replies.map((reply) => (
                  <CommentItem key={reply.id} comment={reply} isReply={true} />
                ))}
              </Fragment>
            ))}
          </ScrollView>

          <View style={styles.commentInputContainer}>
            <InputField
              ref={inputRef}
              value={content}
              returnKeyType="send"
              onChangeText={(text) => setContent(text)}
              onSubmitEditing={handleSubmitComment}
              placeholder={parentCommentId ? "답글 남기는중..." : "댓글을 남겨보세요."}
              rightChild={
                <Pressable disabled={!content} style={styles.inputButtonContainer} onPress={handleSubmitComment}>
                  <Text style={styles.inputButtonText}>등록</Text>
                </Pressable>
              }
            />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </AuthRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  awareScrollViewContainer: {
    flex: 1,
    backgroundColor: colors.GRAY_200,
  },
  scrollViewContainer: {
    backgroundColor: colors.WHITE,
  },
  commentCount: {
    marginTop: 12,
    backgroundColor: colors.WHITE,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: "bold",
  },
  commentInputContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY_200,
    backgroundColor: colors.WHITE,
  },

  inputButtonContainer: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: colors.ORANGE_600,
  },
  inputButtonText: {
    fontWeight: "bold",
    color: colors.WHITE,
  },
});

export default PostDetailScreen;
