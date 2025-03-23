import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';
const ChatpageBottomSheet = ({ bottomSheetRef }: any) => {
    const rouetr = useRouter()
    const fristRow = [
        {
            icons: <MaterialIcons name="audiotrack" size={40} color="white" />,
            title: "Audio",
            color: "#99BC85",
            function: () => {
                rouetr.push("/(helper)/Audio")
                bottomSheetRef.current.close()
            }
        },
        {
            icons: <FontAwesome name="video-camera" size={30} color="white" />,
            title: "Video",
            color: "#7886C7",
            function: () => { }
        },
        {
            icons: <MaterialCommunityIcons name="contacts" size={35} color="white" />,
            title: "Contacts",
            color: "#F29E5C",
            function: () => {
                rouetr.push("/(helper)/ContactsSynce")
                bottomSheetRef.current.close()
            }

        },
        {
            icons: <FontAwesome6 name="location-dot" size={30} color="white" />,
            title: "Location",
            color: "#F29E5C",
            function: () => {
                rouetr.push("/(helper)/Maps")
                bottomSheetRef.current.close()
            }
        }
    ]

    return (
        <View className='w-full h-full bg-white px-3 py-3'>

            <View className='w-ful flex-row items-center justify-between'>
                {
                    fristRow.map((item, index) => {
                        return (
                            <View key={index} className='flex items-center justify-center' style={{ width: "23%", aspectRatio: 1, }}>
                                <TouchableOpacity onPress={() => item.function()} activeOpacity={0.8} className='  rounded-3xl flex items-center  h-full w-full justify-center' style={{ backgroundColor: item.color }}>
                                    {item.icons}
                                </TouchableOpacity>
                                <Text className=' text-center  text-sm font-semibold text-zinc-600 '>
                                    {item.title}
                                </Text>
                            </View>
                        )
                    })
                }

            </View>
        </View>
    )
}

export default ChatpageBottomSheet