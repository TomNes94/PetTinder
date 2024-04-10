import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

const ConnectionPage = () => {
  const { code } = useLocalSearchParams<{ code?: string }>();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 30 }}>{code}</Text>
    </View>
  );
};

export default ConnectionPage;
