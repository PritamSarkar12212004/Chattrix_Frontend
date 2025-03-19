import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";

const SecoundaryButton = ({ content, ActiveFunction }: any) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={`w-full h-16     rounded-full  flex items-center justify-center   bg-[#5F9C11]`}
    >
      <Text className="text-lg font-bold text-white">{content}</Text>
    </TouchableOpacity>
  );
};

export default SecoundaryButton;
