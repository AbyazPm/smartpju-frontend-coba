// app/(tabs)/contact.tsx
import React from 'react';
import { View, Text, Linking, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'nativewind';
import '../../app/global.css';
import colors from '../../constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function ContactMessageScreen() {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const handleOpenTelegram = () => {
    Linking.openURL('https://t.me/your_telegram_bot_or_group'); // Replace with actual link
  };

  const handleOpenWebsiteChat = () => {
    Linking.openURL('https://your-website.com/chat'); // Replace with actual link
  };

  return (
    <SafeAreaView className={`flex-1 ${isDarkMode ? 'bg-darkBackground' : 'bg-white'}`}>
      
      <Text className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Contact Operator
      </Text>
      <Text className={`text-lg text-center mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Anda bisa menggunakan layanan Chatbot pada link di bawah ini:
      </Text>

      <TouchableOpacity
        className="w-full py-4 rounded-lg items-center mb-4"
        style={{ backgroundColor: colors.primary }}
        onPress={handleOpenTelegram}
      >
        <Text className="text-white text-lg font-semibold">Gunakan Chatbot di Telegram</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={`w-full py-4 rounded-lg items-center border ${isDarkMode ? 'border-gray-500' : 'border-gray-300'}`}
        style={{ backgroundColor: isDarkMode ? colors.darkBackground : colors.background }}
        onPress={handleOpenWebsiteChat}
      >
        <Text className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Gunakan Chatbot di Website</Text>
      </TouchableOpacity>

    </SafeAreaView>
    
  );
}