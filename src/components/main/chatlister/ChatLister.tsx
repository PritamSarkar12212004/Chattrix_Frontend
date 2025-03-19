import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const ChatLister = ({ item }: any) => {
  console.log(`item`, item.userName);
  const router = useRouter();
  return (
    <>
      <TouchableOpacity
        onPress={() => router.push("/(chat)/ChatPage")}
        activeOpacity={0.8}
        className="w-full  bg-[#FFFFFF] px-3 py-4 rounded-3xl flex-row items-center  gap-3 mb-5"
      >
        <View className="h-16 w-16 rounded-full">
          <Image
            source={{
              uri: item?.userProfilePic ? item.userProfilePic : "https://i.pinimg.com/736x/65/d0/13/65d013ada0e25623ec8b2b17a49b84d0.jpg",
            }}
            className="h-16 w-16 rounded-full"
          />
        </View>
        <View className="flex-auto">
          <View className="w-full flex-row justify-between items-center">
            <Text className="text-xl font-semibold">{item?.userName ? item?.userName : null}</Text>
            <Text className=" font-semibold text-zinc-500">4:30 am</Text>
          </View>
          <View className="w-full">
            <Text className="text-zinc-500">
              Hello, how are you? I am fine.
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default ChatLister;
