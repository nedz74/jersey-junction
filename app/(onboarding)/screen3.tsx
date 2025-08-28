import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Screen3() {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: -0.75 * screenWidth,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [slideAnim, screenWidth]);

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
          source={require("../../assets/onboarding/screen-3-bg.jpg")}
          style={styles.background}
          resizeMode="contain"
        >
          <View style={styles.content}></View>
        </ImageBackground>
      </Animated.View>
      <Text style={[styles.title]}>Fashion meets function</Text>
      <Text style={[styles.subheading]}>
        Jerseys that work for the game and the streets. Look good, feel great.
      </Text>
      <TouchableOpacity
        style={[styles.button]}
        onPress={() => router.push("/(auth)/authLanding")}
      >
        <Text style={styles.buttonText}>Start App</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  animatedContainer: {
    flex: 1,
    width: "191%", // Make container wider to allow sliding to reveal more image content
  },
  background: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent dark overlay
  },
  title: {
    position: "absolute",
    bottom: 250,
    left: 10,
    right: 0,
    color: "#fff",
    fontSize: 38,
    fontWeight: "bold",
    width: "95%",
  },
  subheading: {
    position: "absolute",
    bottom: 210,
    left: 10,
    right: 0,
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    width: "95%",
  },
  button: {
    position: "absolute",
    bottom: 50,
    right: 30,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    bottom: 50,
    left: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
