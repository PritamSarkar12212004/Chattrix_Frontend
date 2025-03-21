import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import useImageTextSender from '@/src/hooks/sender/useImageTextSender';

const ImageSenderHolder = ({ selectedImage }: any) => {
    // call hooks 
    const { sendTextImage } = useImageTextSender()
    const [text, setText] = useState("");
    const [loader, setLoader] = useState(false)
    const senderFunc = () => {
        setLoader(true)
        sendTextImage(selectedImage, text, setText, setLoader)
    }

    return (
        <View className='w-full px-3 py-5 flex-row items-center  justify-between gap-3'>
            <TextInput
                value={text}
                onChangeText={(text) => setText(text)}

                keyboardType="twitter"
                className="flex-auto bg-zinc-500 h-14 rounded-full px-4 text-white text-lg placeholder:text-lg"
                placeholder="Message"
            />
            <TouchableOpacity activeOpacity={0.8} onPress={() => loader ? null : senderFunc()}>
                {
                    loader ? <ActivityIndicator size="small" color="#fff" /> : <MaterialCommunityIcons name="send" size={30} color="green" />
                }
            </TouchableOpacity>

        </View>
    )
}

export default ImageSenderHolder