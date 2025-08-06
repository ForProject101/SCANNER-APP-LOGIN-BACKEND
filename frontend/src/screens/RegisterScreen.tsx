// src/screens/RegisterScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


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
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    console.log('Register button pressed');
    
    // Validate all fields
    if (!name.trim() || !surname.trim() || !email.trim() || !password.trim() || !department.trim() || !task.trim()) {
      Alert.alert('Missing Info', 'Please fill in all fields');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    // Password validation
    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    console.log('Starting registration process...');

    try {
      const requestBody = {
        name: name.trim(),
        surname: surname.trim(),
        email: email.trim().toLowerCase(),
        password: password,
        department: department.trim(),
        task: task.trim()
      };

      console.log('Sending registration request with data:', { ...requestBody, password: '[HIDDEN]' });

      const res = await fetch('https://scanner-app-login-backend-ddz7-git-main-forproject101s-projects.vercel.app/api/auth/register', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Response status:', res.status);
      console.log('Response headers:', res.headers);

      const data = await res.json();
      console.log('Response data:', data);

      if (res.ok) {
        Alert.alert(
          'Registration Successful', 
          'Your account has been created successfully!',
          [
            {
              text: 'OK',
              onPress: () => {
                // Clear form
                setName('');
                setSurname('');
                setEmail('');
                setPassword('');
                setDepartment('');
                setTask('');
                // Navigate to login
                navigation.navigate('Login');
              }
            }
          ]
        );
      } else {
        Alert.alert('Registration Failed', data.message || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Network Error', 'Please check your internet connection and try again');
    } finally {
      setLoading(false);
      console.log('Registration process completed');
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
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Ionicons name="person-add" size={60} color="#6C63FF" />
            </View>
            <Text style={styles.appTitle}>Embroidery Tech Hub</Text>
            <Text style={styles.appSubtitle}>Create your account</Text>
          </View>

          {/* Registration Form */}
          <View style={styles.formContainer}>
            <Text style={styles.registerTitle}>Create Account</Text>
            <Text style={styles.registerSubtitle}>Fill in your details</Text>

            {/* Name Input */}
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="First Name *"
                placeholderTextColor="#999"
                onChangeText={setName}
                value={name}
                editable={!loading}
              />
            </View>

            {/* Surname Input */}
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Last Name *"
                placeholderTextColor="#999"
                onChangeText={setSurname}
                value={surname}
                editable={!loading}
              />
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email Address *"
                placeholderTextColor="#999"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={setEmail}
                value={email}
                editable={!loading}
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password *"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                onChangeText={setPassword}
                value={password}
                editable={!loading}
              />
              <TouchableOpacity 
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                <Ionicons 
                  name={showPassword ? "eye-outline" : "eye-off-outline"} 
                  size={20} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>

            {/* Department Input */}
            <View style={styles.inputContainer}>
              <Ionicons name="business-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Department *"
                placeholderTextColor="#999"
                onChangeText={setDepartment}
                value={department}
                editable={!loading}
              />
            </View>

            {/* Task Input */}
            <View style={styles.inputContainer}>
              <Ionicons name="construct-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Task/Role *"
                placeholderTextColor="#999"
                onChangeText={setTask}
                value={task}
                editable={!loading}
              />
            </View>

            {/* Register Button */}
            <TouchableOpacity 
              style={[styles.registerButton, loading && styles.registerButtonDisabled]} 
              onPress={handleRegister}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <>
                  <Ionicons name="person-add-outline" size={20} color="#fff" style={styles.buttonIcon} />
                  <Text style={styles.registerButtonText}>Create Account</Text>
                </>
              )}
            </TouchableOpacity>

            {/* Login Link */}
            <TouchableOpacity 
              style={styles.loginLink}
              onPress={() => navigation.navigate('Login')}
              disabled={loading}
            >
              <Text style={styles.loginText}>
                Already have an account? <Text style={styles.loginTextBold}>Sign in here</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.99,
    backgroundColor: colorPalette.background,
    paddingVertical:1,
  },
  keyboardView: {
    flex: 0.99,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
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
    color: '#1a1a1a',
    marginBottom: 4,
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
  },
  registerSubtitle: {
    fontSize: 16,
    color: colorPalette.muted,
    textAlign: 'center',
    marginBottom: 32,
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
    color: '#1a1a1a',
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
  registerButtonDisabled: {
   backgroundColor: colorPalette.muted,
    shadowOpacity: 0.1,
  },
  buttonIcon: {
    marginRight: 8,
  },
  registerButtonText: {
    color: colorPalette.light,
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 24,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
     color: colorPalette.muted,
  },
  loginTextBold: {
    color: colorPalette.primary,
    fontWeight: 'bold',
  },
});
