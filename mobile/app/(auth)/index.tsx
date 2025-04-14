import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";

const IntroScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/taks.jpg")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Manage Your</Text>
        <Text style={styles.title}>Day Here</Text>
        <Text style={styles.subtitle}>
          Stay on top of your tasks, track your progress, and make every day
          count with ease.
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push("/(auth)/signin")}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          <View style={{ width: 20 }} />

          <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    width: 350,
    height: 350,
  },
  content: {
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E3A8A",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginTop: 40,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  loginButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  loginText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  registerText: {
    fontSize: 16,
    color: "#1E3A8A",
    fontWeight: "500",
  },
});
