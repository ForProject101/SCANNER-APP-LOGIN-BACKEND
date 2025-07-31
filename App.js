// App.tsx (or App.js if you're using JS, but TS is recommended)
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './frontend/src/screens/navigation/AuthNavigator';



export default function App() {
  return (
    <NavigationContainer>
      

      {/* Your auth screens */}
      <AuthNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
