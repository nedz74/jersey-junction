import { useRouter } from "expo-router";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Welcome() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../../assets/onboarding/welcome-bg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={[styles.imageContainer]}>
        <View style={{ position: "relative", width: "80%", height: "20%" }}>
          <Image
            source={require("../../assets/onboarding/onboarding-logo.png")}
            style={[styles.welcomeImage]}
          />
          <Text style={styles.caption}>
            "Where Every Fan Finds Their Jersey."
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.button]}
        onPress={() => router.push("/(onboarding)/screen1")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  redBorder: {
    borderWidth: 1,
    borderColor: "red",
    padding: 10,
    borderRadius: 10,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  welcomeImage: {
    width: "100%",
    height: "100%",
    marginBottom: 20,
  },
  caption: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    color: "white",
    fontWeight: "600",
    fontSize: 15,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  background: {
    flex: 1,
    position: "relative",
  },
  overlay: {
    marginTop: "auto",
    marginBottom: 100,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  title: {
    color: "white",
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    position: "absolute",
    bottom: 90,
    backgroundColor: "rgb(12, 109, 255)", // More vibrant iOS-style blue
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: "90%",
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
