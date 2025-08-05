import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import * as Animatable from 'react-native-animatable';

const colorPalette = {
  primary: '#6C63FF',
  secondary: '#4D44DB',
  background: '#F9F9FF',
  text: '#2E2E3A',
  muted: '#A1A1B5',
  success: '#4ADE80',
  error: '#F75555',
  warning: '#FACC15',
  info: '#246BFD',
  light: '#FFFFFF',
  dark: '#1E1E2D'
};

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [task, setTask] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleRegister = async () => {
    if (!name || !surname || !email || !password || !department || !task) {
      Toast.show({
        type: 'error',
        text1: 'Incomplete Form',
        text2: 'Please fill in all fields',
        position: 'bottom',
        visibilityTime: 3000,
      });
      return;
    }

    if (!validateEmail(email)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Email',
        text2: 'Please enter a valid email address',
        position: 'bottom',
        visibilityTime: 3000,
      });
      return;
    }

    if (!validatePassword(password)) {
      Toast.show({
        type: 'error',
        text1: 'Weak Password',
        text2: 'Password must be at least 6 characters',
        position: 'bottom',
        visibilityTime: 3000,
      });
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('https://scanner-app-login-backend-ddz7.vercel.app/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, surname, email, password, department, task }),
      });

      const data = await res.json();

      if (res.ok) {
        Toast.show({
          type: 'success',
          text1: 'Registration Complete',
          text2: 'Your account has been created successfully!',
          position: 'bottom',
          visibilityTime: 3000,
        });
        navigation.navigate('Login');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Registration Failed',
          text2: data.message || 'Please try again',
          position: 'bottom',
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Connection Error',
        text2: 'Unable to connect to the server',
        position: 'bottom',
        visibilityTime: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Animated Logo Section */}
          <Animatable.View 
            animation="fadeInDown"
            duration={1000}
            style={styles.logoContainer}
          >
            <View style={styles.logoCircle}>
              <Ionicons name="person-add" size={60} color={colorPalette.primary} />
            </View>
            <Text style={styles.appTitle}>Embroidery Tech Hub</Text>
            <Text style={styles.appSubtitle}>Create your heavenly account</Text>
          </Animatable.View>

          {/* Registration Form */}
          <Animatable.View 
            animation="fadeInUp"
            duration={1000}
            delay={300}
            style={styles.formContainer}
          >
            <Text style={styles.registerTitle}>Create Account</Text>
            <Text style={styles.registerSubtitle}>Fill in your details below</Text>

            {/* Name Input */}
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color={colorPalette.muted} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="First Name"
                placeholderTextColor={colorPalette.muted}
                onChangeText={setName}
                value={name}
              />
            </View>

            {/* Surname Input */}
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color={colorPalette.muted} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                placeholderTextColor={colorPalette.muted}
                onChangeText={setSurname}
                value={surname}
              />
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color={colorPalette.muted} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor={colorPalette.muted}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={setEmail}
                value={email}
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color={colorPalette.muted} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password (min 6 chars)"
                placeholderTextColor={colorPalette.muted}
                secureTextEntry={!showPassword}
                onChangeText={setPassword}
                value={password}
              />
              <TouchableOpacity 
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons 
                  name={showPassword ? "eye-outline" : "eye-off-outline"} 
                  size={20} 
                  color={colorPalette.muted} 
                />
              </TouchableOpacity>
            </View>

            {/* Department Input */}
            <View style={styles.inputContainer}>
              <Ionicons name="business-outline" size={20} color={colorPalette.muted} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Department"
                placeholderTextColor={colorPalette.muted}
                onChangeText={setDepartment}
                value={department}
              />
            </View>

            {/* Task Input */}
            <View style={styles.inputContainer}>
              <Ionicons name="construct-outline" size={20} color={colorPalette.muted} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Task/Role"
                placeholderTextColor={colorPalette.muted}
                onChangeText={setTask}
                value={task}
              />
            </View>

            {/* Register Button */}
            <TouchableOpacity 
              style={[styles.registerButton, isLoading && styles.buttonDisabled]}
              onPress={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color={colorPalette.light} />
              ) : (
                <>
                  <Ionicons name="person-add-outline" size={20} color={colorPalette.light} style={styles.buttonIcon} />
                  <Text style={styles.registerButtonText}>Create Account</Text>
                </>
              )}
            </TouchableOpacity>

            {/* Login Link */}
            <TouchableOpacity 
              style={styles.loginLink}
              onPress={() => navigation.navigate('Login')}
              disabled={isLoading}
            >
              <Text style={styles.loginText}>
                Already have an account? <Text style={styles.loginTextBold}>Sign in here</Text>
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalette.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colorPalette.light,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colorPalette.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 16,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colorPalette.text,
    marginBottom: 4,
    fontFamily: 'sans-serif-medium',
  },
  appSubtitle: {
    fontSize: 16,
    color: colorPalette.muted,
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  formContainer: {
    backgroundColor: colorPalette.light,
    borderRadius: 20,
    padding: 32,
    shadowColor: colorPalette.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  registerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colorPalette.text,
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'sans-serif-medium',
  },
  registerSubtitle: {
    fontSize: 16,
    color: colorPalette.muted,
    textAlign: 'center',
    marginBottom: 32,
    fontFamily: 'sans-serif',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colorPalette.background,
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: colorPalette.text,
    fontFamily: 'sans-serif',
  },
  eyeIcon: {
    padding: 8,
  },
  registerButton: {
    backgroundColor: colorPalette.primary,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: colorPalette.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: colorPalette.muted,
  },
  buttonIcon: {
    marginRight: 8,
  },
  registerButtonText: {
    color: colorPalette.light,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-medium',
  },
  loginLink: {
    marginTop: 24,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    color: colorPalette.muted,
    fontFamily: 'sans-serif',
  },
  loginTextBold: {
    color: colorPalette.primary,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-medium',
  },
});