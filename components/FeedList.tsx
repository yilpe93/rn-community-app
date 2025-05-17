import { colors } from "@/constants";
import { useGetInfinitePosts } from "@/hooks/queries/useGetInfinitePost";
import { useScrollToTop } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import FeedItem from "./FeedItem";

export default function FeedList() {
  const { data: posts, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useGetInfinitePosts();

  const handleEndReached = () => {
    if (hasNextPage && isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const [isRefreshing, setIsRefreshing] = useState(false);
  const ref = useRef<FlatList | null>(null);

  useScrollToTop(ref);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  return (
    <SafeAreaView>
      <FlatList
        data={posts?.pages.flat()}
        renderItem={({ item }) => <FeedItem post={item} />}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.contentContainer}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        ref={ref}
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
