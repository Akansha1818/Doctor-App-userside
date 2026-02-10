import { AppColors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

const REWARDS = [
  {
    id: "1",
    title: "Health Score Boost",
    description: "Increase your health score by 10 points",
    points: 50,
    icon: "heart",
    claimed: false,
  },
  {
    id: "2",
    title: "Free Consultation",
    description: "Get one free consultation with any doctor",
    points: 200,
    icon: "medical",
    claimed: false,
  },
  {
    id: "3",
    title: "Premium Features",
    description: "Unlock premium features for 7 days",
    points: 100,
    icon: "star",
    claimed: true,
  },
  {
    id: "4",
    title: "Health Tips Book",
    description: "Download our comprehensive health tips e-book",
    points: 75,
    icon: "book",
    claimed: false,
  },
  {
    id: "5",
    title: "Fitness Tracker",
    description: "Get access to advanced fitness tracking",
    points: 150,
    icon: "fitness",
    claimed: false,
  },
];

export default function RewardsScreen() {
  const router = useRouter();

  const handleClaimReward = (rewardId: string) => {
    // In a real app, make API call to claim reward
    console.log(`Claiming reward: ${rewardId}`);
    // For now, just show alert
    alert(`Reward claimed! ${REWARDS.find((r) => r.id === rewardId)?.title}`);
  };

  const renderReward = (reward: (typeof REWARDS)[0]) => (
    <View key={reward.id} style={styles.rewardCard}>
      <View style={styles.rewardHeader}>
        <View style={styles.iconContainer}>
          <Ionicons
            name={reward.icon as any}
            size={24}
            color={AppColors.primary}
          />
        </View>
        <View style={styles.rewardInfo}>
          <Text style={styles.rewardTitle}>{reward.title}</Text>
          <Text style={styles.rewardDescription}>{reward.description}</Text>
          <Text style={styles.rewardPoints}>{reward.points} points</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.claimButton,
          reward.claimed && styles.claimButtonDisabled,
        ]}
        onPress={() => !reward.claimed && handleClaimReward(reward.id)}
        disabled={reward.claimed}
      >
        <Text
          style={[
            styles.claimButtonText,
            reward.claimed && styles.claimButtonTextDisabled,
          ]}
        >
          {reward.claimed ? "Claimed" : "Claim Reward"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={AppColors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rewards</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.pointsCard}>
          <Ionicons name="trophy" size={32} color={AppColors.primary} />
          <Text style={styles.pointsTitle}>Your Points</Text>
          <Text style={styles.pointsValue}>245</Text>
          <Text style={styles.pointsSubtitle}>
            Complete daily challenges to earn more!
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Available Rewards</Text>

        {REWARDS.map(renderReward)}

        <View style={styles.infoCard}>
          <Ionicons
            name="information-circle"
            size={20}
            color={AppColors.primary}
          />
          <Text style={styles.infoText}>
            Complete daily challenges and maintain your health streak to earn
            more points and unlock exclusive rewards!
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  header: {
    backgroundColor: AppColors.primary,
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: AppColors.white,
  },
  content: {
    padding: 20,
  },
  pointsCard: {
    backgroundColor: AppColors.white,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pointsTitle: {
    fontSize: 16,
    color: AppColors.textSecondary,
    marginTop: 8,
  },
  pointsValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: AppColors.primary,
    marginTop: 4,
  },
  pointsSubtitle: {
    fontSize: 14,
    color: AppColors.textSecondary,
    textAlign: "center",
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: AppColors.text,
    marginBottom: 16,
  },
  rewardCard: {
    backgroundColor: AppColors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rewardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: AppColors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  rewardInfo: {
    flex: 1,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: AppColors.text,
    marginBottom: 4,
  },
  rewardDescription: {
    fontSize: 14,
    color: AppColors.textSecondary,
    marginBottom: 4,
  },
  rewardPoints: {
    fontSize: 12,
    color: AppColors.primary,
    fontWeight: "600",
  },
  claimButton: {
    backgroundColor: AppColors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  claimButtonDisabled: {
    backgroundColor: AppColors.textSecondary,
  },
  claimButtonText: {
    color: AppColors.white,
    fontSize: 14,
    fontWeight: "600",
  },
  claimButtonTextDisabled: {
    color: AppColors.white,
  },
  infoCard: {
    backgroundColor: "#E8F4FD",
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 16,
  },
  infoText: {
    fontSize: 14,
    color: AppColors.text,
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
});
