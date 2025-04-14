import { Redirect, Tabs } from "expo-router";
import { useContext } from "react";
import AuthContext from "../../context/authContext";

export default function TabLayout() {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthContext not found");
  const { token } = authContext;

  if (!token) {
    return <Redirect href="/(auth)/signin" />;
  }

  return (
    <Tabs screenOptions={{ headerTitle: "My App" }}>
      <Tabs.Screen name="(home)/index" options={{ title: "Home" }} />
      <Tabs.Screen name="news" options={{ title: "News" }} />
      <Tabs.Screen name="patro" options={{ title: "Patro" }} />
      <Tabs.Screen name="qrscan" options={{ title: "QR Scan" }} />
      <Tabs.Screen name="logout" options={{ title: "Logout" }} />
    </Tabs>
  );
}
