import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerTitle: "My App" }}>
      <Tabs.Screen
        name="(home)/index"
        options={{ title: "Home" }}
      />
      <Tabs.Screen name="news" options={{ title: "News" }} />
      <Tabs.Screen name="patro" options={{ title: "Patro" }} />
      <Tabs.Screen name="qrscan" options={{ title: "QR Scan" }} />
    </Tabs>
  );
}
