import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');



export default function AuthLanding() {
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const slideAnimation = () => {
      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: -60, // Slide left to reveal more content
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 60, // Slide right to reveal more content
          duration: 4000,
          useNativeDriver: true,
        }),
      ]).start(() => slideAnimation()); // Loop the animation
    };

    slideAnimation();
  }, [slideAnim]);



  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <ImageBackground
          source={require('../../assets/auth/authLanding-bg-1.jpg')}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.content}></View>
        </ImageBackground>
      </Animated.View>
      
      {/* Logo positioned outside animated container to stay stationary */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/onboarding/onboarding-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Welcome section with text and buttons */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTitle}>Welcome</Text>
        <Text style={styles.welcomeSubtitle}>
          To{"\n"}Jersey Junction!{"\n"}Your Ultimate Destination for Game Day Style
        </Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={() => router.push("/(auth)/login")}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.signupButton} onPress={() => router.push("/(auth)/signup")}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "#000", // Fallback color
    overflow: "hidden",
  },
  animatedContainer: {
    flex: 1,
    width: "140%", // Make container wider to allow sliding to reveal more image content
    marginLeft: "-20%", // Center the wider container
  },
  background: {
    flex: 1,
    position: "relative",
  },
  content: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent dark overlay
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 60, // Add some padding from the top
  },
  logo: {
    width: 300,
    height: 200,
    marginTop: 20,
  },
  logoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingTop: 80, // Add some padding from the top
    zIndex: 1, // Ensure it's above the animated background
  },
  welcomeContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: 'center',
    zIndex: 1,
    height: "45%",
  },
  welcomeTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    gap: 15,
  },
  loginButton: {
    backgroundColor: '#0C6DFF',
    paddingVertical: 12,
    borderRadius: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    margin:"auto"
  },
  signupButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 8,
  },
  signupButtonText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
    margin: "auto"
  },
});
