import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './frontend/src/screens/navigation/AuthNavigator';
import * as Updates from 'expo-updates';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  useEffect(() => {
    async function checkForUpdates() {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          Alert.alert(
            'Update Available',
            'A new version is available and will be downloaded now.',
            [
              {
                text: 'OK',
                onPress: async () => {
                  await Updates.fetchUpdateAsync();
                  await Updates.reloadAsync(); // Restart app to apply update
                },
              },
            ],
            { cancelable: false }
          );
        }
      } catch (e) {
        console.error('Error checking for updates:', e);
      }
    }
    checkForUpdates();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <AuthNavigator />
    </NavigationContainer>
  );
}
