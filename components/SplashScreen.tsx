import { useColorScheme } from '@/hooks/useColorScheme';
import { Image } from 'expo-image';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
  tasks?: Array<{ name: string; duration: number }>;
}

export default function SplashScreenComponent({ onFinish, tasks = [] }: SplashScreenProps) {
  const colorScheme = useColorScheme();
  const [currentTask, setCurrentTask] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const dot1Anim = useRef(new Animated.Value(0)).current;
  const dot2Anim = useRef(new Animated.Value(0)).current;
  const dot3Anim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  const isDark = colorScheme === 'dark';
  const backgroundColor = isDark ? '#000000' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#333333';
  const subtitleColor = isDark ? '#cccccc' : '#666666';
  const dotColor = isDark ? '#0A84FF' : '#007AFF';
  const progressColor = isDark ? '#0A84FF' : '#007AFF';

  useEffect(() => {
    // Keep the splash screen visible while we fetch resources
    SplashScreen.preventAutoHideAsync();

    // Animate the splash screen
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Animate loading dots with staggered timing
    const dotAnimation = Animated.stagger(200, [
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot1Anim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(dot1Anim, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot2Anim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(dot2Anim, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot3Anim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(dot3Anim, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      ),
    ]);

    dotAnimation.start();

    // Simulate task progression
    let totalDuration = 0;
    if (tasks.length > 0) {
      totalDuration = tasks.reduce((sum, task) => sum + task.duration, 0);
      
      let currentTime = 0;
      tasks.forEach((task, index) => {
        setTimeout(() => {
          setCurrentTask(index);
          const newProgress = ((index + 1) / tasks.length) * 100;
          setProgress(newProgress);
          
          Animated.timing(progressAnim, {
            toValue: newProgress / 100,
            duration: 300,
            useNativeDriver: false,
          }).start();
        }, currentTime);
        currentTime += task.duration;
      });
    }

    // Simulate loading time and hide splash screen
    const timer = setTimeout(async () => {
      try {
        await SplashScreen.hideAsync();
        onFinish();
      } catch (e) {
        console.warn('Error hiding splash screen:', e);
        onFinish();
      }
    }, Math.max(2500, totalDuration + 1000)); // Show splash for at least 2.5 seconds

    return () => {
      clearTimeout(timer);
      dotAnimation.stop();
    };
  }, []);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Image
          source={require('../assets/images/splash-icon.png')}
          style={styles.logo}
          contentFit="contain"
        />
        <Text style={[styles.title, { color: textColor }]}>JJ</Text>
        <Text style={[styles.subtitle, { color: subtitleColor }]}>Welcome to Jersey Junction</Text>
        
        {/* Task indicator */}
        {tasks.length > 0 && currentTask < tasks.length && (
          <View style={styles.taskContainer}>
            <Text style={[styles.taskText, { color: subtitleColor }]}>
              {tasks[currentTask]?.name}
            </Text>
          </View>
        )}
        
        {/* Progress bar */}
        <View style={[styles.progressContainer, { backgroundColor: isDark ? '#333' : '#f0f0f0' }]}>
          <Animated.View 
            style={[
              styles.progressBar,
              { 
                backgroundColor: progressColor,
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%']
                })
              }
            ]} 
          />
        </View>
        
        {/* Animated loading indicator */}
        <View style={styles.loadingContainer}>
          <Animated.View 
            style={[
              styles.loadingDot,
              { backgroundColor: dotColor },
              {
                opacity: dot1Anim,
                transform: [{ scale: dot1Anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 1.2]
                })}]
              }
            ]} 
          />
          <Animated.View 
            style={[
              styles.loadingDot,
              { backgroundColor: dotColor },
              {
                opacity: dot2Anim,
                transform: [{ scale: dot2Anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 1.2]
                })}]
              }
            ]} 
          />
          <Animated.View 
            style={[
              styles.loadingDot,
              { backgroundColor: dotColor },
              {
                opacity: dot3Anim,
                transform: [{ scale: dot3Anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 1.2]
                })}]
              }
            ]} 
          />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  taskContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  taskText: {
    fontSize: 14,
    textAlign: 'center',
  },
  progressContainer: {
    width: 200,
    height: 4,
    borderRadius: 2,
    marginBottom: 30,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});
