import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "expo-router";
const ChatHeader = ({ navigateInfo }: any) => {
  const navigation = useNavigation();
  return (
    <View className="w-full flex bg-[#3C3D37] px-3 py-3 flex-row gap-5">
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
        className="w-10 h-10 flex rounded-full items-center justify-center bg-zinc-400"
      >
        <Feather name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <View className="flex flex-row items-center gap-3">
        {/* <Image
          source={{ uri: navigateInfo.userProfilePic }}
          className="w-10 h-10 rounded-full"
        /> */}
        <Text className="text-white text-lg font-bold">
          {/* {navigateInfo.userName} */}
        </Text>
      </View>
    </View>
  );
};

export default ChatHeader;
