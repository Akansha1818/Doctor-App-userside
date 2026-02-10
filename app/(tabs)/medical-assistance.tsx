import { AppColors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  confidence?: number;
  sources?: any[];
}

export default function MedicalAssistanceScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).substring(7));
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    loadChatHistory();
  }, []);

  const loadChatHistory = async () => {
    try {
      // In a real app, fetch chat history from API
      // For now, we'll start with empty history
      setMessages([]);
    } catch (error) {
      console.error("Error loading chat history:", error);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setLoading(true);

    try {
      // Simulate API call - in a real app, this would call your medical assistant API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: getMockResponse(inputText),
        timestamp: new Date(),
        confidence: 0.85,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Scroll to bottom
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      console.error("Error sending message:", error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const getMockResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("flu") || lowerQuery.includes("cold")) {
      return "Common symptoms of the flu include fever, cough, sore throat, body aches, and fatigue. For cold symptoms, you might experience runny nose, sneezing, and mild cough. Rest, stay hydrated, and consider over-the-counter medications. If symptoms persist or worsen, consult a healthcare professional.";
    }

    if (lowerQuery.includes("headache") || lowerQuery.includes("pain")) {
      return "Headaches can be caused by various factors including stress, dehydration, lack of sleep, or tension. Try drinking water, resting in a quiet room, and using relaxation techniques. If headaches are severe or persistent, please consult a doctor.";
    }

    if (lowerQuery.includes("doctor") || lowerQuery.includes("see")) {
      return "You should see a doctor if you experience severe symptoms, symptoms that don't improve within a few days, high fever, difficulty breathing, chest pain, or any concerning changes in your health. It's always better to be safe and get professional medical advice.";
    }

    return "I'm here to help with general health questions. For personalized medical advice, please consult with a qualified healthcare professional. Can you tell me more about what you're experiencing?";
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageContainer,
        item.type === "user" ? styles.userMessage : styles.assistantMessage,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          item.type === "user" ? styles.userBubble : styles.assistantBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            item.type === "user" ? styles.userText : styles.assistantText,
          ]}
        >
          {item.content}
        </Text>

        {item.sources && item.sources.length > 0 && (
          <View style={styles.sourcesContainer}>
            <Text style={styles.sourcesLabel}>Sources:</Text>
            {item.sources.map((source, index) => (
              <Text key={index} style={styles.sourceText}>
                • {source.title}
              </Text>
            ))}
          </View>
        )}

        <Text style={styles.timestamp}>
          {item.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.quickActionsContainer}>
      <Text style={styles.quickActionsTitle}>Quick Actions:</Text>
      <View style={styles.quickActionsButtons}>
        <TouchableOpacity
          style={styles.quickActionButton}
          onPress={() => setInputText("What are the symptoms of flu?")}
        >
          <Text style={styles.quickActionText}>Flu Symptoms</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quickActionButton}
          onPress={() => setInputText("How to prevent common cold?")}
        >
          <Text style={styles.quickActionText}>Cold Prevention</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quickActionButton}
          onPress={() => setInputText("When should I see a doctor?")}
        >
          <Text style={styles.quickActionText}>See a Doctor</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
    >
      <View style={styles.header}>
        <Ionicons name="medical" size={24} color={AppColors.primary} />
        <Text style={styles.headerTitle}>Medical Assistant</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        ListEmptyComponent={renderQuickActions()}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask me anything about your health..."
          multiline
          maxLength={500}
          editable={!loading}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            (!inputText.trim() || loading) && styles.sendButtonDisabled,
          ]}
          onPress={sendMessage}
          disabled={!inputText.trim() || loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Ionicons name="send" size={20} color="#fff" />
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.disclaimer}>
        ⚠️ This AI assistant provides general information only. Always consult a
        healthcare professional for medical advice.
      </Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: AppColors.white,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
    color: AppColors.text,
  },
  messagesList: {
    padding: 16,
    paddingBottom: 8,
  },
  messageContainer: {
    marginBottom: 16,
  },
  userMessage: {
    alignItems: "flex-end",
  },
  assistantMessage: {
    alignItems: "flex-start",
  },
  messageBubble: {
    maxWidth: "80%",
    borderRadius: 16,
    padding: 12,
  },
  userBubble: {
    backgroundColor: AppColors.primary,
  },
  assistantBubble: {
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderColor: AppColors.border,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  userText: {
    color: AppColors.white,
  },
  assistantText: {
    color: AppColors.text,
  },
  timestamp: {
    fontSize: 11,
    color: AppColors.textSecondary,
    marginTop: 4,
  },
  sourcesContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: AppColors.border,
  },
  sourcesLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: AppColors.textSecondary,
    marginBottom: 4,
  },
  sourceText: {
    fontSize: 11,
    color: AppColors.textSecondary,
    marginLeft: 4,
  },
  quickActionsContainer: {
    padding: 16,
  },
  quickActionsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: AppColors.text,
    marginBottom: 12,
  },
  quickActionsButtons: {
    gap: 8,
  },
  quickActionButton: {
    backgroundColor: AppColors.white,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AppColors.primary,
  },
  quickActionText: {
    color: AppColors.primary,
    fontSize: 14,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: AppColors.white,
    borderTopWidth: 1,
    borderTopColor: AppColors.border,
    alignItems: "flex-end",
  },
  input: {
    flex: 1,
    backgroundColor: AppColors.background,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    maxHeight: 100,
    fontSize: 15,
  },
  sendButton: {
    backgroundColor: AppColors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: {
    backgroundColor: AppColors.textSecondary,
  },
  disclaimer: {
    fontSize: 11,
    color: AppColors.textSecondary,
    textAlign: "center",
    padding: 8,
    backgroundColor: "#FFF3CD",
  },
});
