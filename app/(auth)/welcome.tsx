import SignInWithOAuth from "@/components/auth/SignInWithOAuth";
import { Colors as AppColors } from "@/constants/colors";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Hero Image */}
      <View style={styles.heroContainer}>
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.heroImage}
          resizeMode="contain"
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to{"\n"}Doctor Sahab</Text>
        <Text style={styles.subtitle}>
          Your trusted healthcare companion.{"\n"}
          Find doctors, book appointments, and get AI-powered medical advice.
        </Text>

        {/* Google Sign In */}
        <SignInWithOAuth />

        {/* Email Login */}
        <TouchableOpacity
          style={styles.emailButton}
          onPress={() => router.push("/(auth)/login")}
        >
          <Text style={styles.emailButtonText}>Continue with Email</Text>
        </TouchableOpacity>

        {/* Terms */}
        <Text style={styles.terms}>
          By continuing, you agree to our{" "}
          <Text style={styles.link}>Terms of Service</Text> and{" "}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  heroContainer: {
    height: height * 0.45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColors.primary + "10",
  },
  heroImage: {
    width: width * 0.8,
    height: height * 0.35,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: AppColors.text,
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: AppColors.textSecondary,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
  },
  emailButton: {
    width: width * 0.8,
    padding: 16,
    borderRadius: 90,
    borderWidth: 2,
    borderColor: AppColors.primary,
    alignItems: "center",
    marginTop: 16,
  },
  emailButtonText: {
    fontSize: 17,
    color: AppColors.primary,
    fontWeight: "600",
  },
  terms: {
    fontSize: 12,
    color: AppColors.textSecondary,
    textAlign: "center",
    marginTop: 24,
    paddingHorizontal: 20,
  },
  link: {
    color: AppColors.primary,
    fontWeight: "600",
  },
});
