// app/auth/_layout.tsx
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Default Auth Landing screen */}
      <Stack.Screen name="authLanding" options={{ title: "Authentication" }} />

      {/* Login screen */}
      <Stack.Screen name="login" options={{ title: "Login" }} />

      {/* Signup screen */}
      <Stack.Screen name="signup" options={{ title: "Sign Up" }} />
    </Stack>
  );
}
