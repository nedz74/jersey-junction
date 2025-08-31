import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface AuthFormData {
  fullName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

interface AuthFormProps {
  mode: 'login' | 'signup';
  onSubmit: (data: AuthFormData) => void;
}

export default function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const isLogin = mode === 'login';
  
  const { control, handleSubmit, formState: { errors }, watch } = useForm<AuthFormData>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const password = watch('password');

  return (
    <View style={styles.formFields}>
      {/* Full Name Input - Only for Signup */}
      {!isLogin && (
        <Controller
          control={control}
          name="fullName"
          rules={{
            required: 'Full name is required',
            minLength: {
              value: 2,
              message: 'Full name must be at least 2 characters'
            }
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="rgba(255,255,255,0.7)"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="words"
                autoCorrect={false}
              />
              {errors.fullName && (
                <Text style={styles.errorText}>{errors.fullName.message}</Text>
              )}
            </View>
          )}
        />
      )}

      {/* Email Input */}
      <Controller
        control={control}
        name="email"
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="rgba(255,255,255,0.7)"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
          </View>
        )}
      />

      {/* Password Input */}
      <Controller
        control={control}
        name="password"
        rules={{
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters'
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="rgba(255,255,255,0.7)"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
          </View>
        )}
      />

      {/* Confirm Password Input - Only for Signup */}
      {!isLogin && (
        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: 'Please confirm your password',
            validate: (value) => value === password || 'Passwords do not match'
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="rgba(255,255,255,0.7)"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
              {errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
              )}
            </View>
          )}
        />
      )}

      {/* Submit Button */}
      <TouchableOpacity 
        style={styles.submitButton} 
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.submitButtonText}>
          {isLogin ? 'Sign In' : 'Sign Up'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formFields: {
    width: '100%',
    marginBottom: 30,
    gap: 15,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  submitButton: {
    backgroundColor: '#0C6DFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});