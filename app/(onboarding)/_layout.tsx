import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Onboarding flow screens */}
      <Stack.Screen name="welcome"/>
      <Stack.Screen name="screen1"/>
      <Stack.Screen name="screen2"/>
      <Stack.Screen name="screen3"/>

      {/* Auth screen */}
      <Stack.Screen name="signup" options={{ title: "Sign Up" }} />
    </Stack>
  );
}
