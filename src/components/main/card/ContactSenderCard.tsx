import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { userContext } from "@/src/utils/context/ContextApi";
import useContactSender from "@/src/hooks/chat/contacts/useContactSender";

const ContactSenderCard = ({ item }: any) => {
    // call hooks 
    const { sendContacts } = useContactSender()
    const ActiveFunction = () => {
        sendContacts(item)
    };
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => ActiveFunction()}
            className="flex-row items-center justify-between w-full px-4 rounded-xl py-4  bg-[#1d5052] mb-3 "
        >
            <View>
                <Text className="text-white text-lg font-semibold">{item.name}</Text>
            </View>
            <View>
                <View className="bg-[#2CB1A9] rounded-full p-2">
                    <AntDesign name="plus" size={24} color="white" />
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ContactSenderCard;
