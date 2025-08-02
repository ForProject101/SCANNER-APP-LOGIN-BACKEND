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
    if (!name || !surname || !email || !password || !department || !task) {
      Alert.alert('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('https://scanner-app-login-backend-ddz7-git-main-forproject101s-projects.vercel.app/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, surname, email, password, department, task }),
      });

      const data = await res.json();

      if (res.ok) {
        Alert.alert('Registration successful');
        navigation.navigate('Login');
      } else {
        Alert.alert('Registration failed', data.message || 'Unknown error');
      }
    } catch (error) {
      Alert.alert('Network error', 'Please try again later');
    }
    setLoading(false);
  };

   return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Ionicons name="person-add" size={60} color="#007AFF" />
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
    flex: 1,
    backgroundColor: '#f8f9fa',
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
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
    color: '#666',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  registerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
    textAlign: 'center',
  },
  registerSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
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
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: '#28a745',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  registerButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0.1,
  },
  buttonIcon: {
    marginRight: 8,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 24,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    color: '#666',
  },
  loginTextBold: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});
