import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "expo-router";

const SubPageNavigation = ({ route }: any) => {
  const navigation = useNavigation();
  return (
    <View className="w-full flex-row py-2 items-center justify-between">
      <View className="w-14 ">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View>
        <Text className="text-xl font-bold text-white">{route}</Text>
      </View>
      <View className="w-14"></View>
    </View>
  );
};

export default SubPageNavigation;
