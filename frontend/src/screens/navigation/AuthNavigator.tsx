import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AnimatedSplash from '../AnimatedSplash'; // ✅ THIS WAS MISSING
import LoginScreen from '../LoginScreen';
import RegisterScreen from '../RegisterScreen';
import HomeScreen from './HomeScreen';
import CameraScanner from '../CameraScanner';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={AnimatedSplash} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CameraScanner" component={CameraScanner} />
    </Stack.Navigator>
  );
}
