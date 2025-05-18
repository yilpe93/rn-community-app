import { baseUrls } from "@/api/axios";
import { ImageUri } from "@/types";
import { router } from "expo-router";
import React from "react";
import { Image, Platform, Pressable, ScrollView, StyleSheet } from "react-native";

interface Props {
  imageUris: ImageUri[];
  onDeleteUri?: (index: number) => void;
}

function ImagePreviewList({ imageUris = [], onDeleteUri }: Props) {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false} // 스크롤 보이지 않게 하는 옵션
      contentContainerStyle={styles.container}
    >
      {imageUris.map(({ uri }, index) => {
        const imageUri = `${Platform.OS === "ios" ? baseUrls.ios : baseUrls.android}/${uri}`;

        return (
          <Pressable
            key={uri + index}
            style={styles.imageContainer}
            onPress={() => router.push({ pathname: "/image", params: { uri: imageUri } })}
          >
            <Image style={styles.image} source={{ uri: imageUri }} />
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 15,
    flexGrow: 1,
  },
  imageContainer: {
    width: 90,
    height: 90,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  imageCancel: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 99,
  },
});

export default ImagePreviewList;
