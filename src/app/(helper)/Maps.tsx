import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { useNavigation } from 'expo-router';
import useGetLocation from '@/src/hooks/chat/location/useGetLocation';

const Maps = () => {
    const [region, setRegion] = useState(null);
    const [marker, setMarker] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state

    const navigation = useNavigation()
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log("jhello");
                setLoading(false);
                navigation.goBack()
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            setRegion({
                latitude,
                longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
            setLoading(false); // Stop loader
        })();
    }, []);

    // call hooks
    const { sendLocation } = useGetLocation()

    const handleMapPress = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setMarker({ latitude, longitude });
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }} className='relative' >
                {loading ? (
                    // Loader when loading is true
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                ) : (
                    // Map when loading is done
                    region && (
                        <>
                            <MapView
                                provider={PROVIDER_GOOGLE}
                                style={styles.map}
                                showsUserLocation={true}
                                showsMyLocationButton={true}
                                initialRegion={region}
                                onPress={handleMapPress}
                            >
                                {marker && (
                                    <Marker
                                        coordinate={marker}
                                        title="Pinned Location"
                                    />
                                )}
                            </MapView>
                            {marker && <View className='w-full px-10   absolute bottom-10 flex items-center justify-center'>
                                <TouchableOpacity activeOpacity={0.8}
                                    onPress={() => sendLocation(marker)}
                                    className='w-full py-4 bg-blue-500/90 backdrop-blur-md rounded-full flex items-center justify-center '>
                                    <Text className='text-xl font-bold text-white'>
                                        Share Location
                                    </Text>
                                </TouchableOpacity>

                            </View>}
                        </>
                    )
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Maps;
