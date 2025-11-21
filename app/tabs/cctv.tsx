// CctvLiveScreen.tsx

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { Asset } from 'expo-asset';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useColorScheme } from 'nativewind';
import colors from '../../constants/colors';

const { width } = Dimensions.get('window');

interface CctvPole {
  id: string;
  name: string;
  coords: [number, number];
  streamUrl: string;
}

export default function CctvLiveScreen() {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const webviewRef = useRef(null);

  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [selectedPole, setSelectedPole] = useState<CctvPole | null>(null);

  const currentStreamUrl = selectedPole?.streamUrl || '';

  /** 🔥 FIX: Load HTML using Asset + fetch (no file-system encoding issues) */
  useEffect(() => {
    const loadHtml = async () => {
      try {
        const asset = Asset.fromModule(
          require('../../assets/html/leaflet_map.html')
        );

        await asset.downloadAsync();

        const response = await fetch(asset.localUri!);
        const text = await response.text();
        setHtmlContent(text);
      } catch (err) {
        console.error('Failed to load HTML:', err);
      }
    };

    loadHtml();
  }, []);

  /** Receive data from WebView (JSON string) */
  const onWebViewMessage = (event: WebViewMessageEvent) => {
    try {
      const poleData: CctvPole = JSON.parse(event.nativeEvent.data);
      console.log('Selected CCTV Pole:', poleData);
      setSelectedPole(poleData);
    } catch (e) {
      console.error('Invalid WebView message:', e);
    }
  };

  /** Create video player */
  const player = useVideoPlayer(currentStreamUrl, (player) => {
    player.loop = false;
    if (currentStreamUrl) player.play();
  });

  return (
    <SafeAreaView className={`flex-1 ${isDarkMode ? 'bg-darkBackground' : 'bg-white'}`}>
      
      {/* MAP VIEW */}
      <View className="rounded-lg overflow-hidden" style={{ height: '30%', width: '100%' }}>
        {htmlContent ? (
          <WebView
            originWhitelist={['*']}
            source={{ html: htmlContent }}
            ref={webviewRef}
            onMessage={onWebViewMessage}
            style={{ flex: 1 }}
          />
        ) : (
          <Text className="text-gray-500">Loading map…</Text>
        )}
      </View>

      {/* VIDEO SECTION */}
      <View className="p-4 flex-1">
        <Text className="text-xl font-bold mb-2">Rekaman Live CCTV</Text>
        <Text className="text-sm mb-4">Pantau rekaman live kamera CCTV secara realtime.</Text>

        {selectedPole ? (
          <>
            <Text className="text-base font-semibold">{selectedPole.name}</Text>
            <Text className="text-sm text-gray-500">
              Lat: {selectedPole.coords[0]} | Long: {selectedPole.coords[1]}
            </Text>
          </>
        ) : (
          <Text className="text-gray-500 mb-2">Pilih titik CCTV dari peta.</Text>
        )}

        {/* VIDEO PLAYER */}
        {currentStreamUrl ? (
          <View
            className="w-full bg-black items-center justify-center rounded-lg overflow-hidden mt-4"
            style={{ height: width * (9 / 16) }}
          >
            <VideoView
              player={player}
              allowsFullscreen
              allowsPictureInPicture
              style={{ width: '100%', height: '100%' }}
            />
          </View>
        ) : (
          <View
            className="w-full bg-black items-center justify-center rounded-lg mt-4"
            style={{ height: width * (9 / 16) }}
          >
            <Text className="text-white">Tidak ada stream dipilih.</Text>
          </View>
        )}

      </View>
    </SafeAreaView>
  );
}
