import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Login() {
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
          source={require('../../assets/auth/login-bg.jpg')}
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

      {/* Login form section */}
      <View style={styles.formContainer}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        
        <View style={styles.formFields}>
          {/* Placeholder for email input */}
          <View style={styles.inputPlaceholder}>
            <Text style={styles.inputPlaceholderText}>Email</Text>
          </View>
          
          {/* Placeholder for password input */}
          <View style={styles.inputPlaceholder}>
            <Text style={styles.inputPlaceholderText}>Password</Text>
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Sign In</Text>
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
  formContainer: {
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
    height: "55%",
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  formFields: {
    width: '100%',
    marginBottom: 30,
    gap: 15,
  },
  inputPlaceholder: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  inputPlaceholderText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
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
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    margin: "auto"
  },

});
