import { AppColors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const MOCK_DOCTOR = {
  id: "1",
  name: "Dr. Sarah Johnson",
  specialty: "Cardiologist",
  rating: 4.9,
  reviews: 234,
  distance: "2.5 km",
  available: true,
  experience: "15 years",
  hospital: "City General Hospital",
  image: require("@/assets/images/partial-react-logo.png"),
  bio: "Dr. Sarah Johnson is a highly experienced cardiologist with over 15 years of practice. She specializes in heart disease prevention, diagnosis, and treatment.",
  education: "MD from Harvard Medical School",
  languages: ["English", "Spanish"],
};

export default function DoctorDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  // In a real app, fetch doctor data based on id
  const doctor = MOCK_DOCTOR; // For now, using mock data

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={AppColors.white} />
        </TouchableOpacity>
        <Image source={doctor.image} style={styles.doctorImage} />
        <View style={styles.headerOverlay}>
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFB800" />
            <Text style={styles.rating}>{doctor.rating}</Text>
            <Text style={styles.reviews}>({doctor.reviews} reviews)</Text>
          </View>
        </View>
      </View>

      {/* Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bio}>{doctor.bio}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Experience</Text>
          <Text style={styles.infoText}>{doctor.experience}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Hospital</Text>
          <Text style={styles.infoText}>{doctor.hospital}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Education</Text>
          <Text style={styles.infoText}>{doctor.education}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Languages</Text>
          <Text style={styles.infoText}>{doctor.languages.join(", ")}</Text>
        </View>
      </View>

      {/* Book Appointment Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => router.push(`/book-appointment?doctorId=${id}` as any)}
        >
          <Text style={styles.bookButtonText}>Book Appointment</Text>
        </TouchableOpacity>
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
    height: 300,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
  },
  doctorImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  headerOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  doctorName: {
    fontSize: 24,
    fontWeight: "bold",
    color: AppColors.white,
  },
  doctorSpecialty: {
    fontSize: 16,
    color: AppColors.white,
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  rating: {
    fontSize: 16,
    fontWeight: "600",
    color: AppColors.white,
    marginLeft: 4,
  },
  reviews: {
    fontSize: 14,
    color: AppColors.white,
    marginLeft: 4,
  },
  detailsContainer: {
    padding: 20,
  },
  infoSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: AppColors.text,
    marginBottom: 8,
  },
  bio: {
    fontSize: 16,
    color: AppColors.textSecondary,
    lineHeight: 24,
  },
  infoText: {
    fontSize: 16,
    color: AppColors.textSecondary,
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  bookButton: {
    backgroundColor: AppColors.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  bookButtonText: {
    color: AppColors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});
