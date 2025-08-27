import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import SplashScreenComponent from '@/components/SplashScreen';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Sample initialization tasks
  const initializationTasks = [
    { name: 'Loading fonts...', duration: 800 },
    { name: 'Initializing app...', duration: 600 },
    { name: 'Preparing UI...', duration: 400 },
    { name: 'Almost ready...', duration: 300 },
  ];

  useEffect(() => {
    // Additional initialization logic can go here
    // For example, loading user preferences, checking authentication, etc.
    const prepare = async () => {
      try {
        // Simulate some initialization time
        await new Promise(resolve => setTimeout(resolve, 3000));
        setIsReady(true);
      } catch (e) {
        console.warn('Error during app initialization:', e);
        setIsReady(true);
      }
    };

    prepare();
  }, []);

  // Show splash screen until fonts are loaded and app is ready
  if (!loaded || !isReady) {
    return <SplashScreenComponent onFinish={() => setIsReady(true)} tasks={initializationTasks} />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
