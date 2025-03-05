import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";
import { useDispatch } from "react-redux";
import { setNavigateInfo } from "@/src/utils/redux/slice/page/NavigateInfo";

const ChatLits = ({ item }: any) => {
  const dispatch = useDispatch();
  const navigaate = useNavigation();
  const navigationPage = () => {
    dispatch(setNavigateInfo(item.item));
    navigaate.navigate("ChatPage");
  };
  return (
    <TouchableOpacity
      onPress={() => navigationPage()}
      activeOpacity={0.8}
      className="w-full py-2  rounded-3xl flex mt-3 flex-row items-center justify-start bg-[#697565]"
    >
      <View className="flex flex-row items-center justify-start gap-3">
        <Image
          source={{ uri: item.item.userProfilePic }}
          className="w-16 h-16 rounded-full ml-3"
        />
        <Text className="text-xl text-white font-bold ">
          {item.item.userName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatLits;
