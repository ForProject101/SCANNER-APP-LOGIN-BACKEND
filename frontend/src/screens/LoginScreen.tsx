import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
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

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Missing Information',
        text2: 'Please enter both email and password',
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

    setIsLoading(true);

    try {
      const res = await fetch('https://scanner-app-login-backend-ddz7.vercel.app/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        Toast.show({
          type: 'success',
          text1: 'Welcome Back!',
          text2: 'You have successfully logged in',
          position: 'bottom',
          visibilityTime: 3000,
        });
        
        navigation.replace('Home', { 
          user: {
            name: data.technician?.name || 'Unknown',
            surname: data.technician?.surname || 'User',
            department: data.technician?.department || 'Unknown Department',
            task: data.technician?.task || 'Unknown Task',
            avatar: '👨‍🔧'
          }
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: data.message || 'Please check your credentials',
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
        <View style={styles.content}>
          {/* Animated Logo Section */}
                   <Animatable.View 
            animation="fadeInDown"
            duration={1000}
            style={styles.logoContainer}
          >
            <View style={styles.logoCircle}>
              <Ionicons name="construct" size={60} color={colorPalette.primary} />
            </View>
            <Text style={styles.appTitle}>Embroidery Tech Hub</Text>
            <Text style={styles.appSubtitle}>Screen Scanner & Repair Tracker</Text>
          </Animatable.View>  {/* Close here */}

          {/* Login Form */}
          <Animatable.View 
            animation="fadeInUp"
            duration={1000}
            delay={300}
            style={styles.formContainer}
          >
          

            <Text style={styles.loginTitle}>Welcome Back</Text>
            <Text style={styles.loginSubtitle}>Sign in to continue your journey</Text>

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
                placeholder="Password"
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

            {/* Login Button */}
            <TouchableOpacity 
              style={[styles.loginButton, isLoading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color={colorPalette.light} />
              ) : (
                <>
                  <Ionicons name="log-in-outline" size={20} color={colorPalette.light} style={styles.buttonIcon} />
                  <Text style={styles.loginButtonText}>Sign In</Text>
                </>
              )}
            </TouchableOpacity>

            {/* Register Link */}
            <TouchableOpacity 
              style={styles.registerLink}
              onPress={() => navigation.navigate('Register')}
              disabled={isLoading}
            >
              <Text style={styles.registerText}>
                Don't have an account? <Text style={styles.registerTextBold}>Register here</Text>
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
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
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colorPalette.text,
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'sans-serif-medium',
  },
  loginSubtitle: {
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
  loginButton: {
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
  loginButtonText: {
    color: colorPalette.light,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-medium',
  },
  registerLink: {
    marginTop: 24,
    alignItems: 'center',
  },
  registerText: {
    fontSize: 16,
    color: colorPalette.muted,
    fontFamily: 'sans-serif',
  },
  registerTextBold: {
    color: colorPalette.primary,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-medium',
  },
});