import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useNavigation } from "expo-router";

const SynceContactNavigation = ({ synceContact }: any) => {
  const navigation = useNavigation();

  return (
    <View className="w-full flex-row flex items-center justify-between py-2 px-2">
      <View className="">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View>
        <Text className="text-xl text-white font-semibold">Contact</Text>
      </View>
      <View className="flex items-center justify-center">
        <TouchableOpacity activeOpacity={0.8} onPress={() => synceContact()}>
          <EvilIcons name="refresh" size={40} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SynceContactNavigation;
