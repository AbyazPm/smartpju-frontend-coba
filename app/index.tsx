// app/index.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';
import { useColorScheme } from 'nativewind';
import './global.css';
import colors from '../constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OnboardingScreen() {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <SafeAreaView className={`flex-1 ${isDarkMode ? 'bg-darkBackground' : 'bg-white'}`}>
      <View className="flex-1 items-center justify-center p-6">
        <View className="flex-1 items-center ">
          <Image
            source={require('../assets/onboarding-image.png')} // Confirmed this filename
            className="w-64 h-64 mb-8"
            resizeMode="contain"
          />
          <Text className={`text-3xl font-bold text-center mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Sistem Cerdas Pemantau Penerangan Jalan Umum
          </Text>
          <Text className={`text-base text-center mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Pantau data sensor cuaca, kualitas udara, dan CCTV secara real-time.
          </Text>
        </View>

        <Link href="/cctv" asChild>
          <TouchableOpacity
            className="w-full py-4 rounded-lg items-center mb-6  z-10"
            style={{ backgroundColor: colors.primary }}
          >
            <Text className="text-white text-lg text-center font-semibold">Get Started</Text>
          </TouchableOpacity>
        </Link>

        <Image
          source={require('../assets/city-silhouette.png')}
          className="w-auto absolute bottom-0 z-0"
          resizeMode="cover"
        />
      </View>
    </SafeAreaView>
  );
}