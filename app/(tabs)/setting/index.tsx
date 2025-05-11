import AuthRouter from "@/components/AuthRouter";
import useAuth from "@/hooks/queries/useAuth";
import { Button, SafeAreaView, Text } from "react-native";

export default function HomeScreen() {
  const { logout } = useAuth();

  return (
    <AuthRouter>
      <SafeAreaView>
        <Text>내 설정</Text>

        <Button onPress={logout} title="로그아웃" />
      </SafeAreaView>
    </AuthRouter>
  );
}
