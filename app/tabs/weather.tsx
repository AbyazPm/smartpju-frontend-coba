// app/(tabs)/weather.tsx
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useColorScheme } from 'nativewind';
import '../../app/global.css'; // Ensure NativeWind styles are applied
import colors from '../../constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function WeatherDashboardScreen() {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
  <SafeAreaView className={`flex-1 ${isDarkMode ? 'bg-darkBackground' : 'bg-white'}`}>
    <ScrollView className={`flex-1 ${isDarkMode ? 'bg-darkBackground' : 'bg-white'}`}>
      <View className="p-4">
        <Text className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Weather Dashboard
        </Text>
        <Text className={`text-lg mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          (Your teammate's section)
        </Text>

        {/* Placeholder for Weather Information */}
        <View className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg mb-4">
          <Text className="text-blue-800 dark:text-blue-200 text-xl font-semibold">Temperature: 27.3°C</Text>
          <Text className="text-blue-800 dark:text-blue-200">Humidity: 99.9%</Text>
          <Text className="text-blue-800 dark:text-blue-200">Wind Speed: 0.8 m/s</Text>
        </View>

        {/* Placeholder for Air Quality Information */}
        <View className="bg-green-100 dark:bg-green-900 p-4 rounded-lg mb-4">
          <Text className="text-green-800 dark:text-green-200 text-xl font-semibold">Air Quality Index: Good</Text>
          <Text className="text-green-800 dark:text-green-200">PM2.5: 9 µg/m³</Text>
          <Text className="text-green-800 dark:text-green-200">CO2: 400 ppm</Text>
        </View>
        <Text className={`text-sm mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          This data will come from your Smart Traffic Pole sensors.
        </Text>
      </View>
    </ScrollView>
  </SafeAreaView>
    
  );
}