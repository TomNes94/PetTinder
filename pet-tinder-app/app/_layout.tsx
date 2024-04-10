import FontAwesome from "@expo/vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { reloadAsync } from "expo-updates";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DevToolsBubble } from "react-native-react-query-devtools";

import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24 * 7,
      retry: 1,
    },
  },
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      void SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <View
            style={{
              paddingTop: 30,
              flex: 1,
            }}
          >
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            />
            <TouchableOpacity
              onPress={async () => {
                await AsyncStorage.clear();
                await reloadAsync();
              }}
              style={{
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.2)",
                alignItems: "center",
                justifyContent: "center",
                width: 70,
                position: "absolute",
                bottom: 25,
                right: 25,
                height: 70,
                backgroundColor: "#fff",
                borderRadius: 100,
              }}
            >
              <Text>Clear storage</Text>
            </TouchableOpacity>
          </View>
        </ThemeProvider>
        <DevToolsBubble />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
