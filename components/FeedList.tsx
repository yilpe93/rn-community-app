import { colors } from "@/constants";
import React from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import FeedItem from "./FeedItem";

export default function FeedList() {
  const dummyData = [
    {
      id: 1,
      userId: 1,
      title: "더미 데이터 제목입니다",
      description: "더미 내용입니다",
      createdAt: "2025-05-05",
      author: {
        id: 1,
        nickname: "닉네임",
        imageUri: "",
      },
      imageUris: [],
      likes: [],
      hasVote: false,
      voteCount: 1,
      commentCount: 1,
      viewCount: 1,
    },
    {
      id: 2,
      userId: 2,
      title: "더미 데이터 제목입니다22",
      description: "더미 내용입니다22",
      createdAt: "2025-05-05",
      author: {
        id: 2,
        nickname: "닉네임",
        imageUri: "",
      },
      imageUris: [],
      likes: [],
      hasVote: false,
      voteCount: 1,
      commentCount: 1,
      viewCount: 1,
    },
    {
      id: 3,
      userId: 3,
      title: "더미 데이터 제목입니다33",
      description: "더미 내용입니다33",
      createdAt: "2025-05-05",
      author: {
        id: 3,
        nickname: "닉네임",
        imageUri: "",
      },
      imageUris: [],
      likes: [],
      hasVote: false,
      voteCount: 1,
      commentCount: 1,
      viewCount: 1,
    },
  ];
  return (
    <SafeAreaView>
      <FlatList
        data={dummyData}
        renderItem={({ item }) => <FeedItem post={item} />}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 12,
    backgroundColor: colors.GRAY_200,
    gap: 12,
  },
});
