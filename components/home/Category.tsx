import { useThemeColors } from "@/hooks/use-theme-colors";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ButtonProps {
  image: ImageSourcePropType;
  category: string;
}

const Button: React.FC<ButtonProps> = ({ image, category }) => {
  const router = useRouter();
  const colors = useThemeColors();

  const handlePress = () => {
    router.push(`/doctors/all?category=${encodeURIComponent(category)}`);
  };

  return (
    <TouchableOpacity
      style={[styles.categoryIcon, { backgroundColor: colors.primaryLight }]}
      onPress={handlePress}
    >
      <Image source={image} style={styles.categoryImage} resizeMode="cover" />
    </TouchableOpacity>
  );
};

const Button2: React.FC = () => {
  return (
    <TouchableOpacity style={styles.seeAllButton}>
      <Text style={styles.seeAllText}>See all</Text>
    </TouchableOpacity>
  );
};

export default function Category() {
  const router = useRouter();
  const colors = useThemeColors();

  const handleSeeAll = () => {
    router.push("/doctors/all");
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.primaryColor }]}>
        Medical Specialist
      </Text>
      <View style={styles.row}>
        <Button
          image={require("@/assets/images/category/1.png")}
          category="Cardiologist"
        />
        <Button
          image={require("@/assets/images/category/2.png")}
          category="Neurologist"
        />
        <Button
          image={require("@/assets/images/category/3.png")}
          category="Pediatrician"
        />
        <Button
          image={require("@/assets/images/category/4.png")}
          category="Dermatologist"
        />
      </View>
      <View style={styles.row}>
        <Button
          image={require("@/assets/images/category/5.png")}
          category="Orthopedic"
        />
        <Button
          image={require("@/assets/images/category/6.png")}
          category="Psychiatrist"
        />
        <Button
          image={require("@/assets/images/category/7.png")}
          category="General Physician"
        />
        <TouchableOpacity
          style={[
            styles.seeAllButton,
            { backgroundColor: colors.secondaryColor },
          ]}
          onPress={handleSeeAll}
        >
          <Text style={[styles.seeAllText, { color: colors.white }]}>
            See all
          </Text>
        </TouchableOpacity>
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
  },
  row: {
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    gap: 25,
    marginTop: 18,
  },
  categoryIcon: {
    padding: 12,
    borderRadius: 16,
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryImage: {
    width: 35,
    height: 35,
  },
  seeAllButton: {
    borderRadius: 20,
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  seeAllText: {
    fontSize: 14,
  },
});
