import { useThemeColors } from "@/hooks/use-theme-colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ACTION_BUTTONS = [
  {
    id: "ai-assistance",
    title: "AI Assistance",
    subtitle: "Smart scheduling & health tips",
    icon: "brain",
    route: "/medical-assistance",
    color: "#2E7DFF",
  },
  {
    id: "appointments",
    title: "My Appointments",
    subtitle: "View & manage bookings",
    icon: "calendar",
    route: "/appointments",
    color: "#FF6B6B",
  },
  {
    id: "bookings",
    title: "Quick Book",
    subtitle: "Find & book doctors",
    icon: "add-circle",
    route: "/doctors/all",
    color: "#4CAF50",
  },
];

export default function ActionButtons() {
  const router = useRouter();
  const colors = useThemeColors();

  const handleButtonPress = (route: string) => {
    router.push(route as any);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.primaryColor }]}>
        Quick Actions
      </Text>

      <View style={styles.buttonGrid}>
        {ACTION_BUTTONS.map((button) => (
          <TouchableOpacity
            key={button.id}
            style={[styles.actionButton, { backgroundColor: button.color }]}
            onPress={() => handleButtonPress(button.route)}
          >
            <View style={styles.iconContainer}>
              <Ionicons
                name={button.icon as any}
                size={28}
                color={colors.white}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.buttonTitle}>{button.title}</Text>
              <Text style={styles.buttonSubtitle}>{button.subtitle}</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.white}
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
  },
  buttonGrid: {
    gap: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    marginBottom: 2,
  },
  buttonSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  arrowIcon: {
    marginLeft: 10,
  },
});
