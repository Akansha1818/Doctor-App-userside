import { AppColors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface Appointment {
  id: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  consultation_type: string;
  reason: string;
  doctor: {
    profiles: {
      full_name: string;
    };
    specialization: string;
  };
}

export default function AppointmentsScreen() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("upcoming");

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      // In a real app, fetch appointments from API
      // For now, using mock data
      const mockAppointments: Appointment[] = [
        {
          id: "1",
          appointment_date: new Date(Date.now() + 86400000)
            .toISOString()
            .split("T")[0], // Tomorrow
          appointment_time: "10:00 AM",
          status: "scheduled",
          consultation_type: "in_person",
          reason: "Regular checkup",
          doctor: {
            profiles: { full_name: "Dr. Sarah Johnson" },
            specialization: "Cardiologist",
          },
        },
        {
          id: "2",
          appointment_date: new Date(Date.now() + 172800000)
            .toISOString()
            .split("T")[0], // Day after tomorrow
          appointment_time: "2:30 PM",
          status: "confirmed",
          consultation_type: "video",
          reason: "Follow-up consultation",
          doctor: {
            profiles: { full_name: "Dr. Michael Chen" },
            specialization: "Neurologist",
          },
        },
        {
          id: "3",
          appointment_date: new Date(Date.now() - 86400000)
            .toISOString()
            .split("T")[0], // Yesterday
          appointment_time: "11:00 AM",
          status: "completed",
          consultation_type: "in_person",
          reason: "Blood test results",
          doctor: {
            profiles: { full_name: "Dr. Emily Davis" },
            specialization: "General Physician",
          },
        },
      ];

      setAppointments(mockAppointments);
    } catch (error) {
      console.error("Error loading appointments:", error);
      Alert.alert("Error", "Failed to load appointments");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadAppointments();
  };

  const getFilteredAppointments = () => {
    const today = new Date().toISOString().split("T")[0];

    if (filter === "upcoming") {
      return appointments.filter(
        (apt) =>
          apt.appointment_date >= today &&
          ["scheduled", "confirmed"].includes(apt.status),
      );
    } else if (filter === "past") {
      return appointments.filter(
        (apt) =>
          apt.appointment_date < today ||
          ["completed", "cancelled"].includes(apt.status),
      );
    }
    return appointments;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return AppColors.primary;
      case "confirmed":
        return "#34C759";
      case "completed":
        return AppColors.textSecondary;
      case "cancelled":
        return AppColors.secondary;
      default:
        return AppColors.textSecondary;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scheduled":
        return "time";
      case "confirmed":
        return "checkmark-circle";
      case "completed":
        return "checkmark-done-circle";
      case "cancelled":
        return "close-circle";
      default:
        return "help-circle";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleReschedule = (appointmentId: string) => {
    Alert.alert(
      "Reschedule",
      "Reschedule functionality will be implemented soon.",
    );
  };

  const handleCancel = (appointmentId: string) => {
    Alert.alert(
      "Cancel Appointment",
      "Are you sure you want to cancel this appointment?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: () => {
            // In a real app, call API to cancel appointment
            Alert.alert("Success", "Appointment cancelled successfully.");
            loadAppointments(); // Refresh the list
          },
        },
      ],
    );
  };

  const renderAppointment = (appointment: Appointment) => (
    <TouchableOpacity key={appointment.id} style={styles.appointmentCard}>
      <View style={styles.appointmentHeader}>
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>
            {appointment.doctor?.profiles?.full_name || "Doctor"}
          </Text>
          <Text style={styles.specialization}>
            {appointment.doctor?.specialization || "Specialist"}
          </Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(appointment.status) + "20" },
          ]}
        >
          <Ionicons
            name={getStatusIcon(appointment.status) as any}
            size={14}
            color={getStatusColor(appointment.status)}
          />
          <Text
            style={[
              styles.statusText,
              { color: getStatusColor(appointment.status) },
            ]}
          >
            {appointment.status}
          </Text>
        </View>
      </View>

      <View style={styles.appointmentDetails}>
        <View style={styles.detailRow}>
          <Ionicons
            name="calendar-outline"
            size={16}
            color={AppColors.textSecondary}
          />
          <Text style={styles.detailText}>
            {formatDate(appointment.appointment_date)}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons
            name="time-outline"
            size={16}
            color={AppColors.textSecondary}
          />
          <Text style={styles.detailText}>{appointment.appointment_time}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons
            name={
              appointment.consultation_type === "video"
                ? "videocam-outline"
                : appointment.consultation_type === "phone"
                  ? "call-outline"
                  : "location-outline"
            }
            size={16}
            color={AppColors.textSecondary}
          />
          <Text style={styles.detailText}>
            {appointment.consultation_type === "in_person"
              ? "In-Person"
              : appointment.consultation_type === "video"
                ? "Video Call"
                : "Phone Call"}
          </Text>
        </View>
      </View>

      {appointment.reason && (
        <View style={styles.reasonContainer}>
          <Text style={styles.reasonLabel}>Reason:</Text>
          <Text style={styles.reasonText}>{appointment.reason}</Text>
        </View>
      )}

      {["scheduled", "confirmed"].includes(appointment.status) && (
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.rescheduleButton}
            onPress={() => handleReschedule(appointment.id)}
          >
            <Ionicons
              name="calendar-outline"
              size={16}
              color={AppColors.primary}
            />
            <Text style={styles.rescheduleText}>Reschedule</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => handleCancel(appointment.id)}
          >
            <Ionicons
              name="close-circle-outline"
              size={16}
              color={AppColors.secondary}
            />
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={AppColors.primary} />
      </View>
    );
  }

  const filteredAppointments = getFilteredAppointments();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Appointments</Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterTab,
            filter === "upcoming" && styles.filterTabActive,
          ]}
          onPress={() => setFilter("upcoming")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "upcoming" && styles.filterTextActive,
            ]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterTab,
            filter === "past" && styles.filterTabActive,
          ]}
          onPress={() => setFilter("past")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "past" && styles.filterTextActive,
            ]}
          >
            Past
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterTab, filter === "all" && styles.filterTabActive]}
          onPress={() => setFilter("all")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "all" && styles.filterTextActive,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {filteredAppointments.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={64} color="#CCC" />
            <Text style={styles.emptyStateText}>No appointments found</Text>
            <Text style={styles.emptyStateSubtext}>
              {filter === "upcoming"
                ? "You have no upcoming appointments"
                : filter === "past"
                  ? "You have no past appointments"
                  : "You haven't booked any appointments yet"}
            </Text>
          </View>
        ) : (
          <View style={styles.appointmentsList}>
            {filteredAppointments.map(renderAppointment)}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    backgroundColor: AppColors.white,
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.border,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: AppColors.text,
  },
  filterContainer: {
    flexDirection: "row",
    backgroundColor: AppColors.white,
    padding: 16,
    gap: 8,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: AppColors.background,
    alignItems: "center",
  },
  filterTabActive: {
    backgroundColor: AppColors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: AppColors.textSecondary,
  },
  filterTextActive: {
    color: AppColors.white,
  },
  scrollView: {
    flex: 1,
  },
  appointmentsList: {
    padding: 16,
    gap: 12,
  },
  appointmentCard: {
    backgroundColor: AppColors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: AppColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appointmentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "600",
    color: AppColors.text,
    marginBottom: 4,
  },
  specialization: {
    fontSize: 14,
    color: AppColors.textSecondary,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  appointmentDetails: {
    gap: 8,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: AppColors.textSecondary,
  },
  reasonContainer: {
    backgroundColor: AppColors.background,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  reasonLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: AppColors.textSecondary,
    marginBottom: 4,
  },
  reasonText: {
    fontSize: 14,
    color: AppColors.text,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  rescheduleButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    backgroundColor: AppColors.primaryLight,
    gap: 6,
  },
  rescheduleText: {
    fontSize: 14,
    fontWeight: "600",
    color: AppColors.primary,
  },
  cancelButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#FFE5E5",
    gap: 6,
  },
  cancelText: {
    fontSize: 14,
    fontWeight: "600",
    color: AppColors.secondary,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    marginTop: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "600",
    color: AppColors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: AppColors.textSecondary,
    textAlign: "center",
  },
});
