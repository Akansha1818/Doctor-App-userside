import ActionButtons from "@/components/home/ActionButtons";
import Category from "@/components/home/Category";
import DailyChallenge from "@/components/home/DailyChallenge";
import Header from "@/components/home/Header";
import HeadLine from "@/components/home/HeadLine";
import Search from "@/components/home/Search";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import React from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";

export default function HomeScreen() {
  const colors = useThemeColors();
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Header />
        <Search />
        <HeadLine />
        <Category />
        <DailyChallenge />
        <ActionButtons />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingTop: 10,
    marginTop: Platform.OS === "ios" ? 0 : 30,
  },
});
