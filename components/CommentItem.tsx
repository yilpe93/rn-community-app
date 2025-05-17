import { colors } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import { useDeleteComment } from "@/hooks/queries/useDeleteComment";
import { Comment } from "@/types";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import InputField from "./InputField";
import Profile from "./Profile";

interface CommentItemProps {
  comment: Comment;
  parentCommentId?: number | null;
  onReply?: () => void;
  onCancelReply?: () => void;
  isReply?: boolean;
}

function CommentItem({ comment, parentCommentId, onReply, onCancelReply, isReply = false }: CommentItemProps) {
  const { auth } = useAuth();
  const deleteComment = useDeleteComment();
  const { showActionSheetWithOptions } = useActionSheet();

  const getCommentBackground = () => {
    if (parentCommentId === comment.id) {
      return colors.ORANGE_100;
    }

    if (isReply) {
      return colors.GRAY_50;
    }

    return colors.WHITE;
  };

  const handlePressOption = () => {
    const options = ["삭제", "취소"];

    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;

    showActionSheetWithOptions({ options, cancelButtonIndex, destructiveButtonIndex }, (selectedIndex?: number) => {
      switch (selectedIndex) {
        case destructiveButtonIndex: //삭제
          deleteComment.mutate(comment.id);
          break;
        case cancelButtonIndex: // 취소
          break;
        default:
          break;
      }
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: getCommentBackground() }]}>
      <View style={styles.profileContainer}>
        {isReply && <MaterialCommunityIcons name="arrow-right-bottom" size={24} color={"black"} />}

        <Profile
          imageUri={comment.isDeleted ? "" : comment.user.imageUri}
          nickname={comment.isDeleted ? "(삭제)" : comment.user.nickname}
          createdAt={comment.createdAt}
          onPress={() => {}}
          option={
            auth.id === comment.user.id && (
              <Ionicons name="ellipsis-vertical" size={24} color={colors.BLACK} onPress={handlePressOption} />
            )
          }
        />
      </View>

      <InputField editable={false} value={comment.isDeleted ? "삭제된 댓글입니다." : comment.content} />

      {!comment.isDeleted && !isReply && (
        <View style={styles.replyButtonContainer}>
          <Pressable onPress={onReply}>
            <Text style={styles.replyButton}>답글 남기기</Text>
          </Pressable>

          {parentCommentId === comment.id && (
            <Pressable onPress={onCancelReply}>
              <Text style={styles.cancelButton}>취소</Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    backgroundColor: colors.WHITE,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  replyButtonContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  replyButton: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.ORANGE_600,
  },
  cancelButton: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.BLACK,
  },
});

export default CommentItem;
