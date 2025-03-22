import { View, FlatList, Image, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { SafeAreaView } from 'react-native-safe-area-context';
import SubPageNavigation from '@/src/components/subPage/navigation/SubPageNavigation';
import { userContext } from '@/src/utils/context/ContextApi';
import ImageSenderHolder from '@/src/components/main/chatPlaceHolder/ImageSender/ImageSenderHolder';
import ImageSelectorFunc from '@/src/functions/image/ImageSelectorFunc';
import useSynceAlbomeImage from '@/src/hooks/chat/albome/useSynceAlbomeImage';
const AllPhotos = () => {

    const [selectedImage, setSelectedImage] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [after, setAfter] = useState(null);


    // Function to handle image selection
    const handleImageSelect = (image: any) => {
        ImageSelectorFunc(image, setSelectedImage, selectedImage)
    };

    // Request permission on mount
    useEffect(() => {
        (async () => {
            if (!permissionResponse || permissionResponse.status !== 'granted') {
                await requestPermission();
            }
        })();
    }, []);

    // call hook
    const { fetchPhotos } = useSynceAlbomeImage()

    // When permission is granted, start fetching photos
    useEffect(() => {
        if (permissionResponse && permissionResponse.status === 'granted') {
            fetchPhotos({ setLoading, hasMore, loading, after, setPhotos, setAfter, setHasMore });
        }
    }, [permissionResponse]);

    const renderFooter = () => {
        if (!loading) return null;
        return
    };

    return (
        <SafeAreaView className='w-full h-full bg-black'>
            <View className='w-full flexpt-3 h-full  items-center justify-between'>
                <View className='w-full flex-1 flex  px-2 '>
                    <SubPageNavigation route='All Photos' />
                    <FlatList
                        data={photos}
                        contentContainerStyle={{ padding: 10 }}
                        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 10 }}
                        keyExtractor={(item) => item.id}
                        numColumns={3}

                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={{ width: '30%', aspectRatio: 1 }} className='relative'
                                activeOpacity={0.8} onPress={() => handleImageSelect(item)}>

                                <Image
                                    source={{ uri: item.uri }}
                                    className='rounded-lg h-full w-full '
                                    resizeMode="cover"
                                />
                                <View className={`w-full h-full bg-zinc-900/70  items-center justify-center  absolute bottom-0 ${selectedImage === item.uri ? "flex" : "hidden"} `}>
                                    <Text className='text-xl font-bold text-zinc-300'>
                                        Selected
                                    </Text>
                                </View>

                            </TouchableOpacity>
                        )}
                        onEndReached={fetchPhotos}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={renderFooter}
                    />
                </View>
                <View className={` w-full flex items-center bg-zinc-600/40 backdrop-blur-md justify-center ${selectedImage ? "flex" : "hidden"}`}><ImageSenderHolder selectedImage={selectedImage} /></View>
            </View>
        </SafeAreaView>
    );
};

export default AllPhotos;
