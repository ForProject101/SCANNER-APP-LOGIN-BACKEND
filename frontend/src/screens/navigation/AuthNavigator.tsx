import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Both screens are in src/screens, so go up one level from navigation folder, then into screens folder
import LoginScreen from '../LoginScreen';
import RegisterScreen from '../RegisterScreen';
import HomeScreen from './HomeScreen';
import CameraScannerScreen from './CameraScannerScreen'; // or adjust path

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Scanner" component={CameraScannerScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
