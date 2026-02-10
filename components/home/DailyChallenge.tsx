import { useThemeColors } from "@/hooks/use-theme-colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DailyChallenge() {
  const router = useRouter();
  const colors = useThemeColors();

  const handleViewRewards = () => {
    router.push("/rewards");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.white }]}>
      <View style={styles.header}>
        <Ionicons name="trophy-outline" size={24} color={colors.primary} />
        <Text style={[styles.title, { color: colors.text }]}>
          Daily Challenge
        </Text>
      </View>

      <Text style={[styles.description, { color: colors.textSecondary }]}>
        Complete today's challenge to earn rewards and improve your health
        score!
      </Text>

      <View style={styles.progressContainer}>
        <Text style={[styles.progressText, { color: colors.text }]}>
          Progress: 3/5 tasks completed
        </Text>
        <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
          <View
            style={[styles.progressFill, { backgroundColor: colors.primary }]}
          />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.rewardsButton, { backgroundColor: colors.primaryLight }]}
        onPress={handleViewRewards}
      >
        <Text style={[styles.rewardsButtonText, { color: colors.primary }]}>
          View Rewards
        </Text>
        <Ionicons name="chevron-forward" size={16} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20,
    borderRadius: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressText: {
    fontSize: 14,
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  progressFill: {
    width: "60%", // 3/5 = 60%
    height: "100%",
    borderRadius: 3,
  },
  rewardsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: "100%",
  },
  rewardsButtonText: {
    fontSize: 14,
    fontWeight: "600",
    marginRight: 4,
  },
});
