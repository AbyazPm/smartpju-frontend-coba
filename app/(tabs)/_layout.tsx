// app/(tabs)/_layout.tsx
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // For icons
import { Text, View } from 'react-native';
import { useColorScheme } from 'nativewind'; // For theme-aware styling (optional, but good practice)

// Using NativeWind for styling
import '../global.css'; // This is important for NativeWind to work
import colors from '../../constants/colors'; // We'll create this later

export default function TabLayout() {
  const { colorScheme } = useColorScheme(); // 'light' or 'dark'

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary, // Define in constants/colors.ts
        tabBarInactiveTintColor: colors.gray, // Define in constants/colors.ts
        headerShown: false, // Hide header on tab screens, individual screens can override
        tabBarStyle: {
          height: 70, // Adjust tab bar height as needed
          paddingBottom: 10, // Adjust padding
          backgroundColor: colorScheme === 'dark' ? colors.darkBackground : colors.lightBackground, // Example theme color
          borderTopWidth: 0, // No border at the top of tab bar
          elevation: 5, // Shadow for Android
          shadowOffset: { width: 0, height: -2 }, // Shadow for iOS
          shadowOpacity: 0.1,
          shadowRadius: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="weather"
        options={{
          title: 'Weather', // Label below the icon
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cloud-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cctv"
        options={{
          title: 'CCTV',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="camera-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: 'Contact',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbox-ellipses-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}