import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        {/* 👇 Show onboarding for now */}
        <Stack.Screen name="(onboarding)" />
        {/* Later, you can switch to (tabs) */}
        {/* <Stack.Screen name="(tabs)" /> */}
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
