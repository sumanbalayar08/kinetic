import { useEffect } from "react";
import { router } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { useContext } from "react";
import Toast from "react-native-toast-message";
import AuthContext from "../../context/authContext";

export default function LogoutScreen() {
    
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthContext not found");

  const { logout } = authContext;

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logout();
        Toast.show({
          type: "success",
          text2: "Logged out successfully",
        });
        router.replace("/signin");
      } catch (error) {
        Toast.show({
          type: "error",
          text2: "Failed to logout. Please try again.",
        });
        router.replace("/(tabs)/(home)");
      }
    };

    handleLogout();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Logging out...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
}); 