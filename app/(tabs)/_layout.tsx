import { useThemeColors } from "@/hooks/use-theme-colors";
import { Foundation } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const colors = useThemeColors();
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const color = isFocused ? colors.primary : colors.gray;

        // Render different icons based on route name
        const renderIcon = () => {
          switch (route.name) {
            case "index":
              return <Foundation name="home" size={24} color={color} />;
            case "medical-assistance":
              return (
                <View>
                  <Image
                    source={require("@/assets/images/icon/calendar.png")}
                    style={[styles.icon, { tintColor: color }]}
                  />
                </View>
              );
            case "appointments":
              return (
                <View>
                  <Image
                    source={require("@/assets/images/icon/calendar.png")}
                    style={[styles.icon, { tintColor: color }]}
                  />
                </View>
              );
            case "profile":
              return (
                <Image
                  source={require("@/assets/images/icon/user.png")}
                  style={[styles.icon, { tintColor: color }]}
                />
              );
            default:
              return null;
          }
        };

        const getLabel = () => {
          switch (route.name) {
            case "index":
              return "Home";
            case "medical-assistance":
              return "Medical AI";
            case "appointments":
              return "Appointments";
            case "profile":
              return "Profile";
            default:
              return "";
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.7}
          >
            {isFocused ? (
              <View style={styles.activeTab}>
                {renderIcon()}
                <Text style={styles.activeTabText}>{getLabel()}</Text>
              </View>
            ) : (
              renderIcon()
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen
        name="medical-assistance"
        options={{ title: "Medical AI" }}
      />
      <Tabs.Screen name="appointments" options={{ title: "Appointments" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: Platform.OS === "ios" ? 80 : 70,
    paddingBottom: Platform.OS === "ios" ? 17 : 5,
    paddingHorizontal: 20,
    backgroundColor: "#2E7DFF",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    elevation: 1,
  },
  activeTab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#FFFFFF",
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 30,
  },
  activeTabText: {
    fontSize: 12,
    color: "#000000",
  },
  icon: {
    width: 25,
    height: 25,
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: "#FF0000",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    fontSize: 10,
    color: "#FFFFFF",
    textAlign: "center",
  },
  notificationDot: {
    position: "absolute",
    top: 1,
    right: 5,
    width: 5,
    height: 5,
    borderRadius: 10,
    backgroundColor: "#FF0000",
  },
});
