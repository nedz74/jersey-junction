import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.messageText}>This is the Explore tab</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  messageText: {
    fontSize: 20,
    textAlign: 'center',
  },
});
