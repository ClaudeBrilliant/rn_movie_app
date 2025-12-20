import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-5xl text-primary">Welcome!</Text>
      <Link href="/onboarding" className="text-blue-500">
        Go to Onboarding
      </Link>
    </View>
  );
}