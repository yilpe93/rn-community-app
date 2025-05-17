import { colors } from "@/constants";
import Feather from "@expo/vector-icons/Feather";
import { Link, router, Stack } from "expo-router";

export default function PostLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.BLACK,
        contentStyle: {
          backgroundColor: colors.WHITE,
        },
      }}
    >
      <Stack.Screen
        name="write"
        options={{
          title: "글쓰기",
          headerShown: true,
          headerLeft: () => (
            <Link href={"/"} replace>
              <Feather name="arrow-left" size={28} color="black" />
            </Link>
          ),
        }}
      />

      <Stack.Screen
        name="update/[id]"
        options={{
          title: "수정",
          headerShown: true,
          headerLeft: () => (
            <Link href={"/"} replace>
              <Feather name="arrow-left" size={28} color="black" onPress={() => router.back()} />
            </Link>
          ),
        }}
      />

      <Stack.Screen
        name="[id]"
        options={{
          title: "",
          headerShown: true,
          headerLeft: () => (
            <Link href={"/"} replace>
              <Feather
                name="arrow-left"
                size={28}
                color="black"
                onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))}
              />
            </Link>
          ),
        }}
      />
    </Stack>
  );
}
