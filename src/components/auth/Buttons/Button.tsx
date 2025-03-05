import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import Icons from "@/src/constant/icons/Icons";

const Button = ({ func }: any) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => func()}
      className="w-full h-16 flex-row  rounded-full flex items-center justify-center gap-4 bg-gray-200"
    >
      <View className="h-12 w-12 rounded-full flex items-center justify-center bg-white">
        <Image source={Icons.Google} className="h-8 w-8" resizeMode="cover" />
      </View>
      <Text className="text-white  font-semibold text-lg tracking-widest">
        Continue with Google
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
