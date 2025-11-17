// app/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native'; // <-- Make sure View is imported
import './global.css'; // <-- Ensure this import is here for NativeWind

export default function RootLayout() {
  return (
  <View className="flex-1 bg-purple-500">
      <Stack>

        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}