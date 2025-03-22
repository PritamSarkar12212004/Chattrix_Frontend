import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import SubPageNavigation from '@/src/components/subPage/navigation/SubPageNavigation'
import * as MediaLibrary from 'expo-media-library';
import AduioCard from '@/src/components/main/card/AduioCard';

const Audio = () => {
    const [audioFiles, setAudioFiles] = useState([]);
    const [permission, requestPermission] = MediaLibrary.usePermissions();

    useEffect(() => {
        const getAudioFiles = async () => {
            if (!permission?.granted) {
                await requestPermission();
            }

            if (permission?.granted) {
                const media = await MediaLibrary.getAssetsAsync({
                    mediaType: 'audio',
                    first: 1000, // number of audio files to fetch
                });
                setAudioFiles(media.assets);
            }
        };

        getAudioFiles();
    }, [permission]);
    return (
        <SafeAreaView className='w-full h-full bg-[#000000]'>
            <View className='w-full px-3'>
                <SubPageNavigation route="Audio" />
            </View>
            <View className='w-full flex-1 flex px-3 mt-5'>
                <FlatList data={audioFiles} keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        return (
                            <AduioCard item={item} />
                        )
                    }}
                />
            </View>

        </SafeAreaView>
    )
}

export default Audio