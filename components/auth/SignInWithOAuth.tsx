import React from "react";
import * as WebBrowser from "expo-web-browser";
import { TouchableOpacity, Text, Dimensions, StyleSheet, View } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { AppColors } from "@/constants/colors";

WebBrowser.maybeCompleteAuthSession();

const { width } = Dimensions.get("screen");

const SignInWithOAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <View style={styles.iconContainer}>
        <Ionicons name="logo-google" size={24} color={AppColors.white} />
      </View>
      <Text style={styles.buttonText}>Login With Google</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: AppColors.primary,
    padding: 16,
    marginTop: 20,
    alignItems: "center",
    borderRadius: 90,
    width: width * 0.8,
    flexDirection: "row",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    marginRight: 12,
  },
  buttonText: {
    fontSize: 17,
    color: AppColors.white,
    fontWeight: "600",
  },
});

export default SignInWithOAuth;
