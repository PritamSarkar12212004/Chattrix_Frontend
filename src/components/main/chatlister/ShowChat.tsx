import { View, Text, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { userContext } from "@/src/utils/context/ContextApi";
import { Audio } from 'expo-av';
import Entypo from '@expo/vector-icons/Entypo';
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const ShowChat = ({ item }: any) => {
  const { userDataLocalTemp } = userContext();
  const isCurrentUser = item.textSender._id === userDataLocalTemp._id;
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  // --------------------- Image Size Handling ---------------------
  useEffect(() => {
    if (item?.messageImage) {
      Image.getSize(
        item.messageImage,
        (width, height) => {
          const maxWidth = 250; // max width
          const scaleFactor = width > maxWidth ? maxWidth / width : 1;
          setImageSize({
            width: width * scaleFactor,
            height: height * scaleFactor,
          });
        },
        (error) => {
          console.log("Error loading image:", error);
        }
      );
    }
  }, [item?.messageImage]);

  // --------------------- Audio Handling ---------------------
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const PlayFunc = async (uri: string) => {
    try {
      if (sound) {
        const status = await sound.getStatusAsync();
        if (status.isPlaying) {
          // If playing, pause
          await sound.pauseAsync();
          setIsPlaying(false);
        } else {
          // Resume
          await sound.playAsync();
          setIsPlaying(true);
        }
      } else {
        // Load and play new sound
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: uri },
          { shouldPlay: true }
        );
        setSound(newSound);
        setIsPlaying(true);

        // Auto reset when finished playing
        newSound.setOnPlaybackStatusUpdate((status: any) => {
          if (status.didJustFinish) {
            setIsPlaying(false);
            setSound(null);
          }
        });
      }
    } catch (error) {
      console.log('Error in PlayFunc:', error);
    }
  };

  // Cleanup when unmounting or switching audio
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return (
    <View
      className={`w-full flex-row items-center gap-3 ${isCurrentUser ? "justify-end" : "justify-start"} mb-2`}
    >
      {/* Message Box */}
      <View
        className={`py-3 px-4 max-w-[80%] ${isCurrentUser
          ? "bg-[#FFCF50] rounded-t-2xl rounded-b-2xl rounded-br-none"
          : "bg-white rounded-t-2xl rounded-b-2xl rounded-bl-none"
          }`}
      >

        {/* --------------------- Audio Message --------------------- */}
        {item?.messageAudio ? (
          <View className="flex-row items-center gap-2 w-52">
            <TouchableOpacity activeOpacity={0.7} onPress={() => PlayFunc(item.messageAudio)}>
              <Entypo name={isPlaying ? "controller-paus" : "controller-play"} size={30} color="black" />
            </TouchableOpacity>
            <Text>{isPlaying ? "Playing..." : "Tap to Play"}</Text>
          </View>
        ) : null}

        {/* --------------------- Image Message --------------------- */}
        {item?.messageImage && imageSize.width && imageSize.height ? (
          <Image

            source={{ uri: item.messageImage }}
            style={{
              width: imageSize.width,
              height: imageSize.height,
              borderRadius: 10,
              marginBottom: 5,
            }}
          />
        ) : item?.messageImage ? (
          <ActivityIndicator size="small" color="#000" />
        ) : null}



        {/* --------------------- Contact --------------------- */}

        {item?.messageContact ? (
          <View className="flex-row items-center gap-2">
            <Image
              source={{ uri: item.messageContact.profileImage }}
              className="w-10 h-10 rounded-full"
            />
            <View>
              <Text className="font-bold">{item.messageContact.name}</Text>
              <Text className="text-xs text-gray-500">{item.messageContact?.phoneNumbers[0].number ? item.messageContact.phoneNumbers[0].number : null}</Text>
            </View>
          </View>
        ) : null}
        {/* --------------------- Map --------------------- */}
        {
          item?.messageLocation
            ? (
              <View className="w-40 h-60">
                <MapView
                  provider={PROVIDER_GOOGLE}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  initialRegion={{
                    latitude: item.messageLocation.latitude,
                    longitude: item.messageLocation.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                >

                  <Marker coordinate={{
                    latitude: item.messageLocation.latitude,
                    longitude: item.messageLocation.longitude,
                  }}
                    title="Location"
                  />

                </MapView>
              </View>
            ) : null
        }



        {/* --------------------- Text Message --------------------- */}
        {item.message ? (
          <Text className="text-lg tracking-tight leading-tight">
            {item.message}
          </Text>
        ) : null}

      </View>
    </View >
  );
};

export default ShowChat;
