import AuthRouter from "@/components/AuthRouter";
import { SafeAreaView, Text } from "react-native";

export default function HomeScreen() {
  return (
    <AuthRouter>
      <SafeAreaView>
        <Text>내정보 스크린</Text>
      </SafeAreaView>
    </AuthRouter>
  );
}
