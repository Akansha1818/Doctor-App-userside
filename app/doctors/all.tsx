import { AppColors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const SPECIALTY_DATA = [
  { name: "All", icon: "grid-outline" },
  { name: "Cardiologist", image: require("@/assets/images/category/1.png") },
  { name: "Neurologist", image: require("@/assets/images/category/2.png") },
  { name: "Pediatrician", image: require("@/assets/images/category/3.png") },
  { name: "Dermatologist", image: require("@/assets/images/category/4.png") },
  { name: "Orthopedic", image: require("@/assets/images/category/5.png") },
  { name: "Psychiatrist", image: require("@/assets/images/category/6.png") },
  {
    name: "General Physician",
    image: require("@/assets/images/category/7.png"),
  },
];

const MOCK_DOCTORS = [
  {
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
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    rating: 4.8,
    reviews: 189,
    distance: "3.2 km",
    available: true,
    experience: "12 years",
    hospital: "Central Medical Center",
    image: require("@/assets/images/partial-react-logo.png"),
  },
  // Add more doctors...
];

export default function AllDoctorsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [selectedSpecialty, setSelectedSpecialty] = useState(
    (params.specialty as string) || "All",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [doctors, setDoctors] = useState(MOCK_DOCTORS);

  useEffect(() => {
    filterDoctors();
  }, [selectedSpecialty, searchQuery]);

  const filterDoctors = () => {
    let filtered = MOCK_DOCTORS;

    // Filter by specialty
    if (selectedSpecialty !== "All") {
      filtered = filtered.filter((d) => d.specialty === selectedSpecialty);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (d) =>
          d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.specialty.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setDoctors(filtered);
  };

  const renderSpecialtyFilter = ({
    item,
  }: {
    item: (typeof SPECIALTY_DATA)[0];
  }) => (
    <TouchableOpacity
      style={[
        styles.filterChip,
        selectedSpecialty === item.name && styles.filterChipActive,
      ]}
      onPress={() => setSelectedSpecialty(item.name)}
    >
      {item.image ? (
        <Image source={item.image} style={styles.filterImage} />
      ) : (
        <Ionicons
          name={item.icon as any}
          size={20}
          color={
            selectedSpecialty === item.name ? AppColors.white : AppColors.text
          }
        />
      )}
      <Text
        style={[
          styles.filterText,
          selectedSpecialty === item.name && styles.filterTextActive,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderDoctor = ({ item }: any) => (
    <TouchableOpacity
      style={styles.doctorCard}
      onPress={() => router.push(`/doctors/${item.id}` as any)}
    >
      <View style={styles.doctorInfo}>
        <View style={styles.doctorHeader}>
          <Text style={styles.doctorName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFB800" />
            <Text style={styles.rating}>{item.rating}</Text>
            <Text style={styles.reviews}>({item.reviews})</Text>
          </View>
        </View>

        <Text style={styles.specialty}>{item.specialty}</Text>
        <Text style={styles.hospital}>{item.hospital}</Text>

        <View style={styles.doctorFooter}>
          <View style={styles.badge}>
            <Ionicons
              name="location-outline"
              size={14}
              color={AppColors.textSecondary}
            />
            <Text style={styles.badgeText}>{item.distance}</Text>
          </View>
          <View style={styles.badge}>
            <Ionicons
              name="time-outline"
              size={14}
              color={AppColors.textSecondary}
            />
            <Text style={styles.badgeText}>{item.experience}</Text>
          </View>
          {item.available && (
            <View style={[styles.badge, styles.availableBadge]}>
              <Text style={styles.availableText}>Available</Text>
            </View>
          )}
        </View>
      </View>

      <TouchableOpacity
        style={styles.bookButton}
        onPress={() =>
          router.push(`/book-appointment?doctorId=${item.id}` as any)
        }
      >
        <Text style={styles.bookButtonText}>Book</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color={AppColors.textSecondary}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search doctors..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Specialty Filter */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={SPECIALTY_DATA}
        renderItem={renderSpecialtyFilter}
        keyExtractor={(item) => item.name}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      />

      {/* Results Count */}
      <Text style={styles.resultsText}>
        {doctors.length} doctor{doctors.length !== 1 ? "s" : ""} found
      </Text>

      {/* Doctor List */}
      <FlatList
        data={doctors}
        renderItem={renderDoctor}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: AppColors.white,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: AppColors.text,
  },
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  filterContent: {
    paddingRight: 20,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: AppColors.white,
    marginRight: 8,
    borderWidth: 1,
    borderColor: AppColors.border,
    minWidth: 80,
    justifyContent: "center",
  },
  filterChipActive: {
    backgroundColor: AppColors.primary,
    borderColor: AppColors.primary,
  },
  filterImage: {
    width: 20,
    height: 20,
    marginRight: 6,
  },
  filterText: {
    fontSize: 12,
    color: AppColors.text,
  },
  filterTextActive: {
    color: AppColors.white,
    fontWeight: "600",
  },
  resultsText: {
    fontSize: 14,
    color: AppColors.textSecondary,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  doctorCard: {
    flexDirection: "row",
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
  doctorInfo: {
    flex: 1,
  },
  doctorHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "bold",
    color: AppColors.text,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    fontWeight: "600",
    color: AppColors.text,
    marginLeft: 4,
  },
  reviews: {
    fontSize: 12,
    color: AppColors.textSecondary,
    marginLeft: 4,
  },
  specialty: {
    fontSize: 14,
    color: AppColors.primary,
    fontWeight: "600",
    marginBottom: 4,
  },
  hospital: {
    fontSize: 13,
    color: AppColors.textSecondary,
    marginBottom: 12,
  },
  doctorFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  badgeText: {
    fontSize: 12,
    color: AppColors.textSecondary,
  },
  availableBadge: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  availableText: {
    fontSize: 11,
    color: "#4CAF50",
    fontWeight: "600",
  },
  bookButton: {
    backgroundColor: AppColors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  bookButtonText: {
    color: AppColors.white,
    fontSize: 14,
    fontWeight: "600",
  },
});
