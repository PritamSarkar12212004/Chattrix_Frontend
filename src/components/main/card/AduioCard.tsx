import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Audio } from 'expo-av';
import useAudioCloudunirysend from '@/src/hooks/chat/audio/useAudioCloudunirysend';
import { userContext } from '@/src/utils/context/ContextApi';
import useAudioSenderSocket from '@/src/hooks/chat/audio/useAudioSenderSocket';
const AudioCard = ({ item }: any) => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const PlayFunc = async (uri: string) => {
        try {
            if (sound) {
                // Pause if already playing
                await sound.pauseAsync();
                if (isPlaying) {
                    setIsPlaying(false);
                } else {
                    await sound.playAsync();
                    setIsPlaying(true);
                }
            } else {
                // Load sound
                const { sound: newSound } = await Audio.Sound.createAsync(
                    { uri: uri },
                    { shouldPlay: true }
                );
                setSound(newSound);
                setIsPlaying(true);
            }
        } catch (error) {
            console.log('Error in PlayFunc:', error);
        }
    };

    // Cleanup sound when unmounting
    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [sound]);


    // call hooks

    const [progress, setUploadProgress] = useState(0);
    const [loading, setLoading] = useState(false);

    const { userData } = userContext();
    // call hooks 
    const { sendAudio } = useAudioSenderSocket()
    const { uploadAudio } = useAudioCloudunirysend()


    const handlePress = async () => {
        setLoading(true);
        const audioUri = item.uri;
        const uploadedUrl = await uploadAudio(audioUri, setUploadProgress);

        if (uploadedUrl) {
            sendAudio(userData, uploadedUrl);
        }
    };

    return (
        <View className="w-full flex-row items-center justify-between mb-3">
            <View className="flex-row items-center gap-3">
                <View className="h-20 w-20 rounded-3xl flex items-center justify-center bg-[#86A788] backdrop-blur-lg">
                    <MaterialIcons name="audiotrack" size={35} color="white" />
                </View>
                <View>
                    <Text className="text-white text-lg">
                        {item.filename.length > 10
                            ? `${item.filename.substring(0, 10)}...`
                            : item.filename}
                    </Text>
                </View>
            </View>
            <View className="flex-row gap-2 items-center justify-between">
                <TouchableOpacity
                    className="bg-[#242424] flex p-2 items-center justify-between rounded-full"
                    activeOpacity={0.8}
                    onPress={() => PlayFunc(item.uri)}
                >
                    {isPlaying ? (
                        <AntDesign name="pausecircleo" size={30} color="white" />
                    ) : (
                        <AntDesign name="playcircleo" size={30} color="white" />
                    )}
                </TouchableOpacity>
                <TouchableOpacity className="p-2 flex items-center justify-between rounded-full" activeOpacity={0.8} onPress={() => loading ? null : handlePress()}>
                    {
                        loading ? <Text className='text-white'>
                            {progress}%
                        </Text> : <Ionicons name="send-outline" size={30} color="#6556DF" />

                    }
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AudioCard;
