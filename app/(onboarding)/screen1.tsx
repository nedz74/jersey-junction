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

export default function Screen1() {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get("window").width;

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
          source={require("../../assets/onboarding/screen-1-bg.jpg")}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.content}></View>
        </ImageBackground>
      </Animated.View>
      <Text style={[styles.title]}>
        Exclusive Jersey Collections
      </Text>
      <Text style={[styles.subheading]}>  
        Trendy designs that combine comfort and style for every fan
      </Text>
      <TouchableOpacity
        style={[styles.button]}
        onPress={() => router.push("/(onboarding)/screen2")}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  redBorder: {
    borderWidth: 1,
    borderColor: "red",
    padding: 10,
    borderRadius: 10,
  },
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
    bottom:210,
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
});
