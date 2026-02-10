import { AppColors } from "@/constants/colors";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function OAuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // The OAuth flow completion is handled automatically by Clerk
    // This page just shows a loading state while Clerk processes the callback
    const timer = setTimeout(() => {
      // After a brief delay, redirect to the main app
      // Clerk will have handled the authentication by this point
      router.replace("/(tabs)");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: AppColors.background,
      }}
    >
      <ActivityIndicator size="large" color={AppColors.primary} />
      <Text
        style={{
          marginTop: 20,
          fontSize: 16,
          color: AppColors.textSecondary,
          textAlign: "center",
        }}
      >
        Completing sign in...
      </Text>
    </View>
  );
}
