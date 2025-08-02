import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import * as Updates from 'expo-updates';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './frontend/src/screens/navigation/AuthNavigator';

export default function App() {
  const [isCheckingForUpdate, setIsCheckingForUpdate] = useState(true);

  useEffect(() => {
    const checkUpdates = async () => {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        } else {
          setIsCheckingForUpdate(false);
        }
      } catch (error) {
        console.error('Error checking for OTA updates:', error);
        setIsCheckingForUpdate(false);
      }
    };

    checkUpdates();
  }, []);

  if (isCheckingForUpdate) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.updateText}>CHECKING FOR UPDATES, PLEASE WAIT...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  updateText: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});
