import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Easing, Image, ImageBackground, Keyboard, StyleSheet, Text, View } from 'react-native';
import AuthForm from '../../components/AuthForm';

const { width, height } = Dimensions.get('window');

export default function Login() {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const formPositionAnim = useRef(new Animated.Value(0)).current;

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

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener('keyboardDidShow', (e) => {
      Animated.timing(formPositionAnim, {
        toValue: -e.endCoordinates.height + 80,
        duration: 250,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    });

    const keyboardWillHide = Keyboard.addListener('keyboardDidHide', () => {
      Animated.timing(formPositionAnim, {
        toValue: 0,
        duration: 250,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    });

    return () => {
      keyboardWillShow?.remove();
      keyboardWillHide?.remove();
    };
  }, [formPositionAnim]);

  const handleLoginSubmit = (data: { email: string; password: string }) => {
    console.log('Login form submitted:', data);
    // TODO: Implement actual login logic here
  };

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
      <Animated.View
        style={[
          styles.formContainer,
          {
            transform: [{ translateY: formPositionAnim }],
          },
        ]}
      >
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        
        <AuthForm mode="login" onSubmit={handleLoginSubmit} />
      </Animated.View>
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
});
