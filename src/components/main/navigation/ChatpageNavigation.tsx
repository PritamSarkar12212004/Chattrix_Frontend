import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import useSingleUserDataFetch from "@/src/hooks/chat/dataFetch/useSingleUserDataFetch";

const ChatpageNavigation = ({ userData }: any) => {
  const navigation = useNavigation();
  const { dataFetch } = useSingleUserDataFetch();
  useEffect(() => {
    dataFetch();
  }, []);
  return (
    <View className="w-full flex-row items-start justify-between bg-[#2CB1A9] px-3 py-2">
      <View className="flex-row items-center gap-2 ">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center gap-2">
          <Image
            source={{
              uri: userData?.userProfilePic
                ? userData.userProfilePic
                : "https://i.pinimg.com/736x/6b/47/9f/6b479f1619a848150e34fe38cdb56eca.jpg",
            }}
            className="h-12 w-12 rounded-xl"
          />
          <View className="flex  justify-center">
            <Text className="text-xl  leading-tight text-white font-semibold">
              Pritam Sarkar
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className="flex items-center justify-center">
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={30}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatpageNavigation;
