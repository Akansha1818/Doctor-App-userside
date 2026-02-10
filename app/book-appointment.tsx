import { AppColors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

const MOCK_DOCTOR = {
  id: "1",
  name: "Dr. Sarah Johnson",
  specialty: "Cardiologist",
  hospital: "City General Hospital",
};

export default function BookAppointmentScreen() {
  const { doctorId } = useLocalSearchParams<{ doctorId: string }>();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // In a real app, fetch doctor data based on doctorId
  const doctor = MOCK_DOCTOR;

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert("Error", "Please select both date and time");
      return;
    }

    // In a real app, make API call to book appointment
    Alert.alert(
      "Appointment Booked!",
      `Your appointment with ${doctor.name} is confirmed for ${selectedDate} at ${selectedTime}`,
      [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ],
    );
  };

  const renderDateOptions = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateString = date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      dates.push(dateString);
    }

    return dates.map((date) => (
      <TouchableOpacity
        key={date}
        style={[
          styles.dateOption,
          selectedDate === date && styles.dateOptionSelected,
        ]}
        onPress={() => setSelectedDate(date)}
      >
        <Text
          style={[
            styles.dateText,
            selectedDate === date && styles.dateTextSelected,
          ]}
        >
          {date}
        </Text>
      </TouchableOpacity>
    ));
  };

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
        <Text style={styles.headerTitle}>Book Appointment</Text>
      </View>

      {/* Doctor Info */}
      <View style={styles.doctorCard}>
        <Text style={styles.doctorName}>{doctor.name}</Text>
        <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
        <Text style={styles.doctorHospital}>{doctor.hospital}</Text>
      </View>

      {/* Date Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Date</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.dateContainer}
        >
          {renderDateOptions()}
        </ScrollView>
      </View>

      {/* Time Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Time</Text>
        <View style={styles.timeGrid}>
          {TIME_SLOTS.map((time) => (
            <TouchableOpacity
              key={time}
              style={[
                styles.timeSlot,
                selectedTime === time && styles.timeSlotSelected,
              ]}
              onPress={() => setSelectedTime(time)}
            >
              <Text
                style={[
                  styles.timeText,
                  selectedTime === time && styles.timeTextSelected,
                ]}
              >
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Book Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.bookButton,
            (!selectedDate || !selectedTime) && styles.bookButtonDisabled,
          ]}
          onPress={handleBooking}
          disabled={!selectedDate || !selectedTime}
        >
          <Text style={styles.bookButtonText}>Confirm Booking</Text>
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
  doctorCard: {
    backgroundColor: AppColors.white,
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "bold",
    color: AppColors.text,
  },
  doctorSpecialty: {
    fontSize: 16,
    color: AppColors.primary,
    marginTop: 4,
  },
  doctorHospital: {
    fontSize: 14,
    color: AppColors.textSecondary,
    marginTop: 2,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: AppColors.text,
    marginBottom: 15,
  },
  dateContainer: {
    marginBottom: 10,
  },
  dateOption: {
    backgroundColor: AppColors.white,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: AppColors.border,
  },
  dateOptionSelected: {
    backgroundColor: AppColors.primary,
    borderColor: AppColors.primary,
  },
  dateText: {
    fontSize: 14,
    color: AppColors.text,
  },
  dateTextSelected: {
    color: AppColors.white,
    fontWeight: "600",
  },
  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  timeSlot: {
    backgroundColor: AppColors.white,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: AppColors.border,
    width: "48%",
  },
  timeSlotSelected: {
    backgroundColor: AppColors.primary,
    borderColor: AppColors.primary,
  },
  timeText: {
    fontSize: 14,
    color: AppColors.text,
    textAlign: "center",
  },
  timeTextSelected: {
    color: AppColors.white,
    fontWeight: "600",
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
  bookButtonDisabled: {
    backgroundColor: AppColors.textSecondary,
  },
  bookButtonText: {
    color: AppColors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});
