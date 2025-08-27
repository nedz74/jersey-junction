import { StyleSheet, Text, type TextProps } from 'react-native';

export function ThemedText({ style, ...rest }: TextProps) {
  return (
    <Text
      style={[styles.default, style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    color: '#000',
  },
});
