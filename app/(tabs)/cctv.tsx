// CctvLiveScreen.tsx

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView, WebViewMessageEvent} from 'react-native-webview';
import { Asset } from 'expo-asset';
import * as FileSystem from "expo-file-system/legacy";
import { useVideoPlayer, VideoView } from 'expo-video'; // <-- Add expo-video imports
import { useColorScheme } from 'nativewind';
import colors from '../../constants/colors';

const { width } = Dimensions.get('window');

interface CctvPole {
  id: string;
  name: string;
  coords: [number, number]; // [latitude, longitude]
  streamUrl: string;
  // icon?: any; // If you plan to pass icon data back, define its type
}
export default function CctvLiveScreen() {
  const { colorScheme } = useColorScheme(); // Ensure this is present
  const isDarkMode = colorScheme === 'dark'; // Ensure this is present

  const webviewRef = useRef(null);

  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [selectedPole, setSelectedPole] = useState<CctvPole | null>(null); // <-- NEW STATE for selected pole
  
  // Video Player States
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoUri, setVideoUri] = useState<string | null>(null); // For local video (if needed later)
  const currentStreamUrl = selectedPole?.streamUrl || '';
  
  // Load leaflet_map.html
  useEffect(() => {
    const loadHtml = async () => {
      const asset = Asset.fromModule(require('../../assets/html/leaflet_map.html'));
      await asset.downloadAsync();
      const content = await FileSystem.readAsStringAsync(asset.localUri || asset.uri);
    
      setHtmlContent(content);
    };
    loadHtml();
  }, []);

  const onWebViewMessage = (event: WebViewMessageEvent) => {
    try {
      // Parse the incoming JSON string into a pole object
      const poleData: CctvPole = JSON.parse(event.nativeEvent.data);
      console.log('Selected CCTV Pole:', poleData);
      setSelectedPole(poleData); // Update the selected pole state
    } catch (error) {
      console.error('Failed to parse WebView message:', error);
      console.log('Using Stream URL:', selectedPole?.streamUrl);
    }
  };

  // const player = useVideoPlayer(currentStreamUrl, (player) => {
  //   player.loop = true;
  //   if (currentStreamUrl) {
  //     player.play();
  //   }
  // });
   const player = useVideoPlayer(currentStreamUrl, (player) => {
    player.loop = true;
    if (currentStreamUrl) {
      player.play();
    }
  });

  

  // Initialize video player
  // This will now use selectedPole.streamUrl
  // const player = useVideoPlayer(selectedPole?.streamUrl || '', player => { // Use selectedPole.streamUrl
  //   player.loop = true;
  //   player.play();
  //   setIsPlaying(true);
  //   player.addListener('ratechange', () => {
  //     setIsPlaying(player.rate > 0);
  //   });
  // });
  
  return (
    <SafeAreaView className={`flex-1 ${isDarkMode ? 'bg-darkBackground' : 'bg-white'}`}>
      <View 
        className=" rounded-lg overflow-hidden" // <-- Added rounded-lg and overflow-hidden

        style={{ height: '30%', width: '100%',}}
      >
        {htmlContent ? (
          <WebView
            originWhitelist={['*']}
            source={{ html: htmlContent }}
            ref={webviewRef}
        //     onMessage={(event) => {
        //       const streamUrl = event.nativeEvent.data;
        //       console.log('Selected CCTV Stream URL:', streamUrl);

        //       // Set this streamUrl to your video player to start streaming
        //       setSelectedStream(streamUrl);
        //    }}
        //     style={{ flex: 1 }}
        //   />
        // ) : (
        //   <Text className="text-gray-500">Loading map...</Text>
        // )}
        onMessage={onWebViewMessage}
            style={{ flex: 1 }}
          />
        ) : (
          <Text className="text-gray-500">Loading map...</Text>
        )}
      </View>

      <View className="p-4 flex-1">
        <Text className="text-xl font-bold mb-2">Rekaman Live CCTV</Text>
        <Text className="text-sm mb-4">Pantau rekaman live kamera CCTV secara realtime.</Text>
        {/* Display selected pole details */}
        <View className="mb-4">
          {selectedPole ? (
            <>
              <Text className="text-base font-semibold">{selectedPole.name}</Text>
              <Text className="text-sm text-gray-500">
                Lat: {selectedPole.coords[0]} Long: {selectedPole.coords[1]}
              </Text>
            </>
          ) : (
            <Text className="text-base text-gray-500">Select a pole on the map to view details.</Text>
          )}
        </View>



        
        
           {selectedPole?.streamUrl ? (
            <View
              className="w-full bg-black items-center justify-center rounded-lg overflow-hidden"
              style={{ height: width * (9 / 16) }}
            >
              <VideoView
                player={player}
                className="flex-1 w-full"
                allowsFullscreen
                allowsPictureInPicture
                style={{ width: '100%', height: '100%' }}
              />
            </View>
          ) : (
            <View
              className="w-full bg-black rounded-lg items-center justify-center"
              style={{ height: width * (9 / 16) }}
            >
              <Text className="text-white">Pilih CCTV dari peta.</Text>
            </View>
          )}
          

          
        
      </View>
    </SafeAreaView>
  );
}
